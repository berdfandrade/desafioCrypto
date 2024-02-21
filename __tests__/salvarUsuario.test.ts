import MainController from "../src/controllers/mainController";
import { PoolClient } from "pg";
import pool from "../dbConfig/poolConfig";

jest.mock("../dbConfig/poolConfig");

declare module "../dbConfig/poolConfig" {
  interface Pool {
    connect: jest.Mock<Promise<PoolClient>>;
  }
}

describe("Teste do método salvarNomeEcartao", () => {
  it("Deve salvar o nome e cartão no banco de dados", async () => {
    const dados = { nome: "Carlos Sousa", cartao: "6574995676716802" };

    // Chama o método salvarNomeEcartao com os dados
    await expect(
      MainController.salvarDadosUsuario(dados)
    ).resolves.toBeUndefined();
  });

  //   it("Deve lançar um erro se ocorrer um erro durante a inserção", async () => {
  //     // Simula um erro durante a inserção no banco de dados
  //     const mockQuery = jest
  //       .fn()
  //       .mockRejectedValue(new Error("Erro ao inserir no banco de dados"));
  //     pool.connect.mockResolvedValueOnce({ query: mockQuery });

  //     // Chama o método salvarNomeEcartao com dados inválidos
  //     await expect(
  //       MainController.salvarDadosUsuario({ nome: "", cartao: "" })
  //     ).rejects.toThrow("Erro ao inserir no banco de dados");
  //   });
});
