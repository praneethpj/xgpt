"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/getAllChat", user_controllers_1.getAllChatDataByUsername);
userRoutes.post("/getChatById", user_controllers_1.getChatListByObjectId);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map