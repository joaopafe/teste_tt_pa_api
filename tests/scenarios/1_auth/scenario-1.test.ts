import { config } from "../../config/index";
import { AuthClient } from "../../clients/auth/authClient";
import { authSchema, authInvalidSchema } from "../../schemas/authSchema";

const EMAIL = process.env.EMAIL as string;
const SENHA = process.env.SENHA as string;

describe("Cenário 1 - Obtenção de autenticação (POST /auth/login)", () => {
  const authClient = new AuthClient();

  test("1.1 - Obter token por meio de requisição válida", async () => {
    const response = await authClient.auth({
      email: EMAIL,
      senha: SENHA,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await authSchema.validate(data);
  });

  test("1.2 - Retornar erro de formato para requisição sem todos os parâmetros obrigatórios", async () => {
    const response = await authClient.auth({});

    expect(response.status).toEqual(401);

    const data = await response.json();

    await authInvalidSchema.validate(data);

    expect(data.message).toBe("Usuario ou senha incorreta!");
  });

  test("1.3 - Retornar erro para e-mail não cadastrado", async () => {
    const email = config.authInvalid.emailInvalido;

    const response = await authClient.auth({
      email,
      senha: SENHA,
    });

    expect(response.status).toEqual(401);

    const data = await response.json();

    await authInvalidSchema.validate(data);

    expect(data.message).toBe("Usuario ou senha incorreta!");
  });

  test("1.4 - Retornar erro para senha não cadastrada", async () => {
    const senha = config.authInvalid.senhaInvalida;

    const response = await authClient.auth({
      email: EMAIL,
      senha,
    });

    expect(response.status).toEqual(401);

    const data = await response.json();

    await authInvalidSchema.validate(data);

    expect(data.message).toBe("Usuario ou senha incorreta!");
  });

  test("1.5 - Obter token por meio de requisição com e-mail em uppercase", async () => {
    const email = EMAIL.toUpperCase();

    const response = await authClient.auth({
      email,
      senha: SENHA,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await authSchema.validate(data);
  });

  test("1.6 - Obter token por meio de requisição com senha em uppercase", async () => {
    const senha = SENHA.toUpperCase();

    const response = await authClient.auth({
      email: EMAIL,
      senha,
    });

    expect(response.status).toEqual(401);

    const data = await response.json();

    await authInvalidSchema.validate(data);

    expect(data.message).toBe("Usuario ou senha incorreta!");
  });
});
