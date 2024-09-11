"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalError = void 0;
const unauthorized_1 = __importDefault(require("./unauthorized"));
const not_found_1 = __importDefault(require("./not.found"));
const joi_1 = __importDefault(require("./joi"));
const database_1 = __importDefault(require("./database"));
const GlobalError = (err, req, res, next) => {
    if (err instanceof unauthorized_1.default) {
        return res.status(403).json({
            status: false,
            name: err.name,
            message: err.message,
            statusCode: 403
        });
    }
    else if (err instanceof not_found_1.default) {
        return res.status(404).json({
            status: false,
            name: err.name,
            message: err.message,
            statusCode: 404
        });
    }
    else if (err instanceof joi_1.default) {
        return res.status(422).json({
            status: false,
            name: err.name,
            message: err.message.replace(/\"/g, ""),
            details: err.details,
            statusCode: 422
        });
    }
    else if (err instanceof database_1.default) {
        return res.status(422).json({
            status: false,
            name: err.name,
            code: err.code,
            message: err.message.replace(/\"/g, ""),
            statusCode: 422
        });
    }
    else {
        return res.status(500).json({
            status: false,
            message: "Something error",
            statusCode: 500
        });
    }
};
exports.GlobalError = GlobalError;
//# sourceMappingURL=global.js.map