import express, { Request, Response } from "express";
import dotenv from 'dotenv'; 
import router from "./routes/mainRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config()
app.use(router)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
