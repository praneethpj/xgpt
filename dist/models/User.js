"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: () => (0, crypto_1.randomUUID)(), // Use a function to generate a new UUID for each document
    },
    messageBot: {
        type: String,
    },
    messageUser: {
        type: String,
    },
});
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    chat: [chatSchema],
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map