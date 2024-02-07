import { Router } from "express";
import {getAllChatDataByUsername, getChatListByObjectId} from "../controllers/user-controllers";

const userRoutes = Router();


userRoutes.post("/getAllChat",getAllChatDataByUsername);
userRoutes.post("/getChatById",getChatListByObjectId);

export default userRoutes;