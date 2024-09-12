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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const auth_validation_1 = require("../validation/auth.validation");
const logger_1 = require("../utils/logger");
const bcrypt_1 = require("../utils/bcrypt");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const jwt_1 = require("../utils/jwt");
class AuthController {
    Register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.user_id = (0, uuid_1.v4)();
            const { error, value } = (0, auth_validation_1.RegisterValidation)(req.body);
            if (error) {
                logger_1.logger.error(`ERR: auth - register = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
            }
            try {
                value.password = `${(0, bcrypt_1.encrypt)(value.password)}`;
                yield auth_service_1.default.Register(value);
                return res.status(201).send({ status: true, statusCode: 201, message: "Register success" });
            }
            catch (error) {
                logger_1.logger.error(`ERR: auth - register = ${error}`);
                next(error);
            }
        });
    }
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_validation_1.LoginValidation)(req.body);
            if (error) {
                logger_1.logger.error(`ERR: auth - login = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
            }
            try {
                const user = yield auth_service_1.default.Login(value.email);
                if (!user) {
                    return res.status(422).send({ status: false, statusCode: 422, message: "Email not registered" });
                }
                const matching_password = (0, bcrypt_1.decrypt)(value.password, user.password);
                if (!matching_password) {
                    return res.status(422).send({ status: false, statusCode: 422, message: "Password not match" });
                }
                const access_token = (0, jwt_1.signJwt)(Object.assign({}, user), { expiresIn: "1d" });
                return res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success login",
                    data: { access_token: access_token, refresh_token: "3408fhdfdjfhbd" }
                });
            }
            catch (error) {
                logger_1.logger.error(`ERR: auth - login = ${error}`);
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map