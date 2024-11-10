import crypto from "crypto";

import { User } from "../models/user";

const users: Map<string, User> = new Map();

export const generateToken = (email: string): string => {
  const token = crypto.randomBytes(16).toString("hex");

  users.set(token, { email, token, dailyWordCount: 0, lastRequestDate: new Date() });
  return token;
};

export const getUserByToken = (token: string): User | undefined => {
  return users.get(token);
};

export const updateDailyWordCount = (token: string, wordCount: number) => {
  const user = users.get(token);

  if (user) {
    user.dailyWordCount += wordCount;
    user.lastRequestDate = new Date();
  }
  
};
