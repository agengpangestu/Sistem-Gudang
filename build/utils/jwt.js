"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("../config/environment"));
const signJwt = (payload, options) => {
    return jsonwebtoken_1.default.sign(payload, environment_1.default.jwt_private, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, environment_1.default.jwt_public);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt is expired or not egible to use',
            decoded: null
        };
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map