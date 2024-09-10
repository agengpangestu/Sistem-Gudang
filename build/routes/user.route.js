"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const userController = new user_controller_1.default();
exports.UserRoute = (0, express_1.Router)();
exports.UserRoute.get("/", auth_1.RequiredAdmin, userController.GetAll);
exports.UserRoute.get("/:id", auth_1.RequiredAdmin, userController.GetById);
exports.UserRoute.put("/:id/update-user", auth_1.RequiredAdmin, userController.Update);
exports.UserRoute.delete("/:id/delete-user", auth_1.RequiredAdmin, userController.Destroy);
//# sourceMappingURL=user.route.js.map