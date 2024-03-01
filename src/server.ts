import express, { Request, Response } from "express";
import { validateToken } from "./middlewares";
import LoginController from "./controller/v1/login";
import CardController from "./controller/v1/card";

const port = 5000;

const app = express();
app.use(express.json());

const makeGetLoginHandler = (req: Request, res: Response) => {
  const controller = new LoginController();
  return controller.getLogin(req, res);
};

const makeGetCardsHandler = (req: Request, res: Response) => {
  const controller = new CardController();
  return controller.getCards(req, res);
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

app.get("/cards", makeGetCardsHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
