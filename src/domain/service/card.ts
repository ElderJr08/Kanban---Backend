import CardRepository from "../../infra/database/repositories/card";
import { Card } from "../card";

export default class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository?: CardRepository) {
    this.cardRepository = cardRepository ?? new CardRepository();
  }

  async getCards(): Promise<Card[]> {
    return this.cardRepository.getCards();
  }

  async insertCard(
    title: string,
    content: string,
    list: string,
  ): Promise<Card> {
    return this.cardRepository.insertCard(title, content, list);
  }
}
