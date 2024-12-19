import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import { CONFIG } from "../config"
import { DB } from "../db/types"

const pool = new Pool({
  host: CONFIG.host_supabase,
  user: CONFIG.username_supabase,
  password: CONFIG.password_supabase,
  database: CONFIG.database_supabase,
  port: parseInt(CONFIG.db_port_supabase),
})

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})
