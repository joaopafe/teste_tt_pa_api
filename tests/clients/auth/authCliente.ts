import fetch from "node-fetch";
import { IAuthValid } from "./interfaces";
import { config } from "../../config/index";

const baseUrl = config.basicConfigation.baseUrl;

export class AuthClient {
  public async auth(params: IAuthValid) {
    const body = JSON.stringify({
      email: params.email,
      senha: params.senha,
    });

    return fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
