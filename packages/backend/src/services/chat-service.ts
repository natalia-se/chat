import { Message } from "@chat-app/shared";
import { getAll, save } from "../models/message-repository";

export const sendMessage = async (
  message: Message,
  author: string
): Promise<Message[]> => {
  if (!message.text || message.text == "") {
    throw new Error("No text in message!");
  }

  message.timeStamp = new Date();
  message.author = author;

  await save(message);

  return await getAll();
};

export const loadMessages = async (): Promise<Message[]> => {
  return await getAll();
};
