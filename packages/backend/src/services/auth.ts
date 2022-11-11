import { NextFunction, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { Credentials } from "@chat-app/shared";
import { User } from "@chat-app/shared";
import { loadUserByUsername, saveUser } from "../models/user-repository";
import { TokenPayload, JwtRequest } from "../utils/jwt";

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const secret: string =
  process.env.TOKEN_SECRET ||
  "f9daa8f6d9ec89bd339e1fa53ae744d98e8170d822f2f014ed0a5f49d392059ee1210953f28e1a535e0980c73750cb077b95c8fa3a676bbf2907e86f8dc8b741";
const JWT_COOKIE_NAME = "jwt";

export const authenticateToken = (
  req: JwtRequest<string>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = extractToken(req);

  if (token) {
    try {
      const decoded = jsonwebtoken.verify(token, secret) as TokenPayload;

      req.jwt = decoded;
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Bad token!" });
    }
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No token! Unauthorized!" });
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
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  console.log("Got credentials:", credentials);
  const token = jsonwebtoken.sign(
    { id: user._id, name: user.username },
    secret,
    {
      expiresIn: "1800s",
    }
  );
  return res.status(StatusCodes.OK).cookie(JWT_COOKIE_NAME, token).send(token);
};

export const register = async (
  req: JwtRequest<User>,
  res: Response<User | string>
) => {
  const user = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(user.password, salt);

  const newUser = await saveUser(user.username, user.email, hashedPass);

  res.status(StatusCodes.OK).send(newUser);
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
function extractToken(req: JwtRequest<string>): string | undefined {
  return req.header("Authorization")?.split(" ")[1];
}
