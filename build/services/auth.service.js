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
class AuthService {
    constructor() {
        this.prisma = new prisma_1.default();
    }
    Register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return yield this.prisma.users.create({ data: payload });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                    if (error) {
                        let err = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
                        const a = err.map((e) => e);
                        throw new database_1.default(error.name, `field: '${a}' must unique or registered`);
                    }
                }
                throw error;
            }
        });
    }
    Login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.users.findUnique({ where: { email: email } });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map