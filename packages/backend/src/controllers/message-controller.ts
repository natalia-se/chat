import { Message } from "@chat-app/shared";
import { Router, Request, Response } from "express";
import { loadMessages, sendMessage } from "../services/chat-service";
import { JwtRequest } from "../utils/jwt";

const messagesController = Router();
const { StatusCodes } = require("http-status-codes");

messagesController.get("/", async (req: Request, res: Response<Message[]>) => {
  res.send(await loadMessages());
});

messagesController.post(
  "/",
  async (req: JwtRequest<Message>, res: Response) => {
    const { text }: { text: string } = req.body;
    try {
      if (!text || text == "") {
        throw new Error("No text in the message!");
      }

      const author = req.jwt?.id || "";
      res.send(await sendMessage({ text, author }));
    } catch (e) {
      const error = e instanceof Error ? e.message : e;
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "failed to send message", error: error });
    }
  }
);

export default messagesController;
