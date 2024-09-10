import "dotenv/config"
import express, { Application } from "express"
import cors from "cors"
import deserializedToken from "./deserializedToken"
import { routes } from "../routes/index.routes"
import { GlobalError } from "../helpers/global"

const createServer = () => {
  const app: Application = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(cors())
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
