import pool from "../../dbConfig/poolConfig";
import fs from "fs";
import { Request, Response } from "express";

const jsonData = fs.readFileSync("../../helpers/db.json", "utf-8");
const dados = JSON.parse(jsonData);

export default class PoulateController {
  static async PopulateDB(req: Request, res: Response) {
    const client = await pool.connect();
    
  }
}
