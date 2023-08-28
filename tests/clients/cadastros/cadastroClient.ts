import fetch from "node-fetch";
import { config } from "../../config/index";
import { IPostUser } from "./interface";

const baseUrl = config.basicConfigation.baseUrl;

export class CadastroClient {
  public async postUser(params: IPostUser) {
    const body = JSON.stringify({
      nome: params.nome,
      email: params.email,
      senha: params.senha,
      aceitouTermos: params.aceitouTermos,
    });

    return fetch(`${baseUrl}/cadastro`, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }
}
