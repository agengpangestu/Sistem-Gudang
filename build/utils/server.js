"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const deserializedToken_1 = __importDefault(require("./deserializedToken"));
const index_routes_1 = require("../routes/index.routes");
const global_1 = require("../helpers/global");
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        next();
    });
    app.use(deserializedToken_1.default);
    (0, index_routes_1.routes)(app);
    app.use(global_1.GlobalError);
    return app;
};
exports.default = createServer;
//# sourceMappingURL=server.js.map