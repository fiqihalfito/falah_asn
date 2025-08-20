import { db } from "database/connect";
import { hasilUjian, sesiUjian } from "database/schema";
import { eq } from "drizzle-orm";

export async function getListEventPernahTerlibat(email: string) {
    const res = await db.query.sesiUjian.findMany({
        where: eq(sesiUjian.email, email),
        with: {
            event: true
        }
    })

    return res
}

export async function saveHasilUjian(email: string, eventId: string, sesiUjianId: string, skorUjian: Record<string, number>) {

    const insertedData = Object.entries(skorUjian).map(([tipe, skor]) => ({
        email,
        eventId,
        sesiUjianId,
        tipe,
        skor,
    }));


    await db.insert(hasilUjian).values(insertedData)
}

export async function getHasilUjian(eventId: string) {
    const res = await db.query.hasilUjian.findMany({
        where: eq(hasilUjian.eventId, eventId),
        with: {
            user: {
                columns: {
                    name: true
                }
            }
        }
    })

    return res
}

