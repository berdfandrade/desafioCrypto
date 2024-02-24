import pool from "../../dbConfig/poolConfig";
import { Request, Response } from "express";
import hashSHA512 from "../../helpers/hasher";

interface IDados {
  id: number;
  userDocument: string;
  creditCardToken: string;
  value: number;
}

export default class MainController {
  static sayHello(req: Request, res: Response) {
    res.status(200).send("Bem-vindo à minha API!");
  }

  static async listarDadosUsuarios(
    req: Request,
    res: Response
  ): Promise<void> {
    const client = await pool.connect();
    try {
      const result = await client.query(`SELECT * FROM transactions`);
      res.status(200).send(result.rows);
    } catch (error) {
      console.log("Erro ao listar dados de usuários", error);
      res.status(500).send("Ocorreu um erro ao listar os dados de usuários");
    } finally {
      if (client && typeof client.release === 'function') {
        client.release();
      }
    }
  }
 
  static async atualizarDadosUsuarios(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id, userDocument, creditCardToken, value }: IDados = req.body;
    if (!userDocument || !creditCardToken || !value) {
      res
        .status(400)
        .send({ MESSAGE: "Preencha o corpo da requisição corretamente" });
    }

    const nomeHashed = hashSHA512(userDocument);
    const cartaoHashed = hashSHA512(creditCardToken);

    const client = await pool.connect();
    try {
      await client.query(
        `UPDATE transactions SET userDocument = $1, creditCardToken = $2, value = $3 WHERE id = $4`,
        [nomeHashed, cartaoHashed, value, id]
      );
      res.status(200).send({
        MESSAGE: `Usuário ${userDocument} atualizado no banco de dados com SHA-512`,
      });
    } catch (error) {
      console.log("Erro ao atualizar dados de usuário", error);
      res.status(500).send("Ocorreu um erro ao atualizar os dados de usuário");
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  static async salvarDadosUsuario(req: Request, res: Response): Promise<void> {
    const { userDocument, creditCardToken, value }: IDados = req.body;

    if (!userDocument || !creditCardToken || !value) {
      console.log(req.body);
      res
        .status(400)
        .send({ MESSAGE: "Preencha o corpo da requisição corretamente" });
      return;
    }

    const nomeHashed = hashSHA512(userDocument);
    const cartaoHashed = hashSHA512(creditCardToken);

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO transactions (userDocument, creditCardToken, value) VALUES ($1, $2, $3)`,
        [nomeHashed, cartaoHashed, value]
      );
      res.status(201).send({
        MESSAGE: `Usuário ${userDocument} salvo no banco de dados com o valor criptografado com SHA512`,
      });
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
