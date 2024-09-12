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
const logger_1 = require("./logger");
const product__validation_1 = require("../validation/product..validation");
const faker_service_1 = __importDefault(require("../services/faker.service"));
const faker_1 = require("@faker-js/faker");
const auth_validation_1 = require("../validation/auth.validation");
class FakerController {
    storeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.product_id = (0, uuid_1.v4)();
            req.body.product_code = faker_1.faker.finance.accountNumber(5);
            req.body.product_name = faker_1.faker.commerce.productName();
            req.body.desc = faker_1.faker.commerce.productDescription();
            req.body.price = faker_1.faker.commerce.price({ min: 5, max: 100 });
            req.body.user_id = 5;
            req.body.location = "Gudang A";
            const { error, value } = (0, product__validation_1.ProductValidation)(req.body);
            if (error) {
                logger_1.logger.error(`ERR: product - product create = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
            }
            try {
                yield faker_service_1.default.storeProduct(value);
                return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" });
            }
            catch (error) {
                logger_1.logger.error(`ERR: product - create = ${error}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message });
            }
        });
    }
    storeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.user_id = (0, uuid_1.v4)();
            req.body.name = faker_1.faker.person.fullName();
            req.body.email = faker_1.faker.internet.email();
            req.body.password = faker_1.faker.internet.password();
            req.body.role = "regular"; // 'regular' or 'admin'
            const { error, value } = (0, auth_validation_1.RegisterValidation)(req.body);
            if (error) {
                logger_1.logger.error(`ERR: user - user create = ${error.message}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") });
            }
            try {
                yield faker_service_1.default.storeUser(value);
                return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" });
            }
            catch (error) {
                console.log(error);
                logger_1.logger.error(`ERR: user - create = ${error}`);
                return res.status(422).send({ status: false, statusCode: 422, message: error.message });
            }
        });
    }
}
exports.default = new FakerController();
//# sourceMappingURL=faker.js.map