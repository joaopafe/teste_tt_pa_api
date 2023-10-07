import * as yup from "yup";

export const cadastroSchema = yup.object({
  email: yup.string().email().required(), //"emailnomea1@email",
  senha: yup.string().required(),
  nome: yup.string().required(),
  areaAtuacao: yup.string().required(),
  estado: yup.string().required(),
  aceitouTermos: yup.boolean().required(),
  role: yup.string().required(),
  perguntaSecreta1: yup.string().required(),
  perguntaSecreta2: yup.string().required(),
  perguntaSecreta3: yup.string().required(),
  _id: yup.string().required(),
  __v: yup.number().defined(),
});

export const cadastroInvalidSchema = yup.object({
  error: yup.string().required(),
});
