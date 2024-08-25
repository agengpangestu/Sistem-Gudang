import { Application, Router } from "express"
import { UserRoute } from "./user.route"
import { HealthRoute } from "./health.route"
import { AuthRoute } from "./auth.route"

const _routes: Array<[string, Router]> = [
  ["/api/health", HealthRoute],
  ["/api/authentication", AuthRoute],
  ["/api/user", UserRoute]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
