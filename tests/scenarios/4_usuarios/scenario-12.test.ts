import { AuthClient } from "../../clients/auth/authClient";
import { ResetSenhaClient } from "../../clients/usuarios/resetSenhaClient";
import { CadastroClient } from "../../clients/cadastros/cadastroClient";
import {
  resetSenhaSchema,
  resetSenhaInvalidSchema,
} from "../../schemas/resetSenhaSchema";
import { config } from "../../config/index";

const authClient = new AuthClient();
const resetSenhaClient = new ResetSenhaClient();
const cadastroClient = new CadastroClient();

let token = "";
let idUsuario = "";

describe("Cenário 12 - Recuperação de senha (POST /usuarios/reset-password)", () => {
  beforeAll(async () => {
    const email = config.recuperacaoSenhaConfig.emailValido;
    const senha = config.recuperacaoSenhaConfig.senhaValida1;
    const nome = config.recuperacaoSenhaConfig.nomeValido;
    const areaAtuacao = config.recuperacaoSenhaConfig.areaAtuacaoValida;
    const estado = config.recuperacaoSenhaConfig.estadoValido;
    const aceitouTermos = true;
    const role = config.recuperacaoSenhaConfig.roleValido;
    const perguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;
    const perguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const perguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const responseCadastro = await cadastroClient.postUser({
      email,
      senha,
      nome,
      areaAtuacao,
      estado,
      aceitouTermos,
      role,
      perguntaSecreta1,
      perguntaSecreta2,
      perguntaSecreta3,
    });

    expect(responseCadastro.status).toEqual(201);

    const dataCadastro = await responseCadastro.json();

    idUsuario = dataCadastro.id;

    const responseLogin = await authClient.auth({
      email,
      senha,
    });

    expect(responseLogin.status).toEqual(200);

    const dataLogin = await responseLogin.json();

    token = dataLogin.accessToken;
  });

  test("12.1 - Alterar senha do usuário por meio de requisição válida", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaValida2;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await resetSenhaSchema.validate(data);
  });

  test("12.2 - Alterar senha do usuário com 2 respostas de segurança corretas", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaValida1;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Invalida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await resetSenhaSchema.validate(data);
  });

  test("12.3 - Alterar senha do usuário com o mesmo valor utilizado anteriormente", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaValida1;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await resetSenhaSchema.validate(data);
  });

  test("12.4 - Retornar erro de formato para alteração de senha com menos de 8 caracteres", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaInvalida1;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await resetSenhaInvalidSchema.validate(data);
  });

  test("12.5 - Retornar erro de formato para alteração de senha sem  caracteres obrigatórios", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaInvalida2;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await resetSenhaInvalidSchema.validate(data);
  });

  test("12.6 - Retornar erro de requisição para recuperação de senha com e-mail inválido", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaValida1;
    const email = config.recuperacaoSenhaConfig.emailInvalido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Valida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await resetSenhaInvalidSchema.validate(data);
  });

  test("12.7 - Retornar erro de requisição para recuperação de senha com menos de 2 respostas de segurança corretas", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaValida1;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Invalida;
    const respostaPeguntaSecreta2 =
      config.recuperacaoSenhaConfig.perguntaSecreta2Invalida;
    const respostaPeguntaSecreta3 =
      config.recuperacaoSenhaConfig.perguntaSecreta3Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      respostaPeguntaSecreta2,
      respostaPeguntaSecreta3,
      token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await resetSenhaInvalidSchema.validate(data);
  });

  test("12.8 - Retornar erro de requisição para recuperação de senha sem todos os parâmetros obrigatórios", async () => {
    const novaSenha = config.recuperacaoSenhaConfig.senhaValida1;
    const email = config.recuperacaoSenhaConfig.emailValido;
    const respostaPeguntaSecreta1 =
      config.recuperacaoSenhaConfig.perguntaSecreta1Valida;

    const response = await resetSenhaClient.resetSenha({
      novaSenha,
      email,
      respostaPeguntaSecreta1,
      token,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await resetSenhaInvalidSchema.validate(data);
  });

  afterAll(async () => {
    await resetSenhaClient.deleteUser({ id: idUsuario, token });
  });
});
