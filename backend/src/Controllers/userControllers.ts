import { Request, Response, NextFunction } from "express";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { createHmac, generateKey } from "crypto";
import { Types } from "mongoose";
import { Users } from "@/Interfaces/userInterfaces";
import { UserModel } from "@/Models/users";
import jwt from "jsonwebtoken";
import {
  SUCCESS,
  ALREADY_EXISTS,
  SERVER_ERROR,
  INVALID_REQUEST,
  INVALID_ACCOUNT_DATA,
  PASSWORD_LENGTH_ERROR,
  ACTIVATION_EMAIL_TITLE,
  ACTIVATION_EMAIL_SENDER,
  ACTIVATION_KEY_INVALID,
  ACTIVATION_FAILED,
  ACTIVATION_SUCCESS,
  INVALID_EMAIL,
  EMAIL_WHITELIST_REGEX,
} from "@/root/constants";

type SignUpRequestProps = {
  username: string;
  email: string;
  name: string;
  phone: string;
  userProfilePic: string;
  password: string;
  singupType: string;
};

type ActivateAccountRequestProps = {
  activationKey: string;
};

type LoginRequestProps = {
  email: string;
  password: string;
};

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, name, phone, userProfilePic, password = "", singupType }: SignUpRequestProps = req.body;
    const role: string = "basic";
    const generatedUserId: Types.ObjectId = new Types.ObjectId();

    if (!email) return res.status(400).json({ message: INVALID_ACCOUNT_DATA });

    if (!EMAIL_WHITELIST_REGEX.test(email)) return res.status(400).json({ message: INVALID_EMAIL });

    if (singupType === "email" && password.length < 8) return res.status(400).json({ message: PASSWORD_LENGTH_ERROR });

    const baseUser: Partial<Users> | null = {
      username,
      userProfilePic,
      email,
      name,
      phone,
      role,
    };

    const searchedUser = await UserModel.findOne({ email: email });

    if (searchedUser) {
      return res.status(400).json({ message: ALREADY_EXISTS });
    }

    const activationKey = singupType === "email" ? await createActivationKey(generatedUserId) : "";

    const addedUser = new UserModel({
      ...baseUser,
      _id: generatedUserId,
      name: name,
      username: username || name,
      password: password,
      created: new Date(),
      updated: new Date(),
      activationKey: activationKey,
      // if it's not email, it's already active, so no need to verify
      active: singupType !== "email",
      verified: false,
      last_login: new Date(),
    });

    const savedUser = await addedUser.save();

    if (!savedUser) return res.status(500).json({ message: SERVER_ERROR });

    // if it's email, send activation email
    if (singupType === "email") sendActivationEmail(email, activationKey);

    const token: string = process.env.JWT_SECRET || "";
    const userToken: string = jwt.sign({ userId: addedUser._id }, token, { expiresIn: "24h" });

    return res.status(201).json({
      message: SUCCESS,
      email: email,
      id: generatedUserId,
      image: userProfilePic,
      name: name,
      token: userToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function activateAccount(req: Request, res: Response, next: NextFunction) {
  const { activationKey }: ActivateAccountRequestProps = req.body;

  if (!activationKey || typeof activationKey !== "string") {
    return res.status(400).json({ message: ACTIVATION_KEY_INVALID });
  }

  try {
    const searchedUser = await UserModel.findOne({ activationKey: activationKey });

    if (!searchedUser) {
      return res.status(404).json({ message: ACTIVATION_FAILED });
    }

    await UserModel.updateOne({ _id: searchedUser._id }, { active: true, verified: true, activationKey: "" }).exec();

    return res.status(202).json({ message: ACTIVATION_SUCCESS });
  } catch (error) {
    console.error("Error activating account:", error);
    next(error);
  }
}

async function createActivationKey(userId: Types.ObjectId) {
  const userHexId: string = userId.toHexString();
  const aesKeyLength: number = 256;
  let aesKey: string = "";

  generateKey("aes", { length: aesKeyLength }, (error, key) => {
    if (error) return null;
    aesKey = key.export().toString("hex");
  });

  return createHmac("sha256", aesKey).update(userHexId).digest("hex");
}

async function sendActivationEmail(email: string, activationKey: string) {
  const sentFrom: Sender = new Sender(ACTIVATION_EMAIL_SENDER.email, ACTIVATION_EMAIL_SENDER.name);
  const recipients: Array<Recipient> = [new Recipient(email)];
  const mailerSend: MailerSend = new MailerSend({
    apiKey: `${process.env.MAILER_API_KEY}`,
  });

  const emailParams: EmailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(ACTIVATION_EMAIL_TITLE)
    .setHtml(
      `<p>You did it! Thank you for joining The Daily Tide adventure! Read unbiased news, share them and interact with our community :)</p>
       <p>Now you need to activate your account <a href='${process.env.MAILER_FRONTEND_BASEURL}/auth/activation/${activationKey}'>here</a>. And you are ready to go! <p/>
     <br/>
     <p>Kind regards,<p/>
    The Daily Tide team`,
    );

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.error("[FAILURE] - Error while sending an activation email to:", error);
  }
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]?.split(" ")[0];

  if (authHeader == null) return res.sendStatus(401);

  const secret = process.env.JWT_SECRET || "";

  jwt.verify(authHeader, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    next(user);
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: LoginRequestProps = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: INVALID_REQUEST });
    }

    const token: string = process.env.JWT_SECRET || "";
    const userToken: string = jwt.sign({ userId: user._id }, token, { expiresIn: "24h" });

    return res.status(200).json({
      message: SUCCESS,
      email: user.email,
      id: user._id,
      image: user.userProfilePic,
      name: user.name,
      token: userToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const user = (await UserModel.findById(userId).select("username email name userProfilePic summary").exec()) || {};

    return res.status(200).json({
      message: SUCCESS,
      user: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const { username, email, name, phone, userProfilePic, summary } = req.body;

    if (!userId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        username,
        email,
        name,
        phone,
        userProfilePic,
        summary,
      },
      { new: true },
    ).select("username email name userProfilePic summary");

    if (!updatedUser) {
      return res.status(500).json({ message: SERVER_ERROR });
    }

    return res.status(200).json({
      message: SUCCESS,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const deletedUser = await UserModel.deleteOne({ _id: userId });

    if (!deletedUser) {
      return res.status(500).json({ message: SERVER_ERROR });
    }

    return res.status(200).json({
      message: SUCCESS,
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}
