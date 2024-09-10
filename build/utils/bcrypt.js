"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encrypt = (password) => {
    return bcrypt_1.default.hashSync(password, 14);
};
exports.encrypt = encrypt;
const decrypt = (password, user_password) => {
    return bcrypt_1.default.compareSync(password, user_password);
};
exports.decrypt = decrypt;
//# sourceMappingURL=bcrypt.js.map