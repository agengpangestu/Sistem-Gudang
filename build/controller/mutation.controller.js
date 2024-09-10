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
const mutation_validation_1 = require("../validation/mutation.validation");
const uuid_1 = require("uuid");
const mutation_service_1 = __importDefault(require("../services/mutation.service"));
class MutationController {
    constructor() {
        this.mutationService = new mutation_service_1.default();
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
        this.Store = this.Store.bind(this);
        this.Update = this.Update.bind(this);
        this.Destroy = this.Destroy.bind(this);
    }
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            query.page = parseInt(req.query.page) || 1;
            query.limit = parseInt(req.query.limit) || 10;
            const data = yield this.mutationService.GetAll(query);
            logger_1.logger.info("Success get all mutation");
            return res.status(200).json({ status: true, statusCode: 200, data: data });
        });
    }
    GetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            const mutation = yield this.mutationService.GetById(parseInt(id));
            if (!mutation) {
                return res.status(404).json({ success: false, statusCode: 404, message: "Mutation not found", data: {} });
            }
            logger_1.logger.info("Success get mutation by id");
            return res.status(200).json({ success: false, statusCode: 200, data: mutation });
        });
    }
    Store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.mutation_id = (0, uuid_1.v4)();
            const { error, value } = (0, mutation_validation_1.MutationValidation)(req.body);
            if (error) {
                logger_1.logger.error(`ERR: mutation - mutation create = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
            }
            try {
                yield this.mutationService.Store(value);
                logger_1.logger.info("Success create mutation");
                return res.status(201).send({ status: true, statusCode: 201, message: "Success create mutation" });
            }
            catch (error) {
                logger_1.logger.error(`ERR: mutation - create = ${error}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            const { error, value } = (0, mutation_validation_1.MutationUpdateValidation)(req.body);
            if (error) {
                logger_1.logger.error(`ERR: mutation - update = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
            }
            try {
                const mutation = yield this.mutationService.GetById(parseInt(id));
                if (!mutation) {
                    return res.status(404).json({ status: false, statusCode: 404, data: "Mutation not found" });
                }
                const data = yield this.mutationService.Update(parseInt(id), value);
                if (data) {
                    logger_1.logger.info("Success update mutation");
                    return res.status(200).json({ status: true, statusCode: 200, message: "Success update mutation" });
                }
            }
            catch (error) {
                logger_1.logger.error(`ERR: mutation - update = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    Destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            try {
                const mutation = yield this.mutationService.GetById(parseInt(id));
                if (!mutation)
                    return res.status(404).json({ status: false, statusCode: 404, data: "Mutation not found" });
                const data = yield this.mutationService.Destroy(parseInt(id));
                if (data) {
                    logger_1.logger.info("Success delete mutation");
                    return res.status(200).json({ status: true, statusCode: 200, message: "Success delete mutation" });
                }
            }
            catch (error) {
                logger_1.logger.error(`ERR: user - delete = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
exports.default = MutationController;
//# sourceMappingURL=mutation.controller.js.map