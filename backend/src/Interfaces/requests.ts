import { Request } from "express";

export interface ICustomRequest extends Request {
  userId?: string;
}
