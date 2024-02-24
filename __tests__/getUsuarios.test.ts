import { Request, Response } from 'express';
import MainController from '../src/controllers/mainController';
import pool from '../dbConfig/poolConfig';

jest.mock('../dbConfig/poolConfig', () => ({
  connect: jest.fn(),
}));

describe('MainController - listarDadosUsuarios', () => {
  let req: Request;
  let res: Response;
  let mockClient: any;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    (pool.connect as jest.Mock).mockResolvedValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os dados dos usuários com status 200 quando a consulta for bem-sucedida', async () => {
    const mockRows = [{ id: 1, nome: 'Usuário 1' }, { id: 2, nome: 'Usuário 2' }];
    const mockResult = { rows: mockRows };
    mockClient.query.mockResolvedValueOnce(mockResult);

    await MainController.listarDadosUsuarios(req, res);

    expect(pool.connect).toHaveBeenCalled();
    expect(mockClient.query).toHaveBeenCalledWith(`SELECT * FROM transactions`);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockRows);
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('deve retornar status 500 e uma mensagem de erro quando ocorrer um erro na consulta', async () => {
    const mockError = new Error('Erro ao listar dados de usuários');
    mockClient.query.mockRejectedValueOnce(mockError);

    await MainController.listarDadosUsuarios(req, res);

    expect(pool.connect).toHaveBeenCalled();
    expect(mockClient.query).toHaveBeenCalledWith(`SELECT * FROM transactions`);
    expect(console.log).toHaveBeenCalledWith('Erro ao listar dados de usuários', mockError);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Ocorreu um erro ao listar os dados de usuários');
    expect(mockClient.release).toHaveBeenCalled();
  });
});
