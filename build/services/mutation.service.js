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
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../utils/prisma"));
const database_1 = __importDefault(require("../helpers/database"));
class MutationService {
    constructor() {
        this.prisma = new prisma_1.default();
    }
    GetAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.page - 1) * query.limit;
            const take = query.limit;
            const mutations = yield this.prisma.mutations.findMany({
                select: {
                    mutation_id: true,
                    product_code: true,
                    quantity: true,
                    mutation_type: true,
                    createdAt: true
                },
                where: {
                    mutation_type: { equals: query.mutation_type }
                },
                orderBy: {
                    [query.sort_by || "createdAt"]: query.sort_order || "asc"
                },
                skip: skip,
                take: take
            });
            const total_data = yield this.prisma.mutations.count({
                where: {
                    mutation_type: { equals: query.mutation_type }
                },
                orderBy: {
                    [query.sort_by || "createdAt"]: query.sort_order || "asc"
                }
            });
            return {
                total_data: total_data,
                total_pages: Math.ceil(total_data / query.limit),
                current_page: query.page,
                data: mutations
            };
        });
    }
    GetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.mutations.findUnique({
                where: { id: id },
                include: {
                    product: {
                        select: {
                            product_name: true,
                            desc: true,
                            location: true,
                            price: true
                        }
                    },
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
            var _a;
            try {
                if (!Object.values(client_1.mutation_type).includes(payload.mutation_type)) {
                    throw new Error(`Invalid mutation type: ${payload.mutation_type}. Expected one of ${Object.values(client_1.mutation_type).join(", ")}.`);
                }
                return yield this.prisma.mutations.create({ data: payload });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2003") {
                    throw new database_1.default(error.name, `Foreign key constraint '${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.field_name}' not found`);
                }
                throw error;
            }
        });
    }
    Update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!Object.values(client_1.mutation_type).includes(payload.mutation_type)) {
                    throw new Error(`Invalid mutation type: ${payload.mutation_type}. Expected one of ${Object.values(client_1.mutation_type).join(", ")}.`);
                }
                return yield this.prisma.mutations.update({ where: { id: id }, data: payload });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2003") {
                    throw new database_1.default(error.name, `Foreign key constraint '${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.field_name}' not found`);
                }
                throw error;
            }
        });
    }
    Destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.mutations.delete({ where: { id: id } });
        });
    }
}
exports.default = MutationService;
//# sourceMappingURL=mutation.service.js.map