import fetch from "node-fetch";
import { config } from "../../config/index";
import { IDeleteUser, IResetSenha } from "./interface";

const baseUrl = config.basicConfigation.baseUrl;

export class ResetSenhaClient {
  public async resetSenha(params: IResetSenha) {
    const body = JSON.stringify({
      novaSenha: params.novaSenha,
      email: params.email,
      respostaPeguntaSecreta1: params.respostaPeguntaSecreta1,
      respostaPeguntaSecreta2: params.respostaPeguntaSecreta2,
      respostaPeguntaSecreta3: params.respostaPeguntaSecreta3,
    });

    return fetch(`${baseUrl}/usuarios/reset-password`, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${params.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteUser(params: IDeleteUser) {
    return fetch(`${baseUrl}/usuarios/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${params.token}`,
        "Content-Type": "application/json",
      },
    });
  }
}
