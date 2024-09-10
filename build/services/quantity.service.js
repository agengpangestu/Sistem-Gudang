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
const prisma_1 = __importDefault(require("../utils/prisma"));
class QuantityService {
    // constructor(private prisma: PrismaUtils) { // shorthand version
    constructor() {
        this.prisma = new prisma_1.default();
    }
    GetAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.page - 1) * query.limit;
            const take = query.limit;
            // const a: Prisma.ProductWhereInput = {}
            // if(query.start_date || query.end_date) {
            //   a.createdAt = {}
            //   if (query.start_date) {
            //     a.createdAt.gte = new Date(new Date(query.start_date).setHours(0, 0, 0))
            //   }
            //   if (query.end_date) {
            //     a.createdAt.lt = new Date(new Date(query.end_date).setHours(24, 59, 59))
            //   }
            // }
            const quantity = yield this.prisma.products.findMany({
                where: {
                    product_name: { contains: query.product_name, mode: "insensitive" },
                    createdAt: {
                        gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
                        lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
                    },
                    price: {
                        gte: query.min_price ? Number(query.min_price) : undefined,
                        lte: query.max_price ? Number(query.max_price) : undefined
                    },
                    product_code: { equals: query.product_code ? parseInt(query.product_code) : undefined }
                },
                orderBy: {
                    [query.sort_by || "createdAt"]: query.sort_order || "asc"
                },
                select: {
                    product_code: true,
                    product_name: true,
                    location: true,
                    price: true,
                    createdAt: true
                },
                skip: skip,
                take: take
            });
            const total_data = yield this.prisma.products.count({
                where: {
                    product_name: { contains: query.product_name, mode: "insensitive" },
                    createdAt: {
                        gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
                        lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
                    },
                    price: {
                        gte: query.min_price ? Number(query.min_price) : undefined,
                        lte: query.max_price ? Number(query.max_price) : undefined
                    },
                    product_code: { equals: query.product_code ? parseInt(query.product_code) : undefined }
                },
                orderBy: {
                    [query.sort_by || "createdAt"]: query.sort_order || "asc"
                }
            });
            return {
                total_data: total_data,
                total_pages: Math.ceil(total_data / query.limit),
                current_page: query.page,
                data: quantity
            };
        });
    }
    GetQuantityOfProduct(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.page - 1) * query.limit;
            const take = query.limit;
            // group by product_code first
            const mutations = yield this.prisma.mutations.groupBy({
                by: ["product_code"],
                _sum: { quantity: true },
                where: { mutation_type: query.mutation_type }
            });
            // calculate total items and pages
            const total_items = mutations.length;
            const total_pages = Math.ceil(total_items / query.limit);
            // slice // btw i so confused, damn! // slice data for pagination
            const pageMutation = mutations.slice(skip, query.page * take);
            // map mutations table for get all product_code
            const product_codes = mutations.map((data) => data.product_code);
            // find all product using product_code
            const fetch_products = yield this.prisma.products.findMany({
                where: { product_code: { in: product_codes } }
            });
            // map for get all product_code, product_name, and quantity
            const results = pageMutation.map((data) => {
                const product = fetch_products.find((item) => item.product_code === data.product_code);
                const total_quantity = data._sum.quantity;
                return {
                    product_code: product === null || product === void 0 ? void 0 : product.product_code,
                    product_name: product === null || product === void 0 ? void 0 : product.product_name,
                    qty: total_quantity
                };
            });
            return {
                current_page: query.page,
                limit: take,
                total_items: total_items,
                total_pages: total_pages,
                data: results
            };
        });
    }
}
exports.default = QuantityService;
//# sourceMappingURL=quantity.service.js.map