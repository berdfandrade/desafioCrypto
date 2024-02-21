import { Router } from "express";
import MainController from "../controllers/mainController";
// import PoulateController from "../controllers/populateController";

const router = Router();

router
  .get("/", MainController.sayHello)
//   .post("/populatedb", PoulateController.PopulateDB);

export default router;

//   route.get("/transactions", async (req: Request, res: Response) => {
//       try {
//         // Query para selecionar todos os registros da tabela transactions
//         const selectQuery = `
//           SELECT * FROM transactions
//         `;

//         // Executa a consulta e obtém os resultados
//         const result = await pool.query(selectQuery);
//         const transactions = result.rows;

//         // Retorna os registros da tabela como resposta
//         res.json(transactions);
//       } catch (error) {
//         console.error("Erro ao consultar a tabela transactions:", error);
//         res.status(500).send("Erro ao consultar a tabela transactions");
//       }
//     });

//   route.get("/createtable", async (req: Request, res: Response) => {
//     try {
//       const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS transactions (
//           id SERIAL PRIMARY KEY,
//           userDocument VARCHAR(255) NOT NULL,
//           creditCardToken VARCHAR(255) NOT NULL,
//           value BIGINT NOT NULL
//         )
//       `;
//       // Correção: Altere 'poll' para 'pool'
//       await pool.query(createTableQuery);
//       res.send("Tabela criada com sucesso");
//     } catch (error) {
//       console.error("Erro ao criar a tabela:", error);
//       res.status(500).send("Erro ao criar a tabela");
//     }
//   });
