import { relations } from "drizzle-orm/relations";
import { user, sesiUjian, event, hasilUjian } from "./schema";

export const sesiUjianRelations = relations(sesiUjian, ({one, many}) => ({
	user: one(user, {
		fields: [sesiUjian.email],
		references: [user.email]
	}),
	event: one(event, {
		fields: [sesiUjian.eventId],
		references: [event.eventId]
	}),
	hasilUjians: many(hasilUjian),
}));

export const userRelations = relations(user, ({many}) => ({
	sesiUjians: many(sesiUjian),
	hasilUjians: many(hasilUjian),
}));

export const eventRelations = relations(event, ({many}) => ({
	sesiUjians: many(sesiUjian),
}));

export const hasilUjianRelations = relations(hasilUjian, ({one}) => ({
	sesiUjian: one(sesiUjian, {
		fields: [hasilUjian.sesiUjianId],
		references: [sesiUjian.sesiUjianId]
	}),
	user: one(user, {
		fields: [hasilUjian.email],
		references: [user.email]
	}),
}));