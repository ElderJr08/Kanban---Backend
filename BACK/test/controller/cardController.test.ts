/* eslint-disable @typescript-eslint/ban-ts-comment */
import CardController from "../../src/controller/v1/card";
import { ICardService } from "../../src/domain/interfaces";
import CardService from "../../src/domain/service/card";
import { mockReq, mockRes } from "../__mocks__/expressMock";

jest.mock("../../src/domain/service/card");

const CardServiceMock = CardService as unknown as jest.Mock<ICardService>;

let sut: CardController;

let cardServiceInstance: ICardService;

describe("Cards Controller Test", () => {
  beforeEach(() => {
    CardServiceMock.mockImplementation(() => ({
      getCards: jest.fn(),
      insertCard: jest.fn(),
      deleteCard: jest.fn(),
      updateCard: jest.fn(),
    }));

    cardServiceInstance = new CardServiceMock();

    sut = new CardController(cardServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCards", () => {
    it("should return 200 OK with cards list", async () => {
      const mock = [
        { id: 1, titulo: "Padaria", conteudo: "comprar pao", lista: "ToDo" },
        {
          id: 2,
          titulo: "Farmacia",
          conteudo: "comprar dorflex",
          lista: "ToDo",
        },
      ];

      const reqMock = mockReq({});
      const resMock = mockRes();

      //@ts-ignore
      const cards = await sut.getCards(reqMock, resMock);

      const getCardsSpy = jest.spyOn(cardServiceInstance, "getCards");
      getCardsSpy.mockResolvedValueOnce(mock);

      expect(getCardsSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(cards);
    });

    it("should return 500 InternalServerError, when some unexpected error happens", async () => {
      const reqMock = mockReq({});
      const resMock = mockRes();

      const getCardsSpy = jest.spyOn(cardServiceInstance, "getCards");
      getCardsSpy.mockRejectedValueOnce(new Error("Some unexpected error..."));

      //@ts-ignore
      await sut.getCards(reqMock, resMock);

      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Internal Server error",
      });
    });

    it("should be able to call getCards, without service dependency", async () => {
      const reqMock = mockReq({});
      const resMock = mockRes();

      sut = new CardController();

      //@ts-ignore
      await expect(sut.getCards(reqMock, resMock)).resolves.not.toThrow();
    });
  });

  describe("insertCard", () => {
    it("should return 201 CREATED, when new card is created", async () => {
      const mock = {
        id: 2,
        titulo: "Farmacia",
        conteudo: "comprar dorflex",
        lista: "ToDo",
      };

      const reqMock = mockReq({
        body: {
          titulo: mock.titulo,
          conteudo: mock.conteudo,
          lista: mock.lista,
        },
      });
      const resMock = mockRes();

      const insertCardSpy = jest.spyOn(cardServiceInstance, "insertCard");
      insertCardSpy.mockResolvedValueOnce(mock);

      //@ts-ignore
      await sut.insertCard(reqMock, resMock);

      expect(insertCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(201);
      expect(resMock.json).toHaveBeenCalledWith(mock);
    });

    it("should return 400 BadRequest, when body payload is invalid", async () => {
      const mock = {
        id: 2,
        titulo: "Farmacia",
        conteudo: "comprar dorflex",
        lista: "ToDo",
      };

      const reqMock = mockReq({
        body: {
          titulo: null,
          conteudo: null,
          lista: null,
        },
      });
      const resMock = mockRes();

      const insertCardSpy = jest.spyOn(cardServiceInstance, "insertCard");
      insertCardSpy.mockResolvedValueOnce(mock);

      //@ts-ignore
      await sut.insertCard(reqMock, resMock);

      expect(insertCardSpy).not.toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Dados inválidos para criação do cartão",
      });
    });

    it("should return 500 InternalServerError, when some unexpected error happens", async () => {
      const reqMock = mockReq({
        body: {
          titulo: "Farmacia",
          conteudo: "comprar dorflex",
          lista: "ToDo",
        },
      });
      const resMock = mockRes();

      const insertCardSpy = jest.spyOn(cardServiceInstance, "insertCard");
      insertCardSpy.mockRejectedValueOnce(
        new Error("Some unexpected error..."),
      );

      //@ts-ignore
      await sut.insertCard(reqMock, resMock);

      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Internal Server error",
      });
    });
  });

  describe("updateCard", () => {
    it("should return 200 OK, when card is updated", async () => {
      const mock = {
        id: 2,
        titulo: "Farmacia",
        conteudo: "comprar dorflex",
        lista: "ToDo",
      };

      const reqMock = mockReq({
        params: {
          id: mock.id,
        },
        body: {
          titulo: mock.titulo,
          conteudo: mock.conteudo,
          lista: mock.lista,
        },
      });
      const resMock = mockRes();

      const updateCardSpy = jest.spyOn(cardServiceInstance, "updateCard");
      updateCardSpy.mockResolvedValueOnce(true);

      //@ts-ignore
      await sut.updateCard(reqMock, resMock);

      expect(updateCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(mock);
    });

    it("should return 400 BadRequest, when body payload is invalid", async () => {
      const reqMock = mockReq({
        body: {
          titulo: null,
          conteudo: null,
          lista: null,
        },
      });
      const resMock = mockRes();

      const updateCardSpy = jest.spyOn(cardServiceInstance, "updateCard");

      //@ts-ignore
      await sut.updateCard(reqMock, resMock);

      expect(updateCardSpy).not.toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Dados inválidos para a atualização do cartão",
      });
    });

    it("should return 404 NotFound, when id is invalid", async () => {
      const mock = {
        id: 2,
        titulo: "Farmacia",
        conteudo: "comprar dorflex",
        lista: "ToDo",
      };

      const reqMock = mockReq({
        params: {
          id: mock.id,
        },
        body: {
          titulo: mock.titulo,
          conteudo: mock.conteudo,
          lista: mock.lista,
        },
      });
      const resMock = mockRes();

      const updateCardSpy = jest.spyOn(cardServiceInstance, "updateCard");
      updateCardSpy.mockResolvedValueOnce(false);

      //@ts-ignore
      await sut.updateCard(reqMock, resMock);

      expect(updateCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(404);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Não foi possível atualizar o cartão com o ID fornecido.",
      });
    });

    it("should return 500 InternalServerError, when some unexpected error happens", async () => {
      const mock = {
        id: 2,
        titulo: "Farmacia",
        conteudo: "comprar dorflex",
        lista: "ToDo",
      };

      const reqMock = mockReq({
        params: {
          id: mock.id,
        },
        body: {
          titulo: mock.titulo,
          conteudo: mock.conteudo,
          lista: mock.lista,
        },
      });
      const resMock = mockRes();

      const updateCardSpy = jest.spyOn(cardServiceInstance, "updateCard");
      updateCardSpy.mockRejectedValueOnce(
        new Error("Some unexpected error..."),
      );

      //@ts-ignore
      await sut.updateCard(reqMock, resMock);

      expect(updateCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Internal Server error",
      });
    });
  });

  describe("deleteCard", () => {
    it("should return 200 OK with cards list, when card is deleted", async () => {
      const mock = [
        { id: 1, titulo: "Padaria", conteudo: "comprar pao", lista: "ToDo" },
      ];

      const reqMock = mockReq({
        params: {
          id: 2,
        },
      });
      const resMock = mockRes();

      const deleteCardSpy = jest.spyOn(cardServiceInstance, "deleteCard");
      deleteCardSpy.mockResolvedValueOnce(true);

      const getCardsSpy = jest.spyOn(cardServiceInstance, "getCards");
      getCardsSpy.mockResolvedValueOnce(mock);

      //@ts-ignore
      await sut.deleteCard(reqMock, resMock);

      expect(deleteCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(mock);
    });

    it("should return 400 BadRequest, when body payload is invalid", async () => {
      const reqMock = mockReq({
        params: {
          id: null,
        },
      });
      const resMock = mockRes();

      const deleteCardSpy = jest.spyOn(cardServiceInstance, "deleteCard");

      //@ts-ignore
      await sut.deleteCard(reqMock, resMock);

      expect(deleteCardSpy).not.toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Dados inválidos para deletar o cartão",
      });
    });

    it("should return 404 NotFound, when id is invalid", async () => {
      const reqMock = mockReq({
        params: {
          id: 100,
        },
      });
      const resMock = mockRes();

      const deleteCardSpy = jest.spyOn(cardServiceInstance, "deleteCard");
      deleteCardSpy.mockResolvedValueOnce(false);

      //@ts-ignore
      await sut.deleteCard(reqMock, resMock);

      expect(deleteCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(404);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Não foi possível deletar o cartão com o ID fornecido.",
      });
    });

    it("should return 500 InternalServerError, when some unexpected error happens", async () => {
      const reqMock = mockReq({
        params: {
          id: 1,
        },
      });
      const resMock = mockRes();

      const deleteCardSpy = jest.spyOn(cardServiceInstance, "deleteCard");
      deleteCardSpy.mockRejectedValueOnce(
        new Error("Some unexpected error..."),
      );

      //@ts-ignore
      await sut.deleteCard(reqMock, resMock);

      expect(deleteCardSpy).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: "Internal Server error",
      });
    });
  });
});
