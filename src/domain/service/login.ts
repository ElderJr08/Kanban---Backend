import { ILoginRepository } from "../../infra/database/repositories/interfaces";
import LoginRepository from "../../infra/database/repositories/login";
import { ILoginService } from "../interfaces";
import { Login } from "../login";

export default class LoginService implements ILoginService {
  private loginRepository: ILoginRepository;

  constructor(loginRepository?: ILoginRepository) {
    this.loginRepository = loginRepository ?? new LoginRepository();
  }

  async getLogin(login: string, password: string): Promise<Login> {
    return this.loginRepository.getLogin(login, password);
  }
}
