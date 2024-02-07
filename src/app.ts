import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import appRouter from "./routes/index.js";
 
dotenv.config();

const app=express();

app.use(express.json())

app.use(morgan("dev"))

app.use(cors({ origin: process.env.FRONT_END_URL, credentials: false }));
app.use("/api/v1", appRouter);

export default app;