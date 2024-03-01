import express, { Request, Response } from "express";
import cors from "cors";
import { printDeleteOrUpdateResponse, validateToken } from "./middlewares";
import LoginController from "./controller/v1/login";
import CardController from "./controller/v1/card";

const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());

const makeGetLoginHandler = (req: Request, res: Response) => {
  const controller = new LoginController();
  return controller.getLogin(req, res);
};

const makeGetCardsHandler = (req: Request, res: Response) => {
  const controller = new CardController();
  return controller.getCards(req, res);
};

const makeInsertCardsHandler = (req: Request, res: Response) => {
  const controller = new CardController();
  return controller.insertCard(req, res);
};

const makeUpdateCardsHandler = (req: Request, res: Response) => {
  const controller = new CardController();
  return controller.updateCard(req, res);
};

const makeDeleteCardsHandler = (req: Request, res: Response) => {
  const controller = new CardController();
  return controller.deleteCard(req, res);
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
app.use("*", printDeleteOrUpdateResponse);

app.get("/cards", makeGetCardsHandler);
app.post("/cards", makeInsertCardsHandler);
app.put("/cards/:id", makeUpdateCardsHandler);
app.delete("/cards/:id", makeDeleteCardsHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
