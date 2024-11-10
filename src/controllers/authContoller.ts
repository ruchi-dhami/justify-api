import { Request, Response } from "express";

import { generateToken } from "../services/authService";
import { ErrorCode } from "../constants/statusCode";

export const generateTokenController = (req: Request, res: Response): void => {
  try {
    const { email } = req.body;

    if (!email) {
       res.status(ErrorCode.BAD_REQUEST).json({ error: "Email is required" });
       return;
    }
  
    const token = generateToken(email);
     res.status(ErrorCode.SUCCESS).json({ token });
     
  } catch(error){
    // Log the error details for internal tracking
    console.error("Error in generating token:", error);
    
    // Return a 500 Internal Server 
    res.status(ErrorCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
 
};