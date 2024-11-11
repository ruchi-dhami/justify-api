import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { generateTokenController } from "./controllers/authContoller";
import { justifyTextController } from "./controllers/justifyController";

import { authenticateToken, rateLimit } from "./middlewares/authMiddleware";

import { ErrorCode } from "./constants/statusCode";

dotenv.config();

const app = express();
app.use(bodyParser.text());

// Route for the root URL
app.get("/", (req: Request, res: Response) => {
            res.send(`
                        Welcome to justify-api!
                        The RESTful API built with TypeScript for text justification. 
                        The API includes token-based authentication, rate-limiting, and error-handling mechanisms.`);
});

// authentication endpoint
app.post("/api/token", express.json(), generateTokenController);

// Text justification endpoint with authentication and rate limiting
app.post("/api/justify", express.json(), authenticateToken, rateLimit, justifyTextController);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(ErrorCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
});

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
