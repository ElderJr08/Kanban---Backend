import DatabaseClient, { IDatabaseClient } from "../dbClient";
import { Login } from "../../../domain/login";
import { loginModel, loginModelName } from "../models/login";

export default class LoginRepository {
  private dbClient: IDatabaseClient;

  constructor(dbClient?: IDatabaseClient) {
    this.dbClient = dbClient ?? DatabaseClient.getInstance();
  }

  async getLogin(login: string, password: string): Promise<Login> {
    const loginTable = await this.dbClient.define(loginModelName, loginModel);

    const result = await loginTable?.findOne({
      where: {
        login,
        password,
      },
    });

    return result as unknown as Login;
  }
}
