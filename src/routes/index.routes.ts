import { Application, Router } from "express"
import { 
  UserRoute,
  HealthRoute,
  AuthRoute,
  ProductRoute,
  MutationRoute, 
  QuantityRoute,
  FakerRoute
} from "./"

const _routes: Array<[string, Router]> = [
  ["/api/health", HealthRoute],
  ["/api/authentication", AuthRoute],
  ["/api/user", UserRoute],
  ["/api/product", ProductRoute],
  ["/api/mutation", MutationRoute],
  ["/api/quantity", QuantityRoute],
  ["/api/faker", FakerRoute]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
