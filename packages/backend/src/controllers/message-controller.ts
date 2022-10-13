import { Message } from "@chat-app/shared";
import express, { Router, Request, Response } from "express";
import { JwtRequest } from "../services/auth";
import { loadMessages, sendMessage } from "../services/chat-service";

const messagesController = express.Router();

messagesController.get("/", async (req: Request, res: Response<Message[]>) => {
  res.send(await loadMessages());
});

// messagesController.get(
//   "/:todoId",
//   async (req: Request, res: Response<TodoItem>) => {
//     try {
//       res.send(await loadItemById(req.params.todoId));
//     } catch (e) {
//       res.sendStatus(404);
//     }
//   }
// );

messagesController.post(
  "/",
  async (req: JwtRequest<Message>, res: Response<Message[]>) => {
    try {
      const token = req.jwt;
      if (!token) throw new Error("Missing JWT!");
      res.send(await sendMessage(req.body, token?.sub));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

export default messagesController;
