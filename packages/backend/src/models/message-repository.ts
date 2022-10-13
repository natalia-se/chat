import { Message } from "@chat-app/shared";
import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  text: String,
  timeStamp: Date,
});

const MessageModel = model<Message>("Message", MessageSchema);

export const getAll = async (): Promise<Message[]> => {
  return MessageModel.find({}).exec();
};

export const get = async (messageId: string): Promise<Message | null> => {
  return MessageModel.findById(messageId).exec();
};

export const save = async (message: Message): Promise<void> => {
  const newMessage = new MessageModel(message);
  newMessage.save();
};
