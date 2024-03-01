import { Model, ModelAttributes, ModelStatic } from "sequelize";
import { Card } from "../../../../domain/card";
import { Login } from "../../../../domain/login";

export interface ILoginRepository {
  getLogin(login: string, senha: string): Promise<Login>;
}

export interface ICardRepository {
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

export interface IDatabaseClient {
  define<T extends ModelAttributes>(
    modelName: string,
    model: T,
  ): Promise<ModelStatic<Model> | null>;
  load(): Promise<void>;
}
