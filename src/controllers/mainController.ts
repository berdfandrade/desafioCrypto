import pool from "../../dbConfig/poolConfig";
import { Request, Response } from "express";
import hashSHA512 from "../../helpers/hasher";
import TABELA from "../../helpers/tabela";

interface IDados {
  nome: string;
  cartao: string;
}

export default class MainController {
  static sayHello(req: Request, res: Response) {
    res.status(200).send("Bem-vindo à minha API!");
  }

  static async salvarDadosUsuarioComHash(
    req: Request,
    res: Response
  ): Promise<void> {
    const { nome, cartao }: IDados = req.body;

    const nomeHashed = hashSHA512(nome);
    const cartaoHashed = hashSHA512(cartao);

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO ${TABELA} (userDocument, creditCardToken) VALUES ($1, $2)`,
        [nomeHashed, cartaoHashed]
      );
      res
        .status(201)
        .send(
          `Usuário ${nome} salvo no banco de dados com o valor cryptografado com SHA512`
        );
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

  static async salvarDadosDoUsuario(
    req: Request,
    res: Response
  ): Promise<void> {
    const { nome, cartao }: IDados = req.body;

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO ${TABELA} (userDocument, creditCardToken) VALUES ($1, $2)`,
        [nome, cartao]
      );
      res.status(201).send(`Usuário ${nome} salvo no banco de dados`);
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

  static async showMainTable(req: Request, res: Response): Promise<void> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT column_name, data_type, character_maximum_length
        FROM information_schema.columns
        WHERE table_name = '${TABELA}';`
      );

      // Envie os resultados da consulta como resposta
      res.status(200).json(result.rows);
    } catch (error) {
      console.log("Erro ao mostrar tabela", error);
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
