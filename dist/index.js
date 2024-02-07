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
const { db, User } = require('./db/connection');
const user_controllers_1 = require("./controllers/user-controllers");
const app_1 = __importDefault(require("./app"));
const WebSocket = require('websocket').server;
const http = require('http');
const utils = require('./utils/utils');
const server = http.createServer(app_1.default);
app_1.default.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, worssld!' });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
const webSocketServer = new WebSocket({
    httpServer: server,
});
webSocketServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    connection.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        // Handle incoming WebSocket messages here
        console.log("Incoming msg: " + message.utf8Data);
        const ai21Response = yield utils.generateAI21Text(message.utf8Data);
        console.log(ai21Response);
        const responseMessages = JSON.stringify({ openAI: "xGpt : ", content: ai21Response });
        connection.sendUTF(responseMessages);
        const jsonObject = JSON.parse(message.utf8Data);
        const req = {
            "username": jsonObject.username,
            "title": jsonObject.content,
            "chat": [
                {
                    "messageBot": ai21Response,
                    "messageUser": jsonObject.content
                }
            ]
        };
        (0, user_controllers_1.upsertUser)({ body: req });
    }));
    connection.on('close', (reasonCode, description) => {
        // Handle WebSocket connection closure here
    });
});
//# sourceMappingURL=index.js.map