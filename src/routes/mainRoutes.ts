import { Router } from "express";
import MainController from "../controllers/mainController";
// import PoulateController from "../controllers/populateController";

const router = Router();

router
  .get("/", MainController.sayHello)
  // .get('/showtable', MainController.showMainTable)

export default router;
