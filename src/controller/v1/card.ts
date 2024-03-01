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
      res.status(200).json(cards);
    } catch (error) {
      console.log("Card Controller > getCards Error: ", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  async insertCard(req: IControllerInput, res: IControllerOutput) {
    try {
      const { titulo, conteudo, lista } = req.body;

      if (
        [titulo, conteudo, lista].some(
          (param) => param === null || param === undefined || param === "",
        )
      )
        return res
          .status(400)
          .json({ message: "Dados inválidos para criação do cartão" });

      const card = await this.cardService.insertCard(titulo, conteudo, lista);

      res.status(201).json(card);
    } catch (error) {
      console.log("Card Controller > insertCard Error: ", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  async updateCard(req: IControllerInput, res: IControllerOutput) {
    try {
      const { id } = req.params;
      const { titulo, conteudo, lista } = req.body;

      if (
        [id, titulo, conteudo, lista].some(
          (param) => param === null || param === undefined || param === "",
        )
      )
        return res
          .status(400)
          .json({ message: "Dados inválidos para a atualização do cartão" });

      const cardUpdated = await this.cardService.updateCard(
        Number(id),
        titulo,
        conteudo,
        lista,
      );

      if (!cardUpdated)
        return res.status(404).json({
          message: "Não foi possível atualizar o cartão com o ID fornecido.",
        });

      res.status(200).json({
        id: Number(id),
        titulo,
        conteudo,
        lista,
      });
    } catch (error) {
      console.log("Card Controller > updateCard Error: ", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  async deleteCard(req: IControllerInput, res: IControllerOutput) {
    try {
      const { id } = req.params;

      if ([null, undefined, ""].includes(id))
        return res
          .status(400)
          .json({ message: "Dados inválidos para deletar o cartão" });

      const cardDeleted = await this.cardService.deleteCard(Number(id));

      if (!cardDeleted)
        return res.status(404).json({
          message: "Não foi possível deletar o cartão com o ID fornecido.",
        });

      const cards = await this.cardService.getCards();

      res.status(200).json({ cards });
    } catch (error) {
      console.log("Card Controller > deleteCard Error: ", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }
}
