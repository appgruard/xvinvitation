import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function check() {
  try {
    const result = await db.execute(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Tablas en la BD:", result);
  } catch (error) {
    console.error("Error:", error);
  }
  process.exit(0);
}

check();
