import { Message } from "@chat-app/shared";
import { getAll, save } from "../models/message-repository";

export const sendMessage = async (message: Message): Promise<Message[]> => {
  message.timeStamp = new Date();
  await save(message);

  return await getAll();
};

export const loadMessages = async (): Promise<Message[]> => {
  return await getAll();
};
