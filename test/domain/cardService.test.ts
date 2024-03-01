import { ICardService } from "../../src/domain/interfaces";
import { ICardRepository } from "../../src/infra/database/repositories/interfaces";
import CardRepository from "../../src/infra/database/repositories/card";
import CardService from "../../src/domain/service/card";

jest.mock("../../src/infra/database/repositories/card");

const CardRepositoryMock =
  CardRepository as unknown as jest.Mock<ICardRepository>;

let sut: ICardService;

let cardRepositoryInstance: ICardRepository;

describe("Card Service Test", () => {
  beforeEach(() => {
    CardRepositoryMock.mockImplementation(() => ({
      getCards: jest.fn(),
      insertCard: jest.fn(),
      deleteCard: jest.fn(),
      updateCard: jest.fn(),
    }));

    cardRepositoryInstance = new CardRepositoryMock();

    sut = new CardService(cardRepositoryInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cards with success", async () => {
    const mockCards = [
      { id: 1, titulo: "Padaria", conteudo: "comprar pao", lista: "ToDo" },
      { id: 2, titulo: "Farmacia", conteudo: "comprar dorflex", lista: "ToDo" },
    ];

    const cardSpy = jest.spyOn(cardRepositoryInstance, "getCards");
    cardSpy.mockResolvedValueOnce(mockCards);

    const cards = await sut.getCards();

    expect(cardSpy).toHaveBeenCalled();
    expect(cards).toHaveLength(2);
  });

  it("should insert card with success", async () => {
    const mockCard = {
      id: 1,
      titulo: "Padaria",
      conteudo: "comprar pao",
      lista: "ToDo",
    };

    const insertCardSpy = jest.spyOn(cardRepositoryInstance, "insertCard");
    insertCardSpy.mockResolvedValueOnce(mockCard);

    const card = await sut.insertCard(
      mockCard.titulo,
      mockCard.conteudo,
      mockCard.lista,
    );

    expect(insertCardSpy).toHaveBeenCalled();
    expect(card).toEqual(mockCard);
  });

  it("should update card with success", async () => {
    const mockCard = {
      id: 1,
      titulo: "Padaria",
      conteudo: "comprar pao",
      lista: "ToDo",
    };

    const updateCardSpy = jest.spyOn(cardRepositoryInstance, "updateCard");
    updateCardSpy.mockResolvedValueOnce(true);

    const updatedCard = await sut.updateCard(
      mockCard.id,
      mockCard.titulo,
      mockCard.conteudo,
      mockCard.lista,
    );

    expect(updateCardSpy).toHaveBeenCalled();
    expect(updatedCard).toEqual(updatedCard);
  });

  it("should delete card with success", async () => {
    const mockCard = {
      id: 1,
    };

    const deleteCardSpy = jest.spyOn(cardRepositoryInstance, "deleteCard");
    deleteCardSpy.mockResolvedValueOnce(true);

    const deletedCard = await sut.deleteCard(mockCard.id);

    expect(deleteCardSpy).toHaveBeenCalled();
    expect(deletedCard).toEqual(true);
  });

  it("should be able to call getCards, without repository dependency", async () => {
    sut = new CardService();
    await expect(sut.getCards()).resolves.not.toThrow();
  });
});
