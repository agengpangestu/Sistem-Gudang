import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity"

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "ageng",
  database: "db_sistem_gudang",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: []
})
