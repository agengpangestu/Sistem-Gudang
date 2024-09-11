"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const mutation_controller_1 = __importDefault(require("../controller/mutation.controller"));
const mutationController = new mutation_controller_1.default();
exports.MutationRoute = (0, express_1.Router)();
exports.MutationRoute.get("/", mutationController.GetAll);
exports.MutationRoute.get("/:id", auth_1.RequiredAdmin, mutationController.GetById);
exports.MutationRoute.post("/post-mutation", auth_1.RequiredAdmin, mutationController.Store);
exports.MutationRoute.put("/:id/update-mutation", auth_1.RequiredAdmin, mutationController.Update);
exports.MutationRoute.delete("/:id/delete-mutation", auth_1.RequiredAdmin, mutationController.Destroy);
//# sourceMappingURL=mutation.route.js.map