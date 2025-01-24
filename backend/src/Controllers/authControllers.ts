import jwt from "jsonwebtoken";
import type { Response } from "express";
import type { ICustomRequest } from "@/Interfaces/requests";
import { UserModel } from "@/Models/users";
import { ERRORS, JWT } from "@/root/constants";
import { Users } from "@/Interfaces/userInterfaces";
import { computeEmailHash } from "@/Utils/index";
import { Types } from "mongoose";
import { SERVER_ERROR, INVALID_REQUEST } from "@/root/constants";

type TUser = {
  email: string;
  name: string;
  id: string;
};

type TUserHeaders = {
  host?: string;
  connection?: string;
  user?: TUser;
  accept?: string;
};

export async function register(req: ICustomRequest, res: Response) {
  try {
    const { email }: { email: string } = req.body;
    const hashedEmail = computeEmailHash(email);

    // Check if user exists
    if (await UserModel.findOne({ email: hashedEmail })) {
      return res.status(400).send({ error: ERRORS.USER_ALREADY_EXISTS });
    }

    const user: Users = await UserModel.create(req.body);

    return res.send({ user: { id: user._id, email: user.email }, token: generateToken(res, { id: user._id }) });
  } catch (error) {
    return res.status(400).send({ error: ERRORS.INTERNAL_SERVER_ERROR });
  }
}

function generateToken(res: Response, params: { id: Types.ObjectId }) {
  try {
    const token: string = process.env.JWT_SECRET || "";

    return jwt.sign({ params }, token, {
      expiresIn: JWT.lifetime,
    });
  } catch (error) {
    return res.status(500).send({ error: ERRORS.INTERNAL_SERVER_ERROR });
  }
}

export async function signin(req: ICustomRequest, res: Response) {
  const headers: TUserHeaders = req.headers;

  try {
    const email = headers.user?.email || "";
    const hashedEmail = computeEmailHash(email);
    const user: Users | null = await UserModel.findOne({ email: hashedEmail });

    if (!user) return res.status(400).send({ error: ERRORS.USER_NOT_FOUND });

    return res
      .status(200)
      .send({ user: { id: user._id, email: user.email }, token: generateToken(res, { id: user._id }) });
  } catch (error) {
    return res.status(500).send({ error: ERRORS.INTERNAL_SERVER_ERROR });
  }
}

export async function validateUserRegistration(req: ICustomRequest, res: Response) {
  const userHeader = req.headers["user"];

  if (!userHeader) {
    return res.status(400).send({ error: INVALID_REQUEST });
  }

  let user: TUser;
  try {
    user = JSON.parse(userHeader.toString());
  } catch (error) {
    return res.status(400).send({ error: INVALID_REQUEST });
  }

  const { email, name }: { email: string; name: string } = user;

  try {
    const userInDB = await UserModel.findOne({ email });
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET || "", { expiresIn: "24h" });

    if (userInDB) {
      return res.status(200).send({
        userExist: true,
        user: { _id: userInDB._id, email: userInDB.email, username: userInDB.username },
        token: token,
      });
    }

    const addedUser = new UserModel({
      _id: new Types.ObjectId(),
      token,
      name,
      username: name,
      email,
      password: token,
      created: new Date(),
      updated: new Date(),
      last_login: new Date(),
      active: true,
      verified: false,
    });

    const savedUser = await addedUser.save();

    return res
      .status(200)
      .send({ userExist: true, user: { _id: savedUser._id, email: email, username: name }, token: token });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).send({ error: SERVER_ERROR });
  }
}
