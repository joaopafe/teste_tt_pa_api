import { LivrosClient } from "../../clients/livros/livrosClient";
import { AuthClient } from "../../clients/auth/authClient";
import { livroSchema, livrosInvalidSchema } from "../../schemas/livrosSchema";
import { config } from "../../config/index";

const livrosClient = new LivrosClient();
const authClient = new AuthClient();

const EMAIL = process.env.EMAIL as string;
const SENHA = process.env.SENHA as string;

describe("Cenário 4 - Cadastro de livros (POST /livros)", () => {
  let token = "";

  beforeAll(async () => {
    const response = await authClient.auth({
      email: EMAIL,
      senha: SENHA,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    token = data.accessToken;
  });

  test("4.1 - Cadastrar livro por meio de requisição válida", async () => {
    const titulo = config.books.bookTitleValid;
    const numeroPaginas = config.books.bookPagesValid;

    const response = await livrosClient.postBooks({
      titulo,
      numeroPaginas,
      autenticacao: token,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();

    await livroSchema.validate(data);

    expect(data.titulo).toBe(titulo);
    expect(data.numeroPaginas).toEqual(numeroPaginas);
  });

  test("4.2 - Retornar erro para cadastro sem autenticação", async () => {
    const titulo = config.books.bookTitleValid;
    const numeroPaginas = config.books.bookPagesValid;

    const response = await livrosClient.postBooks({
      titulo,
      numeroPaginas,
    });

    expect(response.status).toEqual(401);
  });

  test("4.3 - Retornar erro de formato para cadastro sem todos os parâmetros obrigatórios", async () => {
    const response = await livrosClient.postBooks({
      autenticacao: token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await livrosInvalidSchema.validate(data);
  });

  test("4.4 - Retornar erro de formato para cadastro com número de páginas igual à zero", async () => {
    const titulo = config.books.bookTitleValid;
    const numeroPaginas = 0;

    const response = await livrosClient.postBooks({
      titulo,
      numeroPaginas,
      autenticacao: token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await livrosInvalidSchema.validate(data);
  });

  test("4.5 - Retornar erro de formato para cadastro com número de páginas com valor negativo", async () => {
    const titulo = config.books.bookTitleValid;
    const numeroPaginas = -10;

    const response = await livrosClient.postBooks({
      titulo,
      numeroPaginas,
      autenticacao: token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await livrosInvalidSchema.validate(data);
  });

  test("4.6 - Retornar erro de formato para cadastro com número de páginas com valor do tipo string não numérica", async () => {
    const titulo = config.books.bookTitleValid;
    const numeroPaginas = "dez";

    const response = await livrosClient.postBooks({
      titulo,
      numeroPaginas,
      autenticacao: token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await livrosInvalidSchema.validate(data);
  });
});
