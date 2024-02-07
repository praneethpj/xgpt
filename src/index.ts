import mongoose from "mongoose";
const { db, User } = require('./db/connection');

import { upsertUser } from "./controllers/user-controllers";
import app from "./app";


const WebSocket = require('websocket').server;
const http = require('http');

const utils = require('./utils/utils');


const server = http.createServer(app);


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, worssld!' });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const webSocketServer = new WebSocket({
  httpServer: server,
});


webSocketServer.on('request', (request: any) => {
  const connection = request.accept(null, request.origin);


  connection.on('message', async (message: any) => {
    // Handle incoming WebSocket messages here
    console.log("Incoming msg: " + message.utf8Data);





    const ai21Response = await utils.generateAI21Text(message.utf8Data);
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

    upsertUser({ body: req } as any);

  });

  connection.on('close', (reasonCode: any, description: any) => {
    // Handle WebSocket connection closure here
  });
});

