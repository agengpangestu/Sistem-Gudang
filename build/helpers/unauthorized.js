"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Unauthorized extends Error {
    constructor(message = "This route is protected and you don't has authority to access", data = {}) {
        super(message);
        this.data = data;
        this.name = "Unauthorized";
        this.data = data;
    }
}
exports.default = Unauthorized;
//# sourceMappingURL=unauthorized.js.map