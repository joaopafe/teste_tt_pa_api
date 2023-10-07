import * as yup from "yup";

export const resetSenhaSchema = yup.object({
  message: yup.string().required(),
});

export const resetSenhaInvalidSchema = yup.object({
  error: yup.string().required(),
});
