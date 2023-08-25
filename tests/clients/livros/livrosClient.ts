import fetch from "node-fetch";
import { config } from "../../config/index";

const baseUrl = config.basicConfigation.baseUrl;

export class LivrosClient {
  public async getBooks() {
    return fetch(`${baseUrl}/livros`);
  }
}
