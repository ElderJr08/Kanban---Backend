import CardRepository from "../../infra/database/repositories/card";
import { ICardRepository } from "../../infra/database/repositories/interfaces";
import { Card } from "../card";
import { ICardService } from "../interfaces";

export default class CardService implements ICardService {
  private cardRepository: ICardRepository;

  constructor(cardRepository?: ICardRepository) {
    this.cardRepository = cardRepository ?? new CardRepository();
  }

  async getCards(): Promise<Card[]> {
    return this.cardRepository.getCards();
  }

  async insertCard(
    titulo: string,
    conteudo: string,
    lista: string,
  ): Promise<Card> {
    return this.cardRepository.insertCard(titulo, conteudo, lista);
  }

  async updateCard(
    id: number,
    titulo: string,
    conteudo: string,
    lista: string,
  ): Promise<boolean> {
    return this.cardRepository.updateCard(id, titulo, conteudo, lista);
  }

  async deleteCard(id: number): Promise<boolean> {
    return this.cardRepository.deleteCard(id);
  }
}
