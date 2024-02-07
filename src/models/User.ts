import { randomUUID } from "crypto";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => randomUUID(),  // Use a function to generate a new UUID for each document
  },
  messageBot: {
    type: String,
  },
  messageUser: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  
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

export default mongoose.model("User", userSchema);