"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const CONFIG = {
    jwt_public: process.env.JWT_PUBLIC,
    jwt_private: process.env.JWT_PRIVATE
};
exports.default = CONFIG;
//# sourceMappingURL=environment.js.map