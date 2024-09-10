"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const deserializedToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const access_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\s/, "");
    if (!access_token) {
        return next();
    }
    const token = (0, jwt_1.verifyJwt)(access_token);
    if (token.decoded) {
        res.locals.user = token.decoded;
        return next();
    }
    if (token.expired) {
        return next();
    }
    return next();
});
exports.default = deserializedToken;
//# sourceMappingURL=deserializedToken.js.map