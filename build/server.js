"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./utils/logger");
const server_1 = __importDefault(require("./utils/server"));
const app = (0, server_1.default)();
const PORT = 4000;
app.listen(PORT, () => logger_1.logger.info(`server running at port ${PORT}`));
//# sourceMappingURL=server.js.map