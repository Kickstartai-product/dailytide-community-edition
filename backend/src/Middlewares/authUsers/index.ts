import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SERVER_ERROR, INVALID_TOKEN, AUTHENTICATION_ERROR } from "@/root/constants";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[0];

  if (!token) return res.status(401).json({ error: AUTHENTICATION_ERROR });

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    return res.status(500).json({ error: SERVER_ERROR });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: INVALID_TOKEN });
    }

    req.user = decoded;
    next();
  });
};

export default authenticateToken;
