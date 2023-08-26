import fetch from "node-fetch";
import { config } from "../../config/index";
import { IGetBooksById, IPostBooks } from "./interfaces";

const baseUrl = config.basicConfigation.baseUrl;

export class LivrosClient {
  public async getBooks() {
    return fetch(`${baseUrl}/livros`);
  }

  public async getBooksById(params: IGetBooksById) {
    return fetch(`${baseUrl}/livros/${params.id}`);
  }

  public async postBooks(params: IPostBooks) {
    const body = JSON.stringify({
      titulo: params.titulo,
      numeroPaginas: params.numeroPaginas,
    });

    return fetch(`${baseUrl}/livros`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.autenticacao}`,
      },
    });
  }
}
