import * as schema from './schema';
import * as relations from './relations'
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DB_URL!,
});

export const db = drizzle({
    client: pool,
    schema: { ...schema, ...relations },
    // logger: true
});
