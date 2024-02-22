import { Request, Response } from 'express';
import MainController from '../src/controllers/mainController';
import pool from '../dbConfig/poolConfig';

jest.mock('../dbConfig/poolConfig', () => ({
  connect: jest.fn(),
}));

describe('MainController - listarDadosUsuarios', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockSend: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    req = {};
    mockSend = jest.fn();
    mockStatus = jest.fn(() => ({ send: mockSend }));
    res = { status: mockStatus } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users when database query is successful', async () => {
    const mockQuery = jest.fn().mockResolvedValue({
      rows: [{ id: 1, userDocument: '123456789', creditCardToken: 'token', value: 100 }],
    });
    const mockClient = { query: mockQuery };
    (pool.connect as jest.Mock).mockResolvedValueOnce(mockClient);

    await MainController.listarDadosUsuarios(req as Request, res as Response);

    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM transactions');
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith([{ id: 1, userDocument: '123456789', creditCardToken: 'token', value: 100 }]);
  });

  it('should handle database error properly', async () => {
    const mockError = new Error('Database error');
    const mockQuery = jest.fn().mockRejectedValue(mockError);
    const mockClient = { query: mockQuery };
    (pool.connect as jest.Mock).mockResolvedValueOnce(mockClient);

    await MainController.listarDadosUsuarios(req as Request, res as Response);

    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM transactions');
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith('Ocorreu um erro ao listar os dados de usuários');
    expect(console.log).toHaveBeenCalledWith('Erro ao listar dados de usuários', mockError);
  });
});
