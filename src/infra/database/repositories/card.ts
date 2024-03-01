import { Card } from "../../../domain/card";
import DatabaseClient, { IDatabaseClient } from "../dbClient";
import { cardModel, cardModelName } from "../models/card";

export default class CardRepository {
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
    title: string,
    content: string,
    list: string,
  ): Promise<Card> {
    const cardTable = await this.dbClient.define(cardModelName, cardModel);
    const card = await cardTable?.create({
      title,
      content,
      list,
    });
    return card as unknown as Card;
  }

  async updateCard(
    id: number,
    title: string,
    content: string,
    list: string,
  ): Promise<boolean> {
    const cardTable = await this.dbClient.define(cardModelName, cardModel);
    const result = await cardTable?.update(
      { title, content, list },
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
