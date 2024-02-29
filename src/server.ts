import express, { Request, Response } from "express";
import { validateToken } from "./middlewares";

const port = 5000;

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res
    .json({
      message: "Application is healthy",
    })
    .status(200);
});

app.use("*", validateToken);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
