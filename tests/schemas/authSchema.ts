import * as yup from "yup";

export const authSchema = yup.object({
  accessToken: yup.string().required(),
});

export const authInvalidSchema = yup.object({
  message: yup.string().required(),
});
