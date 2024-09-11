"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.RegisterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
const RegisterValidation = (payload) => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().default(client_1.user_role.regular)
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.RegisterValidation = RegisterValidation;
const LoginValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required()
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.LoginValidation = LoginValidation;
//# sourceMappingURL=auth.validation.js.map