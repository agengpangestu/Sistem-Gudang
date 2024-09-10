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
const product__validation_1 = require("../validation/product..validation");
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
const product_service_1 = __importDefault(require("../services/product.service"));
const not_found_1 = __importDefault(require("../helpers/not.found"));
const joi_1 = __importDefault(require("../helpers/joi"));
class ProductController {
    constructor() {
        this.productService = new product_service_1.default();
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
        this.Store = this.Store.bind(this);
        this.Update = this.Update.bind(this);
        this.Destroy = this.Destroy.bind(this);
    }
    GetAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                query.page = parseInt(req.query.page) || 1;
                query.limit = parseInt(req.query.limit) || 10;
                const data = yield this.productService.GetAll(query);
                logger_1.logger.info("Success get all products");
                return res.status(200).json({ status: true, statusCode: 200, data: data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            try {
                const product = yield this.productService.GetById(parseInt(id));
                if (!product) {
                    throw next(new not_found_1.default());
                }
                return res.status(200).json({ success: false, statusCode: 200, data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    Store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.product_id = (0, uuid_1.v4)();
            const { error, value } = (0, product__validation_1.ProductValidation)(req.body);
            try {
                if (error) {
                    logger_1.logger.error(`ERR: product - product create = ${error.message}`);
                    throw next(new joi_1.default(error.name, error.message));
                }
                yield this.productService.Store(value);
                return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            const { error, value } = (0, product__validation_1.ProductUpdateValidation)(req.body);
            try {
                if (error) {
                    throw next(new joi_1.default(error.name, error.message));
                }
                const product = yield this.productService.GetById(parseInt(id));
                if (!product) {
                    throw next(new not_found_1.default());
                }
                const data = yield this.productService.Update(parseInt(id), value);
                if (data) {
                    logger_1.logger.info("Success update product");
                    return res.status(200).json({ status: true, statusCode: 200, message: "Success update product" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    Destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id } } = req;
            try {
                const product = yield this.productService.GetById(parseInt(id));
                if (!product)
                    throw next(new not_found_1.default());
                const data = yield this.productService.Destroy(parseInt(id));
                if (data) {
                    logger_1.logger.info("Success delete product");
                    return res.status(200).json({ status: true, statusCode: 200, message: "Success delete product" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map