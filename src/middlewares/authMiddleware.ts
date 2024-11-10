import { Request, Response, NextFunction } from "express";

import { getUserByToken, updateDailyWordCount } from "../services/authService";

import { User } from "../models/user";
import { ErrorCode } from "../constants/statusCode";

const MAX_DAILY_WORDS = process.env.RATE_LIMIT || 80000;

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(ErrorCode.UNAUTHORIZED).json({ error: "Token is required" });
    return;
  }

  const user = getUserByToken(token);

  if (!user) {
    res.status(ErrorCode.UNAUTHORIZED).json({ error: "Invalid token" }) 
    return;
  }

  req.user = user;
  next();
};


export const rateLimit = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const user = req.user;


  if (!user) {
    res.status(ErrorCode.UNAUTHORIZED).json({ error: "Unauthorized request" });
    return;
  }

  const text = req.body;

  const wordCount = text.split(/\s+/).length;

  // Reset daily count if the request is on a new day
  const today = new Date().toISOString().slice(0, 10);
  const lastRequest = user.lastRequestDate.toISOString().slice(0, 10);

  if (today !== lastRequest) {
    user.dailyWordCount = 0;
    user.lastRequestDate = new Date();
  }

  // Check if the word count exceeds the limit
  if (user.dailyWordCount + wordCount > MAX_DAILY_WORDS) {
     res.status(ErrorCode.RATE_LIMIT_EXCEED).json({ error: "Payment Required" });
     return;
  }

  // Update the word count for the user
  updateDailyWordCount(user.token, wordCount);
  next();
};
