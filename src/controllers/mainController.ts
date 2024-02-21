import pool from "../../dbConfig/poolConfig";
import { Request, Response } from "express";

interface IDados {
  nome: string;
  cartao: string;
}

export default class MainController {
  static sayHello(req: Request, res: Response) {
    res.status(200).send("Bem-vindo à minha API!");
  }

  static async salvarDadosUsuario(dados: IDados): Promise<void> {
    const { nome, cartao } = dados;
    const client = await pool.connect();
    try {
      await client.query(
        "INSERT INTO sua_tablea (nome_cartao) VALUES ($1, $2)",
        [nome, cartao]
      );
      console.log("Dados do cliente salvos com sucesso no banco de dados! ");
    } catch (error) {
      console.log(
        "Error ao salvar os dados do usuário no banco de dados",
        error
      );
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
