import { Router } from "express";
import MainController from "../controllers/mainController";

const router = Router();

router
  .get("/", MainController.sayHello)
  .post("/salvardados", MainController.salvarDadosUsuario)
  .get("/transactions", MainController.listarDadosUsuarios);

export default router;
