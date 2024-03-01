import { Card } from "../card";
import { Login } from "../login";

export interface ILoginService {
  getLogin(login: string, password: string): Promise<Login>;
}

export interface ICardService {
  getCards(): Promise<Card[]>;
  insertCard(titulo: string, conteudo: string, lista: string): Promise<Card>;
  deleteCard(id: number): Promise<boolean>;
  updateCard(
    id: number,
    titulo: string,
    conteudo: string,
    lista: string,
  ): Promise<boolean>;
}
