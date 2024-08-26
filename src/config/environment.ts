import "dotenv/config"

const CONFIG = {
  jwt_public: process.env.JWT_PUBLIC as string,
  jwt_private: process.env.JWT_PRIVATE as string
}

export default CONFIG
