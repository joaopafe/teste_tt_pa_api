import { CadastroClient } from "../../clients/cadastros/cadastroClient";
import { config } from "../../config/index";
import {
  cadastroSchema,
  cadastroInvalidSchema,
} from "../../schemas/cadastroSchema";

const cadastroClient = new CadastroClient();

describe("Cenário 5 - Cadastro de usuário (POST /cadastro)", () => {
  test("5.1 - Cadastrar usuário por meio de requisição válida", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = process.env.EMAIL_CADASTRADO as string;
    const senha = process.env.SENHA_CADASTRADA as string;
    const aceitouTermos = true;

    const response = await cadastroClient.postUser({
      nome,
      email,
      senha,
      aceitouTermos,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();

    await cadastroSchema.validate(data);

    expect(data.email).toBe(email);
    expect(data.senha).not.toBe(senha);
    expect(data.nome).toBe(nome);
    expect(data.aceitouTermos).toBe(aceitouTermos);
  });

  test("5.2 - Retornar erro de formato para cadastro sem todos os parâmetros obrigatórios", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = process.env.EMAIL_CADASTRADO as string;
    const aceitouTermos = true;

    const response = await cadastroClient.postUser({
      nome,
      email,
      aceitouTermos,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await cadastroInvalidSchema.validate(data);
  });

  test("5.3 - Retornar erro de formato para cadastro com email inválido", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = config.cadastroConfig.emailInvalido;
    const senha = process.env.SENHA_CADASTRADA as string;
    const aceitouTermos = true;

    const response = await cadastroClient.postUser({
      nome,
      email,
      senha,
      aceitouTermos,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await cadastroInvalidSchema.validate(data);
  });

  test("5.4 - Retornar erro de formato para cadastro com senha com menos de 8 caracteres", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = process.env.EMAIL_CADASTRADO as string;
    const senha = config.cadastroConfig.senhaInvalida1;
    const aceitouTermos = true;

    const response = await cadastroClient.postUser({
      nome,
      email,
      senha,
      aceitouTermos,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await cadastroInvalidSchema.validate(data);
  });

  test("5.5 - Retornar erro de formato para senha sem caracteres obrigatórios", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = process.env.EMAIL_CADASTRADO as string;
    const senha = config.cadastroConfig.senhaInvalida2;
    const aceitouTermos = true;

    const response = await cadastroClient.postUser({
      nome,
      email,
      senha,
      aceitouTermos,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await cadastroInvalidSchema.validate(data);
  });

  test("5.6 - Retornar erro de requisição para cadastro sem aceitação dos termos de uso", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = process.env.EMAIL_CADASTRADO as string;
    const senha = process.env.SENHA_CADASTRADA as string;
    const aceitouTermos = false;

    const response = await cadastroClient.postUser({
      nome,
      email,
      senha,
      aceitouTermos,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await cadastroInvalidSchema.validate(data);
  });

  test("5.7 - Retornar erro de requisição para usuário já cadastrado", async () => {
    const nome = process.env.NOME_CADASTRADO as string;
    const email = process.env.EMAIL_CADASTRADO as string;
    const senha = process.env.SENHA_CADASTRADA as string;
    const aceitouTermos = true;

    const response = await cadastroClient.postUser({
      nome,
      email,
      senha,
      aceitouTermos,
    });

    expect(response.status).toEqual(400);
  });
});
