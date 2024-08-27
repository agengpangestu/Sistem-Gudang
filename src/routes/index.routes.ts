import { Application, Router } from "express"
import { UserRoute } from "./user.route"
import { HealthRoute } from "./health.route"
import { AuthRoute } from "./auth.route"
import { ProductRoute } from "./product.route"
import { MutationRoute } from "./mutation.route"

const _routes: Array<[string, Router]> = [
  ["/api/health", HealthRoute],
  ["/api/authentication", AuthRoute],
  ["/api/user", UserRoute],
  ["/api/product", ProductRoute],
  ["/api/mutation", MutationRoute]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
