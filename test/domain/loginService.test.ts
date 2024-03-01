import { ILoginService } from "../../src/domain/interfaces";
import { ILoginRepository } from "../../src/infra/database/repositories/interfaces";
import LoginRepository from "../../src/infra/database/repositories/login";
import LoginService from "../../src/domain/service/login";

jest.mock("../../src/infra/database/repositories/login");

const LoginRepositoryMock =
  LoginRepository as unknown as jest.Mock<ILoginRepository>;

let sut: ILoginService;

let loginRepositoryInstance: ILoginRepository;

const params = {
  login: "test",
  senha: "test123",
};

describe("Login Service Test", () => {
  beforeEach(() => {
    LoginRepositoryMock.mockImplementation(() => ({
      getLogin: jest.fn(),
    }));

    loginRepositoryInstance = new LoginRepositoryMock();

    sut = new LoginService(loginRepositoryInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return customer login with sucess", async () => {
    const mockLogin = {
      id: 1,
      login: "test",
      senha: "test123",
    };

    const getLoginSpy = jest.spyOn(loginRepositoryInstance, "getLogin");
    getLoginSpy.mockResolvedValueOnce(mockLogin);

    const login = await sut.getLogin(params.login, params.senha);

    expect(getLoginSpy).toHaveBeenCalledWith(params.login, params.senha);
    expect(login).toBe(mockLogin);
  });
});
