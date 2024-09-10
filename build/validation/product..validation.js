"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateValidation = exports.ProductValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const ProductValidation = (payload) => {
    const schema = joi_1.default.object({
        product_id: joi_1.default.string().required(),
        product_code: joi_1.default.number().required(),
        product_name: joi_1.default.string().required(),
        desc: joi_1.default.string(),
        location: joi_1.default.string().required(),
        price: joi_1.default.string().regex(/^\d+(\.\d{1,2})?$/),
        user_id: joi_1.default.number().required()
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.ProductValidation = ProductValidation;
const ProductUpdateValidation = (payload) => {
    const schema = joi_1.default.object({
        product_name: joi_1.default.string(),
        desc: joi_1.default.string(),
        location: joi_1.default.string(),
        price: joi_1.default.string().regex(/^\d+(\.\d{1,2})?$/),
        user_id: joi_1.default.number()
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.ProductUpdateValidation = ProductUpdateValidation;
//# sourceMappingURL=product..validation.js.map