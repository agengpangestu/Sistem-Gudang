"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class DatabaseErrorConstraint extends client_1.Prisma.PrismaClientKnownRequestError {
    constructor(name, message) {
        super(name, message);
        this.name = name;
        this.message = message;
    }
}
exports.default = DatabaseErrorConstraint;
//# sourceMappingURL=database.js.map