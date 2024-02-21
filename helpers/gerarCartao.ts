export default function gerarNumeroDeCartao(): string{
  let numeroCartao = "";

  const generateCell = () => {
    let cell = "";
    for (let i = 0; i < 4; i++) {
      const random = Math.floor(Math.random() * 10);
      cell += random.toString();
    }
    return cell;
  };

  for (let j = 0; j < 4; j++) {
    let celulaGerada = generateCell();
    numeroCartao += celulaGerada;
  }
  
  return numeroCartao;
}

