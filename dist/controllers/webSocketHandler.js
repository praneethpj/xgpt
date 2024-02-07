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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = void 0;
var utils = require('../utils/utils');
const WebSocket = require('websocket').server;
function setupWebSocket(server) {
    const webSocketServer = new WebSocket.server({
        httpServer: server,
    });
    webSocketServer.on('request', (request) => {
        const connection = request.accept(null, request.origin);
        connection.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            // Handle incoming WebSocket messages here
            console.log("Incoming msg: " + message.utf8Data);
            const ai21Response = yield utils.generateAI21Text(message.utf8Data);
            console.log(ai21Response);
            const responseMessages = JSON.stringify({ openAI: "xGpt : ", content: ai21Response });
            connection.sendUTF(responseMessages);
        }));
        connection.on('close', (reasonCode, description) => {
            // Handle WebSocket connection closure here
        });
    });
}
exports.setupWebSocket = setupWebSocket;
// Example usage:
// const server = await startServer();
// setupWebSocket(server);
//# sourceMappingURL=webSocketHandler.js.map