import * as yup from "yup";

export const livroSchema = yup.object({
  _id: yup.string().required(),
  titulo: yup.string().required(),
  numeroPaginas: yup.number().positive().required(),
  __v: yup.number().defined(),
});

export const livrosSchema = yup.array().of(livroSchema);
