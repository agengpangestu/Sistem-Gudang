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
const logger_1 = require("../utils/logger");
const user_validation_1 = require("../validation/user.validation");
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.userService = new user_service_1.default();
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
        this.Update = this.Update.bind(this);
        this.Destroy = this.Destroy.bind(this);
    }
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            query.page = parseInt(req.query.page) || 1;
            query.limit = parseInt(req.query.limit) || 10;
            const data = yield this.userService.GetAll(query);
            logger_1.logger.info("Success get all users");
            return res.status(200).json({ status: true, statusCode: 200, data: data });
        });
    }
    GetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            const user = yield this.userService.GetById(parseInt(id));
            if (!user) {
                return res.status(404).json({ status: false, statusCode: 404, data: "User not found" });
            }
            logger_1.logger.info("Success get user by id");
            return res.status(200).json({ status: true, statusCode: 200, data: user });
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            const { error, value } = (0, user_validation_1.UserValidation)(req.body);
            try {
                if (error) {
                    console.log(error);
                    logger_1.logger.error(`ERR: user - update = ${error.message}`);
                    return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
                }
                const user = yield this.userService.GetById(parseInt(id));
                if (!user) {
                    return res.status(404).json({ status: false, statusCode: 404, data: "User not found" });
                }
                const data = yield this.userService.Update(parseInt(id), value);
                if (data) {
                    logger_1.logger.info("Success update user");
                    return res.status(200).json({ status: true, statusCode: 200, message: "Success update user" });
                }
            }
            catch (error) {
                logger_1.logger.error(`ERR: user - update = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    Destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            try {
                const user = yield this.userService.GetById(parseInt(id));
                if (!user) {
                    return res.status(404).json({ status: false, statusCode: 404, data: "User not found" });
                }
                const data = this.userService.Destroy(parseInt(id));
                if (data) {
                    logger_1.logger.info("Success delete user");
                    return res.status(200).json({ status: true, statusCode: 200, message: "Success delete user" });
                }
            }
            catch (error) {
                logger_1.logger.error(`ERR: user - delete = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map