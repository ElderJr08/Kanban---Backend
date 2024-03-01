import DatabaseClient, { IDatabaseClient } from "../dbClient";
import { Login } from "../../../domain/login";
import { loginModel, loginModelName } from "../models/login";
import { ILoginRepository } from "./interfaces";

export default class LoginRepository implements ILoginRepository {
  private dbClient: IDatabaseClient;

  constructor(dbClient?: IDatabaseClient) {
    this.dbClient = dbClient ?? DatabaseClient.getInstance();
  }

  async getLogin(login: string, senha: string): Promise<Login> {
    const loginTable = await this.dbClient.define(loginModelName, loginModel);

    const result = await loginTable?.findOne({
      where: {
        login,
        senha,
      },
    });

    return result as unknown as Login;
  }
}
