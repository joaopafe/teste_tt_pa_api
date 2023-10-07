export interface IResetSenha {
  novaSenha?: string;
  email?: string;
  respostaPeguntaSecreta1?: string;
  respostaPeguntaSecreta2?: string;
  respostaPeguntaSecreta3?: string;
  token?: string;
}

export interface IDeleteUser {
  id?: string;
  token?: string;
}
