import express, { Request, Response } from "express";
import { generateToken, validateToken } from "./middlewares";

const port = 5000;

const app = express();
app.use(express.json());

const users = [
  {
    userId: "12a",
    login: "letscode",
    senha: "lets@123",
  },
];

app.get("/health", (req: Request, res: Response) => {
  res
    .json({
      message: "Application is healthy",
    })
    .status(200);
});

app.post("/login", (req: Request, res: Response) => {
  try {
    const { login, senha } = req.body || {};

    if ([login, senha].includes(undefined))
      return res
        .status(400)
        .json({ message: "Os campos: login e senha não podem ser vazios." });

    const { userId } =
      users.find((u) => u.login === login && u.senha === senha) || {};

    if (!userId)
      return res.status(400).json({ message: "Usuário e/ou senha inválidos." });

    const tokenAuth = generateToken({ id: userId });

    res.status(200).json({ token: `Bearer ${tokenAuth}` });
  } catch (error) {
    console.log("Login Error: ", error);

    res.status(500).json({ message: "Internal Server error" });
  }
});

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
