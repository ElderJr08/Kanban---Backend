import express, { Request, Response } from "express";

const port = 5000;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res
    .json({
      message: "Hello",
    })
    .status(200);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
