"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatListByObjectId = exports.getAllChatDataByUsername = exports.upsertUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error });
    }
});
exports.getAllUsers = getAllUsers;
const upsertUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, title, chat } = req.body;
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            existingUser.chat.push(...chat);
            const updatedUser = yield existingUser.save();
            return ({
                message: "User updated successfully",
                user: updatedUser,
            });
        }
        else {
            const newUser = new User_1.default({ username, title, chat: chat });
            const savedUser = yield newUser.save();
            return ({
                message: "User created successfully",
                user: savedUser,
            });
        }
    }
    catch (error) {
        console.error(error);
        return ({ message: "Error", cause: error || "Internal Server Error" });
    }
});
exports.upsertUser = upsertUser;
function getAllChatDataByUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.body;
            const user = yield User_1.default.findOne({ username });
            if (!user) {
                console.log("User not found");
                return res.status(201).json({ message: "No data has found " + username });
            }
            return res.status(200).json({ message: user.chat });
        }
        catch (error) {
            console.error("Error retrieving chat data:", error);
            return res.status(500).json({ message: "Error" });
        }
    });
}
exports.getAllChatDataByUsername = getAllChatDataByUsername;
;
function getChatListByObjectId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { objectId, username } = req.body;
            console.log("UU " + objectId + " " + username);
            const user = yield User_1.default.findOne({ username });
            if (!user) {
                console.log("User not found");
                return null;
            }
            const chat = user.chat.id(objectId);
            return chat;
        }
        catch (error) {
            console.error("Error retrieving chat by ID and username:", error);
            throw error;
        }
    });
}
exports.getChatListByObjectId = getChatListByObjectId;
;
//# sourceMappingURL=user-controllers.js.map