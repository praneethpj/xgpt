import { NextFunction, Response, Request } from "express";
import User from "../models/User"
import mongoose from "mongoose";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const users = await User.find();
    return res.status(200).json({ message: "OK", users })

  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error })
  }

}

export const upsertUser = async (req: Request) => {
  try {
    const { username, title, chat } = req.body;

    const existingUser = await User.findOne({ username });


    if (existingUser) {

      existingUser.chat.push(...chat);

      const updatedUser = await existingUser.save();

      return ({
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {

      const newUser = new User({ username, title, chat: chat });

      const savedUser = await newUser.save();

      return ({
        message: "User created successfully",
        user: savedUser,
      });
    }
  } catch (error) {
    console.error(error);
    return ({ message: "Error", cause: error || "Internal Server Error" });
  }
};

export async function getAllChatDataByUsername(req: Request,
  res: Response,
  next: NextFunction) {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(201).json({ message: "No data has found " + username });

    }


    return res.status(200).json({ message: user.chat });
  } catch (error) {
    console.error("Error retrieving chat data:", error);
    return res.status(500).json({ message: "Error" });

  }
};

export async function getChatListByObjectId(req: Request,
  res: Response,
  next: NextFunction) {
  try {
    const { objectId, username} = req.body;
  
    console.log("UU "+objectId+" "+username );
      const user = await User.findOne({ username });
      
      if (!user) {
        console.log("User not found");
        return null;
      }
  
      const chat = user.chat.id(objectId);
      return chat;
    } catch (error) {
      console.error("Error retrieving chat by ID and username:", error);
      throw error;
    }
};  