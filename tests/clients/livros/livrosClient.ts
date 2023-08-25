import fetch from "node-fetch";
import { config } from "../../config/index";
import { IGetBooksById } from "./interfaces";

const baseUrl = config.basicConfigation.baseUrl;

export class LivrosClient {
  public async getBooks() {
    return fetch(`${baseUrl}/livros`);
  }

  public async getBooksById(params: IGetBooksById) {
    return fetch(`${baseUrl}/livros/${params.id}`);
  }
}
