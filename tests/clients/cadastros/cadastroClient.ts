import fetch from "node-fetch";
import { config } from "../../config/index";
import { IPostUser } from "./interface";

const baseUrl = config.basicConfigation.baseUrl;

export class CadastroClient {
  public async postUser(params: IPostUser) {
    const body = JSON.stringify({
      email: params.email,
      senha: params.senha,
      nome: params.nome,
      areaAtuacao: params.areaAtuacao,
      estado: params.estado,
      aceitouTermos: params.aceitouTermos,
      role: params.role,
      perguntaSecreta1: params.perguntaSecreta1,
      perguntaSecreta2: params.perguntaSecreta2,
      perguntaSecreta3: params.perguntaSecreta3,
    });

    return fetch(`${baseUrl}/cadastro`, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  }
}
