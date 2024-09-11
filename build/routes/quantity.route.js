"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantityRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const quantity_controller_1 = __importDefault(require("../controller/quantity.controller"));
const quantity = new quantity_controller_1.default();
exports.QuantityRoute = (0, express_1.Router)();
exports.QuantityRoute.get("/", auth_1.RequiredAdmin, quantity.GetAll);
exports.QuantityRoute.get("/total-quantity", auth_1.RequiredAdmin, quantity.GetQuantityOfProduct);
//# sourceMappingURL=quantity.route.js.map