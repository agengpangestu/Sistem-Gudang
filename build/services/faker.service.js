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
const library_1 = require("@prisma/client/runtime/library");
const prisma_1 = __importDefault(require("../utils/prisma"));
class FakerService {
    constructor() {
        this.prisma = new prisma_1.default();
    }
    storeProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.products.create({
                    data: Object.assign(Object.assign({}, payload), { price: new library_1.Decimal(payload.price), createdAt: new Date() })
                });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2003") {
                    throw new Error("Foreign key constraint failed on the field or not found");
                }
                throw error;
            }
        });
    }
    storeUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.users.create({ data: payload });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                    throw new Error("Email has been registered");
                }
                throw error;
            }
        });
    }
}
exports.default = new FakerService();
//# sourceMappingURL=faker.service.js.map