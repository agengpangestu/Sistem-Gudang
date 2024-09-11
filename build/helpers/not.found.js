"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorNotFound extends Error {
    constructor(message = "Sorry, Data not found") {
        super(message);
        this.name = "Not Found";
    }
}
exports.default = ErrorNotFound;
//# sourceMappingURL=not.found.js.map