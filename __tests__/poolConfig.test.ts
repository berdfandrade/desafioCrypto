import pool from "../dbConfig/poolConfig";

describe('Teste da Pool de Conexões', () => {
  beforeAll(async () => {
    // Aqui podemos fazer qualquer configuração necessária antes de executar os testes, se aplicável
  });

  afterAll(async () => {
    // Aqui podemos fazer qualquer limpeza necessária após a execução dos testes, se aplicável
  });

  it('Deve ser capaz de obter uma conexão da pool', async () => {
    let client;
    try {
      client = await pool.connect();
      expect(client).toBeDefined(); // Verifica se a conexão foi obtida com sucesso
    } finally {
      if (client) {
        client.release(); // Libera a conexão de volta para a pool após o teste
      }
    }
  });

  it('Deve ser capaz de executar uma query usando uma conexão da pool', async () => {
    let client;
    try {
      client = await pool.connect();
      const result = await client.query('SELECT 1 + 1 AS soma');
      expect(result.rows[0].soma).toEqual(2); // Verifica se a query retorna o resultado esperado
    } finally {
      if (client) {
        client.release(); // Libera a conexão de volta para a pool após o teste
      }
    }
  });
});
