"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class JoiError extends joi_1.default.ValidationError {
    constructor(name, message = [], details) {
        super(name, message, details);
        this.name = "ValidationError";
        this.message = message;
        this.details = details;
    }
}
exports.default = JoiError;
//# sourceMappingURL=joi.js.map