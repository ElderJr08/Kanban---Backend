/* eslint-disable @typescript-eslint/ban-ts-comment */
import { printDeleteOrUpdateResponse } from "../../src/middlewares";
import { mockNext, mockReq, mockRes } from "../__mocks__/expressMock";

describe("Response Interceptor Middleware Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("printDeleteOrUpdateResponse", () => {
    it("should print formatted log, when PUT cards method is called", () => {
      const mock = {
        // card
        id: 1,
        titulo: "Padaria",
        conteudo: "comprar pao",
        lista: "ToDo",
      };

      const statusCode = 200;

      const reqMock = mockReq({
        path: "/cards/1", // --> /cards/:id
        method: "PUT",
        params: {
          id: mock.id,
        },
        body: mock,
      });
      const resMock = mockRes(statusCode);
      const nextMock = mockNext();

      const consoleLogSpy = jest.spyOn(console, "log");

      //@ts-ignore
      printDeleteOrUpdateResponse(reqMock, resMock, nextMock);

      resMock.status(200).json(mock);

      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it("should print formatted log, when DELETE cards method is called", () => {
      const mock = {
        // card
        id: 1,
        titulo: "Padaria",
        conteudo: "comprar pao",
        lista: "ToDo",
      };

      const statusCode = 200;

      const reqMock = mockReq({
        path: "/cards/1", // --> /cards/:id
        method: "DELETE",
        params: {
          id: mock.id,
        },
        body: mock,
      });
      const resMock = mockRes(statusCode);
      const nextMock = mockNext();

      const consoleLogSpy = jest.spyOn(console, "log");

      //@ts-ignore
      printDeleteOrUpdateResponse(reqMock, resMock, nextMock);

      resMock.status(200).json(mock);

      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it("should not print formatted log, when GET cards method is called", () => {
      const mock = [
        {
          id: 1,
          titulo: "Padaria",
          conteudo: "comprar pao",
          lista: "ToDo",
        },
      ];

      const statusCode = 200;

      const reqMock = mockReq({
        path: "/cards",
        method: "GET",
      });
      const resMock = mockRes(statusCode);
      const nextMock = mockNext();

      const consoleLogSpy = jest.spyOn(console, "log");

      //@ts-ignore
      printDeleteOrUpdateResponse(reqMock, resMock, nextMock);

      resMock.status(200).json(mock);

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
