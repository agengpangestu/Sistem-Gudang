"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const productController = new product_controller_1.default();
exports.ProductRoute = (0, express_1.Router)();
exports.ProductRoute.get("/", productController.GetAll);
exports.ProductRoute.get("/:id", auth_1.RequiredAdmin, productController.GetById);
exports.ProductRoute.post("/post-product", auth_1.RequiredAdmin, productController.Store);
exports.ProductRoute.put("/:id/update-product", auth_1.RequiredAdmin, productController.Update);
exports.ProductRoute.delete("/:id/delete-product", auth_1.RequiredAdmin, productController.Destroy);
//# sourceMappingURL=product.route.js.map