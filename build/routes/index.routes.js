"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_route_1 = require("./user.route");
const health_route_1 = require("./health.route");
const auth_route_1 = require("./auth.route");
const product_route_1 = require("./product.route");
const mutation_route_1 = require("./mutation.route");
const quantity_route_1 = require("./quantity.route");
const faker_route_1 = require("./faker.route");
const _routes = [
    ["/api/health", health_route_1.HealthRoute],
    ["/api/authentication", auth_route_1.AuthRoute],
    ["/api/user", user_route_1.UserRoute],
    ["/api/product", product_route_1.ProductRoute],
    ["/api/mutation", mutation_route_1.MutationRoute],
    ["/api/quantity", quantity_route_1.QuantityRoute],
    ["/api/faker", faker_route_1.FakerRoute]
];
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(url, router);
    });
};
exports.routes = routes;
//# sourceMappingURL=index.routes.js.map