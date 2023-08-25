import { livroSchema } from "../../schemas/livrosSchema";
import { LivrosClient } from "../../clients/livros/livrosClient";
import { config } from "../../config/index";

const livrosClient = new LivrosClient();
let bookId = "";

describe("Cenário 3 - Listagem de livros por ID (GET /livros/{id})", () => {
  beforeAll(async () => {
    const response = await livrosClient.getBooks();

    const data = await response.json();

    bookId = data[0]._id;
  });

  test("3.1 - Listar livro específico para id cadastrado", async () => {
    const response = await livrosClient.getBooksById({
      id: bookId,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await livroSchema.validate(data);

    expect(data._id).toBe(bookId);
  });

  test("3.2 - Retornar erro de rota para id não cadastrado", async () => {
    const response = await livrosClient.getBooksById({
      id: config.books.bookIdInvalid,
    });

    expect(response.status).toEqual(404);
  });
});
