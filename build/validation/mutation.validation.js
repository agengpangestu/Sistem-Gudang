"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationUpdateValidation = exports.MutationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const MutationValidation = (payload) => {
    const schema = joi_1.default.object({
        mutation_id: joi_1.default.string().required(),
        user_id: joi_1.default.number().required(),
        product_code: joi_1.default.number().required(),
        quantity: joi_1.default.number().required(),
        mutation_type: joi_1.default.string().required()
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.MutationValidation = MutationValidation;
const MutationUpdateValidation = (payload) => {
    const schema = joi_1.default.object({
        product_code: joi_1.default.number(),
        quantity: joi_1.default.number(),
        mutation_type: joi_1.default.string()
    }).options({ abortEarly: false });
    return schema.validate(payload);
};
exports.MutationUpdateValidation = MutationUpdateValidation;
//# sourceMappingURL=mutation.validation.js.map