"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRoute = void 0;
const express_1 = require("express");
exports.HealthRoute = (0, express_1.Router)();
exports.HealthRoute.get("/", (req, res, next) => {
    res.status(200).json({ status: true, statusCode: 200, message: "OK" });
});
//# sourceMappingURL=health.route.js.map