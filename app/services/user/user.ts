import { eq } from "drizzle-orm";
import { db } from "database/connect";
import { user } from "database/schema";

export async function getUserByEmail(email: string) {
    const res = await db.select().from(user).where(eq(user.email, email))
    return res
    // return [{
    //     email: "test",
    //     role: "peserta",
    //     name: "testt"
    // }]
}

export async function addUser(userData: typeof user.$inferInsert) {
    const res = await db.insert(user).values(userData).returning()
    return res

    // return [{
    //     email: "test",
    //     role: "peserta",
    //     name: "testt"
    // }]
}