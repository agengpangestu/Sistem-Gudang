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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: ["error", "info", "query", "warn"]
});
class PrismaUtils {
    constructor() {
        this.prisma = exports.prisma;
    }
    get products() {
        return this.prisma.product;
    }
    get mutations() {
        return this.prisma.mutation;
    }
    get users() {
        return this.prisma.user;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.$connect();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.$disconnect();
        });
    }
}
exports.default = PrismaUtils;
//# sourceMappingURL=prisma.js.map