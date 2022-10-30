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

export interface JwtRequest<T> extends Request<T> {
  jwt?: TokenPayload;
}

export const authenticateToken = (
  req: JwtRequest<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies[JWT_COOKIE_NAME];

  if (token) {
    try {
      const decoded = jsonwebtoken.verify(token, secret) as TokenPayload;

      req.jwt = decoded;
    } catch (err) {
      return res.sendStatus(403); // Bad token!
    }
  } else {
    return res.sendStatus(401); // No token! Unauthorized!
  }

  next();
};

export const loginUser = async (
  req: JwtRequest<Credentials>,
  res: Response<string>
) => {
  const credentials = req.body;

  const user = await performUserAuthentication(credentials);
  if (!user) {
    return res.sendStatus(403);
  }

  console.log("Got credentials:", credentials);
  const token = jsonwebtoken.sign({ sub: user.username }, secret, {
    expiresIn: "1800s",
  });
  return res.status(200).cookie(JWT_COOKIE_NAME, token).send(token);
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const register = async (
  req: JwtRequest<User>,
  res: Response<User | string>
) => {
  console.log("/register");
  console.log(req.body);

  const user = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(user.password, salt);

  const newUser = await saveUser(user.username, user.email, hashedPass);

  res.status(200).send(newUser);
};

///
const performUserAuthentication = async (
  credentials: Credentials
): Promise<User | null> => {
  const user = await loadUserByUsername(credentials.username);
  if (user && (await bcrypt.compare(credentials.password, user.password))) {
    return user;
  }
  return null;
};
