import CardService from "../../domain/service/card";
import { IControllerInput, IControllerOutput } from "../interfaces";

export default class CardController {
  private cardService: CardService;

  constructor(cardService?: CardService) {
    this.cardService = cardService ?? new CardService();
  }

  async getCards(_: IControllerInput, res: IControllerOutput) {
    try {
      const cards = await this.cardService.getCards();
      res.status(200).json({ cards });
    } catch (error) {
      console.log("Card Controller Error: ", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }
}
