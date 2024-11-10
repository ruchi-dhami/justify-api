import { Response } from "express";

import { justifyText } from "../services/justifyService";

import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { ErrorCode } from "../constants/statusCode";

export const justifyTextController = (req: AuthenticatedRequest, res: Response): void => {
  try {
    const  text = req.body;

    if (typeof text !== "string") {
       res.status(ErrorCode.BAD_REQUEST).json({ error: "Text must be provided in plain text format" });
       return;
    }
  
    const justifiedText = justifyText(text);
  
    res.type("text/plain").send(justifiedText);
  } catch (error) {
    // Log the error details for internal tracking
    console.error("Error justifying text:", error);
    
    // Return a 500 Internal Server Error if an unexpected error occurs
    res.status(ErrorCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
  
};
