import { pgTable, uuid, text, timestamp, boolean, index, varchar, foreignKey, unique, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const event = pgTable("event", {
	eventId: uuid("event_id").defaultRandom().primaryKey().notNull(),
	namaEvent: text("nama_event").notNull(),
	tanggalMulai: timestamp("tanggal_mulai", { mode: 'string' }),
	tanggalAkhir: timestamp("tanggal_akhir", { mode: 'string' }),
	isRunning: boolean("is_running").default(false).notNull(),
});

export const soal = pgTable("soal", {
	soalId: varchar("soal_id", { length: 20 }).primaryKey().notNull(),
	pertanyaan: text(),
	pilihan: text(),
	jawabanBenar: varchar("jawaban_benar"),
	tipe: varchar(),
}, (table) => {
	return {
		tipeIdx: index("soal_tipe_idx").using("btree", table.tipe.asc().nullsLast().op("text_ops")),
	}
});

export const user = pgTable("user", {
	email: text().primaryKey().notNull(),
	role: varchar({ length: 20 }).notNull(),
	name: text(),
});

export const sesiUjian = pgTable("sesi_ujian", {
	sesiUjianId: uuid("sesi_ujian_id").defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	soalSet: text("soal_set").notNull(),
	jawabanSet: varchar("jawaban_set"),
	eventId: uuid("event_id"),
	startTime: timestamp("start_time", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		sesiUjianUserFk: foreignKey({
			columns: [table.email],
			foreignColumns: [user.email],
			name: "sesi_ujian_user_fk"
		}),
		sesiUjianEventFk: foreignKey({
			columns: [table.eventId],
			foreignColumns: [event.eventId],
			name: "sesi_ujian_event_fk"
		}),
	}
});

export const hasilUjian = pgTable("hasil_ujian", {
	hasilId: uuid("hasil_id").defaultRandom().primaryKey().notNull(),
	sesiUjianId: uuid("sesi_ujian_id").notNull(),
	email: text().notNull(),
	eventId: uuid("event_id").notNull(),
	tipe: text().notNull(),
	skor: integer().notNull(),
	waktuSelesai: timestamp("waktu_selesai", { mode: 'string' }).defaultNow(),
}, (table) => {
	return {
		idxHasilEventTipeSkor: index("idx_hasil_event_tipe_skor").using("btree", table.eventId.asc().nullsLast().op("timestamp_ops"), table.tipe.asc().nullsLast().op("text_ops"), table.skor.desc().nullsFirst().op("int4_ops"), table.waktuSelesai.asc().nullsLast().op("text_ops")),
		hasilUjianSesiUjianIdFkey: foreignKey({
			columns: [table.sesiUjianId],
			foreignColumns: [sesiUjian.sesiUjianId],
			name: "hasil_ujian_sesi_ujian_id_fkey"
		}).onDelete("cascade"),
		hasilUjianUserFk: foreignKey({
			columns: [table.email],
			foreignColumns: [user.email],
			name: "hasil_ujian_user_fk"
		}),
		hasilUjianSesiUjianIdTipeKey: unique("hasil_ujian_sesi_ujian_id_tipe_key").on(table.sesiUjianId, table.tipe),
	}
});
