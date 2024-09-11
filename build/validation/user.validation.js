"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const UserValidation = (payload) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string(),
        role: joi_1.default.string()
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.UserValidation = UserValidation;
//# sourceMappingURL=user.validation.js.map