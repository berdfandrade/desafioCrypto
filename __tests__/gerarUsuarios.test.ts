import gerarUsuario from "../helpers/gerarUsuario";

describe('gerarUsuario', () => {
  test('Deve retornar um objeto de usuário com nome e cartão', () => {
    const usuario = gerarUsuario();
    expect(usuario).toHaveProperty('nome');
    expect(usuario).toHaveProperty('cartao');
  });

  test('O cartão do usuário deve conter 16 caracteres', () => {
    const usuario = gerarUsuario();
    expect(usuario.cartao).toHaveLength(16);
  });
});
