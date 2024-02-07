import User from "../models/User";

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://pubudupraneeth:QR3vUJSXDedWSGm4@cluster0.ewvg4jh.mongodb.net/xGpt?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res: any) => {
  console.log("Database connected");
}).catch((error: any) => {
  console.log(error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));



module.exports = { db, User };