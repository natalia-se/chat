import { Credentials } from "@chat-app/shared";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "@chat-app/shared";
import { loadUserByUsername, saveUser } from "../models/user-repository";
const bcrypt = require("bcrypt");

const secret: string =
  process.env.TOKEN_SECRET ||
  "f9daa8f6d9ec89bd339e1fa53ae744d98e8170d822f2f014ed0a5f49d392059ee1210953f28e1a535e0980c73750cb077b95c8fa3a676bbf2907e86f8dc8b741";
const JWT_COOKIE_NAME = "jwt";

export type TokenPayload = {
  sub: string;
  name: string;
};
export const register = async (
  req: JwtRequest<User>,
  res: Response<User | string>
) => {
  console.log("/register");
  console.log(req.body);

  const user = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);

    const newUser = await saveUser(user.username, user.email, hashedPass);

    res.status(200).send(newUser);
  } catch (e) {
    let err = e as NodeJS.ErrnoException;
    // console.log("🚨", err.code, "🚨");
    console.log("🚨", err.message, "🚨");

    if (err.code && err.code == "11000") {
      res.status(400).json("Duplicate username");
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

///
const performUserAuthentication = async (
  credentials: Credentials
): Promise<User | null> => {
  const userInfo = await loadUserByUsername(credentials.username);
  if (
    userInfo &&
    (await bcrypt.compare(credentials.password, userInfo.password))
  ) {
    return userInfo;
  }
  return null;
};
