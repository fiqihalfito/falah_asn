import { db } from "database/connect";
import { event, sesiUjian, soal } from "database/schema";
import { and, eq, inArray } from "drizzle-orm";
import type { JawabanSetClient, TIPE_SOAL } from "~/lib/constants/soal";

export async function getSesiUjian(sesiUjianId: string) {
    const res = await db.select().from(sesiUjian).where(eq(sesiUjian.sesiUjianId, sesiUjianId))
    return res
}

export async function submitUjian(sesiUjianId: string, jawabanSet: string) {
    const returning = await db.update(sesiUjian).set({
        jawabanSet: jawabanSet
    }).where(eq(sesiUjian.sesiUjianId, sesiUjianId)).returning()
    return returning
}

export async function getRunningEvent() {
    const res = await db.select().from(event).where(eq(event.isRunning, true))
    return res
}

export async function initSesiUjian(eventId: string, email: string, soalSet: string,) {
    const res = await db.insert(sesiUjian).values({
        email: email,
        soalSet: soalSet,
        eventId: eventId,
    }).returning({ sesiUjianId: sesiUjian.sesiUjianId })
    return res[0].sesiUjianId
}

export async function hasCurrentEventDone(email: string, eventId: string) {
    const res = await db.select({ sesiUjianId: sesiUjian.sesiUjianId }).from(sesiUjian).where(and(eq(sesiUjian.eventId, eventId), eq(sesiUjian.email, email)))
    return res.length > 0
}

export async function getJawabanSetFromSesiUjian(sesiUjianId: string) {
    const res = await db.select({ jawabanSet: sesiUjian.jawabanSet }).from(sesiUjian).where(eq(sesiUjian.sesiUjianId, sesiUjianId))
    return res[0].jawabanSet
}

export async function hitungSkorUjian(jawabanSet: JawabanSetClient[], soalSet: string[]) {


    const soalDanJawabanBenar = await db.select({
        soalId: soal.soalId,
        jawabanBenar: soal.jawabanBenar,
        tipe: soal.tipe
    }).from(soal).where(inArray(soal.soalId, soalSet))

    const kunciJawabanMap = new Map(soalDanJawabanBenar.map(s => [s.soalId, s]));

    const skorUjian: Record<TIPE_SOAL, number> = {
        twk: 0,
        tiu: 0,
        tkp: 0
    }

    // buat map untuk akses cepat
    // hitung benar
    for (const { sId, j } of jawabanSet) {
        const soal = kunciJawabanMap.get(sId);
        if (!soal) continue;

        if (soal.tipe === "tkp") {
            const jawabanTKP = JSON.parse(soal.jawabanBenar!) as Record<string, number>
            skorUjian["tkp"] = skorUjian["tkp"] + jawabanTKP[j]
        }

        // console.log(`${soal.soalId} ${soal.jawabanBenar} === ${sId} ${j}`, soal.jawabanBenar === j);
        if (soal.jawabanBenar === j) {
            skorUjian[soal.tipe as TIPE_SOAL] = skorUjian[soal.tipe as TIPE_SOAL] + 1;
        }
    }

    return skorUjian
}