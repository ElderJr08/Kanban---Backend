import LoginRepository from "../../infra/database/repositories/login";
import { Login } from "../login";

export default class LoginService {
  private loginRepository: LoginRepository;

  constructor(loginRepository?: LoginRepository) {
    this.loginRepository = loginRepository ?? new LoginRepository();
  }

  async getLogin(login: string, password: string): Promise<Login> {
    return this.loginRepository.getLogin(login, password);
  }
}
