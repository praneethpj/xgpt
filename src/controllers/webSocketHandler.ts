 
var utils=require( '../utils/utils');
const WebSocket = require('websocket').server;

export function setupWebSocket(server:any) {
    const webSocketServer = new WebSocket.server({
        httpServer: server,
    });

    webSocketServer.on('request', (request:any) => {
        const connection = request.accept(null, request.origin);

        connection.on('message', async (message:any) => {
            // Handle incoming WebSocket messages here
            console.log("Incoming msg: " + message.utf8Data);

            const ai21Response = await utils.generateAI21Text(message.utf8Data);
            console.log(ai21Response);

            const responseMessages = JSON.stringify({ openAI: "xGpt : ", content: ai21Response });
            connection.sendUTF(responseMessages);
        });

        connection.on('close', (reasonCode: any, description: any) => {
            // Handle WebSocket connection closure here
        });
    });
}

// Example usage:
// const server = await startServer();
// setupWebSocket(server);
