import "dotenv/config"

export const CONFIG = {
  port: process.env.APP_PORT as string,
  jwt_public: process.env.JWT_PUBLIC as string,
  jwt_private: process.env.JWT_PRIVATE as string,

  // local db
  host: process.env.HOST as string,
  username: process.env.USERNAME as string,
  password: process.env.PASSWORD as string,
  database: process.env.DATABASE as string,
  db_port: process.env.DB_PORT as string,

  // online db
  host_supabase: process.env.HOST_SUPABASE as string,
  username_supabase: process.env.USERNAME_SUPABASE as string,
  password_supabase: process.env.PASSWORD_SUPABASE as string,
  database_supabase: process.env.DATABASE_SUPABASE as string,
  db_port_supabase: process.env.DB_PORT_SUPABASE as string,
}

export default CONFIG
