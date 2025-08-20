import { db } from "database/connect";
import { soal } from "database/schema";
import { eq, inArray, sql } from "drizzle-orm";
import type { SoalUnitPartial } from "~/lib/constants/soal";


export async function getSoalByid(id: string): Promise<SoalUnitPartial[]> {
    const res = await db.select({
        soalId: soal.soalId,
        pertanyaan: soal.pertanyaan,
        pilihan: soal.pilihan
    }).from(soal).where(eq(soal.soalId, id))

    return res
}

export async function getSoalBySoalSetIds(soalSet: string[]): Promise<SoalUnitPartial[]> {
    // const res = await db.select({
    //   soalId: soal.soalId,
    //   pertanyaan: soal.pertanyaan,
    //   pilihan: soal.pilihan
    // }).from(soal).where(inArray(soal.soalId, soalSet))

    // return res
    if (soalSet.length === 0) return [];

    const result = await db.execute(sql`
    SELECT 
        s."soal_id" AS "soalId", 
        s."pertanyaan", 
        s."pilihan"
    FROM (
      SELECT
        unnest(ARRAY[${sql.join(soalSet.map(id => sql`${id}`), sql`, `)}]) AS soal_id,
        generate_series(1, ${soalSet.length}) AS pos
    ) o
    JOIN "soal" s ON s."soal_id" = o.soal_id
    ORDER BY o.pos
  `);

    return result.rows as SoalUnitPartial[];
}

export async function getRandomizedSoalSetIds() {
    const query = sql`
    WITH twk AS (
      SELECT soal_id 
      FROM soal
      WHERE tipe = 'twk'
      ORDER BY md5(ctid::text || clock_timestamp()::text)
      LIMIT 30
    ),
    tiu AS (
      SELECT soal_id
      FROM soal
      WHERE tipe = 'tiu'
      ORDER BY md5(ctid::text || clock_timestamp()::text)
      LIMIT 35
    ),
    tkp AS (
      SELECT soal_id
      FROM soal
      WHERE tipe = 'tkp'
      ORDER BY md5(ctid::text || clock_timestamp()::text)
      LIMIT 45
    )
    SELECT * FROM twk
    UNION ALL
    SELECT * FROM tiu
    UNION ALL
    SELECT * FROM tkp
  `;

    const res = (await db.execute(query)).rows.map((ids, i) => {
        return ids.soal_id
    });

    return res
}


