"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakerRoute = void 0;
const express_1 = require("express");
const faker_1 = __importDefault(require("../utils/faker"));
const auth_1 = require("../middleware/auth");
exports.FakerRoute = (0, express_1.Router)();
exports.FakerRoute.post("/product", auth_1.RequiredAdmin, faker_1.default.storeProduct);
exports.FakerRoute.post("/user", auth_1.RequiredAdmin, faker_1.default.storeUser);
//# sourceMappingURL=faker.route.js.map