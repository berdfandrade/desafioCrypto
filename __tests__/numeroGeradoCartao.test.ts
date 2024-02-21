import gerarNumeroDeCartao from "../helpers/gerarCartao";

describe('gerarNumeroDeCartao', () => {
  test('Deve gerar um número de cartão com 16 caracteres', () => {
    const numeroCartao = gerarNumeroDeCartao();
    expect(numeroCartao).toHaveLength(16);
  });

  test('Deve conter apenas números e espaços', () => {
    const numeroCartao = gerarNumeroDeCartao();
    expect(numeroCartao).toMatch(/^[0-9\s]+$/);
  });

  test('Deve gerar números diferentes em cada execução', () => {
    const numeroCartao1 = gerarNumeroDeCartao();
    const numeroCartao2 = gerarNumeroDeCartao();
    expect(numeroCartao1).not.toEqual(numeroCartao2);
  });
});