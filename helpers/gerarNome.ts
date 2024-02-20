import { nomes, sobrenomes } from "./nomes";

export default function gerarNome(){
  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenomeAleatorio =
    sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

    return `${nomeAleatorio} ${sobrenomeAleatorio}`;
}

