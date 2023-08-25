export function buildQuery(parametros: object) {
  const chaves = Object.keys(parametros);
  const propriedades = [];

  for (const chave of chaves) {
    if (chave != "" && chave != null && chave != undefined) {
      const valor = parametros[chave as keyof typeof parametros];
      const propriedade = `${chave}=${valor}`;
      propriedades.push(propriedade);
    }
  }
  const properties = propriedades.join("&");
  return encodeURI(properties);
}
