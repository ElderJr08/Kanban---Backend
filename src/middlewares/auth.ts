import jwt from "jsonwebtoken";
import config from "../config";
import { Request, Response, NextFunction } from "express";

interface Payload {
  id: string;
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["x-auth-token"] as string;

  if (authHeader === undefined)
    return res
      .status(400)
      .send({ message: "Propriedade x-auth-token não informado." });

  const [scheme, token] = authHeader.split("") || ["", ""];

  if (!token)
    return res
      .status(401)
      .send({ message: "Acesso Negado. Nenhum token foi informado." });

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: "Formato inválido de token." });

  try {
    const payload = jwt.verify(token, config.auth.secret) as Payload;

    if (!payload) return res.status(401).json({ message: "Token inválido" });

    req.headers["x-user-id"] = payload.id;

    return next();
  } catch (error) {
    console.log("Auth Error: ", error);
    return res.status(401).json({ message: "Token inválido" });
  }
}
