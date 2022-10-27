import cors from "cors";
import express, { Application, json } from "express";
import dotenv from "dotenv";
import messageController from "./controllers/message-controller";
import { setupMongoDb } from "./models/db";
import { authenticateToken, loginUser, register } from "./services/auth";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();
app.use(cookieParser());
app.use(cors());
app.use(json());

const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoUrl: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/chat";
console.log(`MONGOFB_URL: ${mongoUrl}`);

app.post("/register", register);
app.post("/login", loginUser);
app.use("/chat", authenticateToken);
app.use("/chat", messageController);

app.listen(port, async function () {
  await setupMongoDb(mongoUrl);
  console.log(`🚀🚀🚀🚀🚀 App is listening on port ${port}! 🚀🚀🚀🚀🚀`);
});
