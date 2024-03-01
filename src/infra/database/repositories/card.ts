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
}
