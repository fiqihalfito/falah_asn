import type { soal } from "database/schema";

// misalnya dari Drizzle
export type SoalUnit = typeof soal.$inferSelect;

// pilih hanya field yang diperlukan
export type SoalUnitPartial = Pick<SoalUnit, 'soalId' | 'pertanyaan' | 'pilihan'>;

export type Pilihan = { id: string, j: string }[];

export type JawabanSetClient = {
    sId: string,
    j: string
}

export const AMBANG_BATAS: Record<TIPE_SOAL, number> = {
    twk: 65,
    tiu: 80,
    tkp: 166
}

export type TIPE_SOAL = "twk" | "tiu" | "tkp" 
