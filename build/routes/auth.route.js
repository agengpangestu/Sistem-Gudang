"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
exports.AuthRoute = (0, express_1.Router)();
exports.AuthRoute.post("/registration", auth_controller_1.default.Register);
exports.AuthRoute.post("/login", auth_controller_1.default.Login);
//# sourceMappingURL=auth.route.js.map