import { Card } from "../../../domain/card";
import DatabaseClient from "../dbClient";
import { cardModel, cardModelName } from "../models/card";
import { ICardRepository, IDatabaseClient } from "./interfaces";

export default class CardRepository implements ICardRepository {
  private dbClient: IDatabaseClient;

  constructor(dbClient?: IDatabaseClient) {
    this.dbClient = dbClient ?? DatabaseClient.getInstance();
  }

  async getCards(): Promise<Card[]> {
    const cardTable = await this.dbClient.define(cardModelName, cardModel);
    const result = await cardTable?.findAll();
    return result as unknown as Card[];
  }

  async insertCard(
    titulo: string,
    conteudo: string,
    lista: string,
  ): Promise<Card> {
    const cardTable = await this.dbClient.define(cardModelName, cardModel);
    const card = await cardTable?.create({
      titulo,
      conteudo,
      lista,
    });
    return card as unknown as Card;
  }

  async updateCard(
    id: number,
    titulo: string,
    conteudo: string,
    lista: string,
  ): Promise<boolean> {
    const cardTable = await this.dbClient.define(cardModelName, cardModel);
    const result = await cardTable?.update(
      { titulo, conteudo, lista },
      { where: { id } },
    );
    return !!result?.[0];
  }

  async deleteCard(id: number): Promise<boolean> {
    const cardTable = await this.dbClient.define(cardModelName, cardModel);
    const result = await cardTable?.destroy({ where: { id } });
    return !!result;
  }
}
