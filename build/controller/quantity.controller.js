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
const quantity_service_1 = __importDefault(require("../services/quantity.service"));
class QuantityController {
    constructor() {
        this.quantityService = new quantity_service_1.default();
        this.GetAll = this.GetAll.bind(this);
        this.GetQuantityOfProduct = this.GetQuantityOfProduct.bind(this);
    }
    GetAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            query.page = parseInt(req.query.page) || 1;
            query.limit = parseInt(req.query.limit) || 10;
            try {
                const quantity = yield this.quantityService.GetAll(query);
                if (quantity) {
                    logger_1.logger.info("Success get quantity product");
                    res.status(200).json({ status: true, statusCode: 200, data: quantity });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetQuantityOfProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            query.page = parseInt(req.query.page) || 1;
            query.limit = parseInt(req.query.limit) || 10;
            try {
                const quantity = yield this.quantityService.GetQuantityOfProduct(query);
                return res.status(200).json({ status: true, statusCode: 200, data: quantity });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = QuantityController;
//# sourceMappingURL=quantity.controller.js.map