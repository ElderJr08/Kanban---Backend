import { ILoginService } from "../../domain/interfaces";
import LoginService from "../../domain/service/login";
import { generateToken } from "../../middlewares";
import { IControllerInput, IControllerOutput } from "../interfaces";

export default class LoginController {
  private loginService: ILoginService;

  constructor(loginService?: ILoginService) {
    this.loginService = loginService ?? new LoginService();
  }

  async getLogin(req: IControllerInput, res: IControllerOutput) {
    try {
      const { login, senha } = req.body || {};

      if ([login, senha].includes(undefined))
        return res
          .status(400)
          .json({ message: "Os campos: login e senha não podem ser vazios." });

      const result = (await this.loginService.getLogin(login, senha)) || {};

      if (!result)
        return res
          .status(400)
          .json({ message: "Usuário e/ou senha inválidos." });

      const tokenAuth = generateToken({ id: result.id });

      res.status(200).json(tokenAuth);
    } catch (error) {
      console.log("Login Controller > getLogin Error: ", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }
}
