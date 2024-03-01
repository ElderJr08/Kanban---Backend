/* eslint-disable @typescript-eslint/ban-ts-comment */
import { generateToken, validateToken } from "../../src/middlewares";
import { mockNext, mockReq, mockRes } from "../__mocks__/expressMock";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => ({ id: 1 })),
  sign: jest.fn(() => "MYH4SH3T0K3N"),
}));

jest.mock("../../src/config");

describe("Auth Middleware Test", () => {
  describe("validateToken", () => {
    it("should return 400 BadRequest, when authorization header is not provided", () => {
      const reqMock = mockReq({});
      const resMock = mockRes();
      const nextMock = mockNext();

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.send).toHaveBeenCalledWith({
        message: "Propriedade authorization não informado no header.",
      });
    });

    it("should return 401 Unauthorized, when token was not provide correctly", () => {
      const reqMock = mockReq({
        headers: {
          authorization: null,
        },
      });
      const resMock = mockRes();
      const nextMock = mockNext();

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(401);
      expect(resMock.send).toHaveBeenCalledWith({
        message: "Acesso Negado. Nenhum token foi informado.",
      });
    });

    it("should return 401 Unauthorized, when token is provided without Bearer prefix", () => {
      const reqMock = mockReq({
        headers: {
          authorization: "my-token",
        },
      });
      const resMock = mockRes();
      const nextMock = mockNext();

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(401);
      expect(resMock.send).toHaveBeenCalledWith({
        message: "Acesso Negado. Nenhum token foi informado.",
      });
    });

    it("should return 401 Unauthorized, when token is provided with a bad prefix", () => {
      const reqMock = mockReq({
        headers: {
          authorization: "Bad my-token",
        },
      });
      const resMock = mockRes();
      const nextMock = mockNext();

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(401);
      expect(resMock.send).toHaveBeenCalledWith({
        message: "Formato inválido de token.",
      });
    });

    it("should return 401, when verify returns null value", () => {
      const reqMock = mockReq({
        headers: {
          authorization: "Bearer my-token",
        },
      });
      const resMock = mockRes();
      const nextMock = mockNext();

      jest
        .spyOn(jwt, "verify")
        //@ts-ignore
        .mockReturnValueOnce(null);

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(401);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Token inválido" });
    });

    it("should return 401, when verify token throws an error", () => {
      const reqMock = mockReq({
        headers: {
          authorization: "Bearer my-token",
        },
      });
      const resMock = mockRes();
      const nextMock = mockNext();

      jest
        .spyOn(jwt, "verify")
        //@ts-ignore
        .mockImplementationOnce(new Error("TokenExipered"));

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(401);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Token inválido" });
    });

    it("should call next function, when token is provided correctly", () => {
      const reqMock = mockReq({
        headers: {
          authorization: "Bearer my-token",
        },
      });
      const resMock = mockRes();
      const nextMock = mockNext();

      //@ts-ignore
      validateToken(reqMock, resMock, nextMock);

      expect(nextMock).toHaveBeenCalled();
    });
  });

  describe("generateToken", () => {
    it("should gerate new token with succes", () => {
      const token = generateToken({ id: 1 });
      expect(token).toEqual("MYH4SH3T0K3N");
    });
  });
});
