import * as yup from "yup";

export const cadastroSchema = yup.object({
  email: yup.string().email().required(), //"emailnomea1@email",
  senha: yup.string().required(),
  nome: yup.string().required(),
  aceitouTermos: yup.boolean().required(),
  _id: yup.string().required(),
  __v: yup.number().defined(),
});

export const cadastroInvalidSchema = yup.object({
  error: yup.string().required(),
});
