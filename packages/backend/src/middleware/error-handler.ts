import { Request, Response } from "express";
import { ICustomError } from "../errors/custom-error";
const { StatusCodes } = require("http-status-codes");

const errorHandler = (
  // eslint-disable-next-line
  err: any,
  req: Request,
  res: Response
) => {
  console.log(`🚨🚨 ${err} 🚨🚨`);
  console.log(Object.keys(err));

  console.log(`${err.name}`);
  console.log(`errno: ${err.errno}`);
  console.log(`message: ${err.message}`);
  console.log(`code: ${err.code}`);
  console.log(`stack: ${err.stack}`);

  const customError: ICustomError = {
    // set default
    statusCode: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // if (err.name === "ValidationError") {
  //   customError.msg = Object.values(err.errors)
  //     .map((item: ) => item.message)
  //     .join(",");
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }

  if (err.name === "MongoServerError" && err?.code == "11000") {
    customError.msg = err.message;
    customError.msg = `Duplicate value entered for [${Object.keys(
      err.keyValue
    )}] field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
