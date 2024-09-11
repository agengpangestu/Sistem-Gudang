"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredAdmin = void 0;
const unauthorized_1 = __importDefault(require("../helpers/unauthorized"));
const RequiredAdmin = (req, res, next) => {
    const user = res.locals.user;
    if (!user || user.role !== "admin")
        throw next(new unauthorized_1.default);
    return next();
};
exports.RequiredAdmin = RequiredAdmin;
//# sourceMappingURL=auth.js.map