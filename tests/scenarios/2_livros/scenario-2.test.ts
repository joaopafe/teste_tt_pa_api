import { livrosSchema } from "../../schemas/livrosSchema";
import { LivrosClient } from "../../clients/livros/livrosClient";

const livrosClient = new LivrosClient();

describe("Cenário 2 - Listagem de livros cadastrados (GET /livros)", () => {
  test("2.1 - Listar  todos os livros cadastrados por meio de requisição válida", async () => {
    const response = await livrosClient.getBooks();

    expect(response.status).toEqual(200);

    const data = await response.json();

    await livrosSchema.validate(data);
  });
});
