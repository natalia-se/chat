import { NextFunction, Request, Response } from "express";
import { ICustomError } from "../errors/custom-error";
const { StatusCodes } = require("http-status-codes");

const errorHandler = (
  err: any, //NodeJS.ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`🚨🚨 ${err} 🚨🚨`);
  let customError: ICustomError = {
    // set default
    statusCode: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "MongoServerError" && err?.code == "11000") {
    customError.msg = err.message;
    customError.msg = `Duplicate value entered for [${Object.keys(
      err.keyValue
    )}] field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
