import { Message } from "@chat-app/shared";
import { model, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    text: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const MessageModel = model<Message>("Message", MessageSchema);

export const getAll = async (): Promise<Message[]> => {
  return MessageModel.find({}).populate("author").exec();
};

export const save = async (message: Message): Promise<Message> => {
  const newMessage = new MessageModel(message);
  return newMessage.save();
};
