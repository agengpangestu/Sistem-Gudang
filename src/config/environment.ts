import "dotenv/config"

const CONFIG = {
  port: process.env.APP_PORT as string,
  jwt_public: process.env.JWT_PUBLIC as string,
  jwt_private: process.env.JWT_PRIVATE as string
}

export default CONFIG
