/* eslint-disable @typescript-eslint/ban-ts-comment */
import DatabaseClient from "../../src/infra/database/dbClient";
import {
  IDatabaseClient,
  ICardRepository,
} from "../../src/infra/database/repositories/interfaces";
import CardRepository from "../../src/infra/database/repositories/card";

jest.mock("../../src/infra/database/dbClient");
jest.mock("../../src/config");

const DatabaseClientMock =
  DatabaseClient as unknown as jest.Mock<IDatabaseClient>;

let sut: ICardRepository;

let databaseClientInstance: IDatabaseClient;

describe("Card Repository Test", () => {
  beforeEach(() => {
    DatabaseClientMock.mockImplementation(() => ({
      getInstance: jest.fn(),
      load: jest.fn(),
      define: jest.fn(),
    }));

    databaseClientInstance = new DatabaseClientMock();

    sut = new CardRepository(databaseClientInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCards", () => {
    it("should return cards list with success", async () => {
      const mock = [
        { id: 1, titulo: "Padaria", conteudo: "comprar pao", lista: "ToDo" },
        {
          id: 2,
          titulo: "Farmacia",
          conteudo: "comprar dorflex",
          lista: "ToDo",
        },
      ];

      const findAllSpy = jest.fn().mockResolvedValueOnce(mock);

      jest.spyOn(databaseClientInstance, "define").mockReturnValue({
        //@ts-ignore
        findAll: findAllSpy,
      });

      const cards = await sut.getCards();

      expect(cards).toHaveLength(2);
      expect(findAllSpy).toHaveBeenCalled();
    });

    it("should be able to call getCards, without repository dependency", async () => {
      jest.spyOn(DatabaseClient, "getInstance").mockImplementationOnce(() => ({
        load: jest.fn(),
        define: jest.fn(),
      }));

      sut = new CardRepository();

      await expect(sut.getCards()).resolves.not.toThrow();
    });
  });

  describe("insertCard", () => {
    it("should insert card with success", async () => {
      const mock = {
        id: 1,
        titulo: "Padaria",
        conteudo: "comprar pao",
        lista: "ToDo",
      };

      const createSpy = jest.fn().mockResolvedValueOnce(mock);

      jest.spyOn(databaseClientInstance, "define").mockReturnValue({
        //@ts-ignore
        create: createSpy,
      });

      const card = await sut.insertCard(mock.titulo, mock.conteudo, mock.lista);

      expect(card).toEqual(mock);
      expect(createSpy).toHaveBeenCalledWith({
        titulo: mock.titulo,
        conteudo: mock.conteudo,
        lista: mock.lista,
      });
    });
  });

  describe("updateCard", () => {
    it("should update card with success", async () => {
      const mock = {
        id: 1,
        titulo: "Padaria",
        conteudo: "comprar pao",
        lista: "ToDo",
      };

      const updateCardSpy = jest.fn().mockResolvedValueOnce([1]);

      jest.spyOn(databaseClientInstance, "define").mockReturnValue({
        //@ts-ignore
        update: updateCardSpy,
      });

      const card = await sut.updateCard(
        mock.id,
        mock.titulo,
        mock.conteudo,
        mock.lista,
      );

      expect(card).toEqual(true);
      expect(updateCardSpy).toHaveBeenCalledWith(
        { titulo: mock.titulo, conteudo: mock.conteudo, lista: mock.lista },
        { where: { id: mock.id } },
      );
    });
  });

  describe("deleteCard", () => {
    it("should deleteCard card with success", async () => {
      const mock = { id: 1 };

      const deleteCardSpy = jest.fn().mockResolvedValueOnce(1);

      jest.spyOn(databaseClientInstance, "define").mockReturnValue({
        //@ts-ignore
        destroy: deleteCardSpy,
      });

      const card = await sut.deleteCard(mock.id);

      expect(card).toEqual(true);
      expect(deleteCardSpy).toHaveBeenCalledWith({ where: { id: mock.id } });
    });
  });
});
