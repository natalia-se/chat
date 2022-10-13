import { model, Schema } from "mongoose";

export interface UserInfo {
  username: string;
  password: string;
  name: string;
  roles: string[];
}

const UserInfoSchema = new Schema({
  username: String,
  password: String,
  roles: Array<String>,
});

const UserInfoModel = model<UserInfo>("UserInfo", UserInfoSchema);

export const loadUserByUsername = async (
  username: string
): Promise<UserInfo | null> => {
  return await UserInfoModel.findOne({ username: username }).exec();
};

export const saveUserInfo = async (
  username: string,
  hashedPass: any
): Promise<UserInfo> => {
  const newUser = new UserInfoModel({
    username: username,
    password: hashedPass,
  });

  return await newUser.save();
};