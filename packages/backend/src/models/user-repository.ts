import { model, Schema } from "mongoose";
import { User } from "@chat-app/shared";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = model<User>("User", userSchema);

export const loadUserByUsername = async (
  username: string
): Promise<User | null> => {
  return await UserModel.findOne({ username: username }).exec();
};

export const saveUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const newUser = new UserModel({
    username,
    password,
    email,
  });

  return await newUser.save();
};
