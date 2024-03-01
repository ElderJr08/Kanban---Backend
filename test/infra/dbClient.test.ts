/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Sequelize } from "sequelize";
import { IDatabaseClient } from "../../src/infra/database/repositories/interfaces";
import DatabaseClient from "../../src/infra/database/dbClient";
import { Config } from "../../src/config";

jest.mock("sequelize");
jest.mock("../../src/config");

const SequelizeMock = Sequelize as unknown as jest.Mock<Sequelize>;

let sut: IDatabaseClient;

const configMock = {
  db: {
    dialect: "",
    storage: "",
  },
} as unknown as Config;

describe("DatabaseClient Test", () => {
  beforeEach(() => {
    //@ts-ignore
    SequelizeMock.mockImplementation(() => ({
      sync: jest.fn(),
      define: jest.fn(),
    }));

    sut = new DatabaseClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return database client instance methods with success", async () => {
    sut = DatabaseClient.getInstance(configMock);

    expect(sut.load).toBeInstanceOf(Function);
    expect(sut.define).toBeInstanceOf(Function);
  });

  it("should call databaseClient methods with success", async () => {
    sut = DatabaseClient.getInstance(configMock);

    await expect(sut.load()).resolves.not.toThrow();
    await expect(sut.define("modelName", {})).resolves.not.toThrow();
  });
});
