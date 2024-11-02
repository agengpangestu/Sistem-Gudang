import cors from "cors"
import "dotenv/config"
import express, { Application } from "express"
import { GlobalError } from "../helpers/global"
import { routes } from "../routes/index.routes"
import deserializedToken from "./deserializedToken"

const createServer = () => {
  const app: Application = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    cors({
      origin: ["http://localhost:3000/"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"]
    })
  )
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")

    next()
  })

  app.use(deserializedToken)

  routes(app)

  app.use(GlobalError)

  return app
}

export default createServer
