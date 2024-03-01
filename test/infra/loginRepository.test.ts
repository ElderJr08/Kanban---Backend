/* eslint-disable @typescript-eslint/ban-ts-comment */
import DatabaseClient from "../../src/infra/database/dbClient";
import {
  IDatabaseClient,
  ILoginRepository,
} from "../../src/infra/database/repositories/interfaces";
import LoginRepository from "../../src/infra/database/repositories/login";

jest.mock("../../src/infra/database/dbClient");
jest.mock("../../src/config");

const DatabaseClientMock =
  DatabaseClient as unknown as jest.Mock<IDatabaseClient>;

let sut: ILoginRepository;

let databaseClientInstance: IDatabaseClient;

describe("Login Repository Test", () => {
  beforeEach(() => {
    DatabaseClientMock.mockImplementation(() => ({
      getInstance: jest.fn(),
      load: jest.fn(),
      define: jest.fn(),
    }));

    databaseClientInstance = new DatabaseClientMock();

    sut = new LoginRepository(databaseClientInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return customer login with success", async () => {
    const mock = {
      id: 1,
      login: "teste",
      senha: "teste123",
    };

    const findOneSpy = jest.fn().mockResolvedValueOnce(mock);

    jest.spyOn(databaseClientInstance, "define").mockReturnValue({
      //@ts-ignore
      findOne: findOneSpy,
    });

    const login = await sut.getLogin(mock.login, mock.senha);

    expect(login).toEqual(mock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        login: mock.login,
        senha: mock.senha,
      },
    });
  });

  it("should be able to avoid error, when define method returns null", async () => {
    const mock = { login: "teste", senha: "teste123" };
    await expect(sut.getLogin(mock.login, mock.senha)).resolves.not.toThrow();
  });

  it("should be able to call getLogin, without repository dependency", async () => {
    const params = { login: "teste", senha: "teste123" };

    jest.spyOn(DatabaseClient, "getInstance").mockImplementationOnce(() => ({
      load: jest.fn(),
      define: jest.fn(),
    }));

    sut = new LoginRepository();

    await expect(
      sut.getLogin(params.login, params.senha),
    ).resolves.not.toThrow();
  });
});
