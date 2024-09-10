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
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../utils/prisma"));
class UserService {
    constructor() {
        this.prisma = new prisma_1.default();
    }
    GetAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.page - 1) * query.limit;
            const take = query.limit;
            const users = yield this.prisma.users.findMany({
                where: {
                    name: { contains: query.name, mode: "insensitive" },
                    role: { equals: query.role }
                },
                skip: skip,
                take: take
            });
            const total_data = yield this.prisma.users.count({
                where: {
                    name: { contains: query.name, mode: "insensitive" },
                    role: { equals: query.role }
                }
            });
            return {
                total_data: total_data,
                total_pages: Math.ceil(total_data / query.limit),
                current_page: query.page,
                data: users
            };
        });
    }
    GetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.users.findUnique({
                where: { id: id },
                select: {
                    user_id: true,
                    email: true,
                    name: true,
                    role: true
                }
            });
        });
    }
    Update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Object.values(client_1.user_role).includes(payload.role)) {
                    throw new Error(`Invalid role: ${payload.role}. Expected one of ${Object.values(client_1.user_role).join(", ")}.`);
                }
                return yield this.prisma.users.update({ where: { id: id }, data: payload });
            }
            catch (error) {
                throw error;
            }
        });
    }
    Destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.users.delete({ where: { id: id } });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map