import express, { Request, Response } from "express";
import { validateToken } from "./middlewares";
import LoginController from "./controller/v1/login";

const port = 5000;

const app = express();
app.use(express.json());

const makeGetLoginHandler = (req: Request, res: Response) => {
  const controller = new LoginController();
  return controller.getLogin(req, res);
};

app.get("/health", (req: Request, res: Response) => {
  res
    .json({
      message: "Application is healthy",
    })
    .status(200);
});

app.post("/login", makeGetLoginHandler);

app.use("*", validateToken);

app.get("/cards", (req: Request, res: Response) => {
  res
    .json({
      cards: [],
    })
    .status(200);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
