import { dbConnect } from "../dbConfig/dbConfig";

describe('Teste de conexão com o banco de dados', () => {
  it('deve se conectar ao banco de dados sem erros', async () => {
    try {
      const pool = await dbConnect();
      expect(pool).toBeDefined(); // Verifica se a conexão foi estabelecida com sucesso
    } catch (error) {
      if (error instanceof Error) {
        fail('Erro ao conectar-se ao banco de dados: ' + error.message);
      } else {
        fail('Erro desconhecido ao conectar-se ao banco de dados');
      }
    }
  });
});