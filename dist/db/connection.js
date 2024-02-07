"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb+srv://pubudupraneeth:QR3vUJSXDedWSGm4@cluster0.ewvg4jh.mongodb.net/xGpt?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
module.exports = { db, User: User_1.default };
//# sourceMappingURL=connection.js.map