import "dotenv/config"

const CONFIG = {
  port: process.env.APP_PORT as string,
  jwt_public: process.env.JWT_PUBLIC as string,
  jwt_private: process.env.JWT_PRIVATE as string,
  host: process.env.HOST as string,
  username: process.env.USERNAME as string,
  password: process.env.PASSWORD as string,
  database: process.env.DATABASE as string,
  db_port: process.env.DB_PORT as string
}

export default CONFIG
