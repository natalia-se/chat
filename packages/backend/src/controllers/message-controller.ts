import { Message } from "@chat-app/shared";
import express, { Router, Request, Response } from "express";
import { JwtRequest } from "../services/auth";
import { loadMessages, sendMessage } from "../services/chat-service";

const messagesController = express.Router();

messagesController.get("/", async (req: Request, res: Response<Message[]>) => {
  res.send(await loadMessages());
});

messagesController.post("/", async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    if (!text || text == "") {
      throw new Error("No text in the message!");
    }

    res.send(await sendMessage(req.body));
  } catch (error) {
    res.status(400).json({ message: "failed to send message", error: error });
  }
});

// messagesController.post(
//   "/",
//   async (req: JwtRequest<Message>, res: Response<Message[]>) => {
//     try {
//       const token = req.jwt;
//       if (!token) throw new Error("Missing JWT!");
//       res.send(await sendMessage(req.body, token?.sub));
//     } catch (e) {
//       res.sendStatus(400);
//     }
//   }
// );

export default messagesController;
