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
const database_1 = __importDefault(require("../helpers/database"));
class ProductService {
    constructor() {
        this.prisma = new prisma_1.default();
    }
    GetAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.page - 1) * query.limit;
            const take = query.limit;
            const products = yield this.prisma.products.findMany({
                select: {
                    product_id: true,
                    product_code: true,
                    product_name: true,
                    location: true,
                    price: true,
                    createdAt: true
                },
                where: {
                    product_name: { contains: query.product_name, mode: "insensitive" },
                    createdAt: {
                        gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
                        lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
                    }
                },
                orderBy: { [query.sort_by || "price"]: query.sort_order || "asc" },
                skip: skip,
                take: take
            });
            const total_data = yield this.prisma.products.count({
                where: {
                    product_name: { contains: query.product_name, mode: "insensitive" },
                    createdAt: {
                        gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
                        lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
                    }
                },
                orderBy: { [query.sort_by || "price"]: query.sort_order || "asc" }
            });
            return {
                total_data: total_data,
                total_pages: Math.ceil(total_data / query.limit),
                current_page: query.page,
                data: products
            };
        });
    }
    GetById(product_code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.products.findUnique({
                where: { product_code: product_code },
                include: {
                    user: {
                        select: {
                            email: true,
                            name: true
                        }
                    }
                }
            });
        });
    }
    Store(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                return yield this.prisma.products.create({
                    data: Object.assign(Object.assign({}, payload), { price: new library_1.Decimal(payload.price) })
                });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                    throw new database_1.default(error.name, `field: '${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.target}' must unique`);
                }
                else if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2003") {
                    throw new database_1.default(error.name, `Foreign key constraint '${(_b = error.meta) === null || _b === void 0 ? void 0 : _b.field_name}' not found`);
                }
                throw error;
            }
        });
    }
    Update(product_code, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return yield this.prisma.products.update({
                    where: { product_code: product_code },
                    data: Object.assign(Object.assign({}, payload), { price: new library_1.Decimal(payload.price) })
                });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2003") {
                    throw new database_1.default(error.name, `Foreign key constraint '${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.field_name}' not found`);
                }
                throw error;
            }
        });
    }
    Destroy(product_code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.products.delete({ where: { product_code: product_code } });
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map