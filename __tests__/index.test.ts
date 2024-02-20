// MAIN TEST 

import request from 'supertest'
import app from '../src/index'

describe('Teste de inicialização da API', () => {
    it('Deve retornar uma mensagem de boas-vindas ao acessar a raiz', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Bem-vindo à minha API!');
    });
  });

