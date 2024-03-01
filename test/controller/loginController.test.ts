/* eslint-disable @typescript-eslint/ban-ts-comment */
import LoginController from "../../src/controller/v1/login";
import { ILoginService } from "../../src/domain/interfaces";
import { Login } from "../../src/domain/login";
import LoginService from "../../src/domain/service/login";
import { generateToken } from "../../src/middlewares";
import { mockReq, mockRes } from "../__mocks__/expressMock";

jest.mock("../../src/domain/service/login");
jest.mock("../../src/middlewares", () => ({
  generateToken: jest.fn(() => "fake-token"),
}));

generateToken;

const LoginServiceMock = LoginService as unknown as jest.Mock<ILoginService>;

let sut: LoginController;

let loginServiceInstance: ILoginService;

describe("Login Controller Test", () => {
  beforeEach(() => {
    LoginServiceMock.mockImplementation(() => ({
      getLogin: jest.fn(),
    }));

    loginServiceInstance = new LoginServiceMock();

    sut = new LoginController(loginServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 OK with authorization token, when customer login is found with success", async () => {
    const mock = {
      id: 1,
      login: "test",
      senha: "test123",
    };

    const reqMock = mockReq({ body: { login: mock.login, senha: mock.senha } });
    const resMock = mockRes();

    const getLoginSpy = jest.spyOn(loginServiceInstance, "getLogin");
    getLoginSpy.mockResolvedValueOnce(mock);

    await sut.getLogin(
      //@ts-ignore
      reqMock,
      resMock,
    );

    expect(getLoginSpy).toHaveBeenCalledWith(mock.login, mock.senha);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith("fake-token");
  });

  it("should return 400 BadRequest, when login and password is not provided", async () => {
    const reqMock = mockReq({ body: { login: null, senha: null } });
    const resMock = mockRes();

    const getLoginSpy = jest.spyOn(loginServiceInstance, "getLogin");

    await sut.getLogin(
      //@ts-ignore
      reqMock,
      resMock,
    );

    expect(getLoginSpy).not.toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      message: "Os campos: login e senha não podem ser vazios.",
    });
  });

  it("should return 400 BadRequest, when customer login is not found", async () => {
    const mock = {
      login: "test",
      senha: "test123",
    };

    const reqMock = mockReq({ body: { login: mock.login, senha: mock.senha } });
    const resMock = mockRes();

    const getLoginSpy = jest.spyOn(loginServiceInstance, "getLogin");
    getLoginSpy.mockResolvedValueOnce(null as unknown as Login);

    await sut.getLogin(
      //@ts-ignore
      reqMock,
      resMock,
    );

    expect(getLoginSpy).toHaveBeenCalledWith(mock.login, mock.senha);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      message: "Usuário e/ou senha inválidos.",
    });
  });

  it("should return 500 InternalServerError, when some unexpected error happens with getLogin", async () => {
    const mock = {
      login: "test",
      senha: "test123",
    };

    const reqMock = mockReq({ body: { login: mock.login, senha: mock.senha } });
    const resMock = mockRes();

    const getLoginSpy = jest.spyOn(loginServiceInstance, "getLogin");
    getLoginSpy.mockRejectedValueOnce(new Error("Some unexpected error..."));

    await sut.getLogin(
      //@ts-ignore
      reqMock,
      resMock,
    );

    expect(getLoginSpy).toHaveBeenCalledWith(mock.login, mock.senha);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith({
      message: "Internal Server error",
    });
  });

  it("should be able to call getLogin, without service dependency", async () => {
    const mock = {
      id: 1,
      login: "test",
      senha: "test123",
    };

    const reqMock = mockReq({ body: { login: mock.login, senha: mock.senha } });
    const resMock = mockRes();

    sut = new LoginController();

    //@ts-ignore
    await expect(sut.getLogin(reqMock, resMock)).resolves.not.toThrow();
  });
});
