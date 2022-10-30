import { Request } from "express";

export type TokenPayload = {
  id: string;
  name: string;
};

export interface JwtRequest<T> extends Request<T> {
  jwt?: TokenPayload;
}
