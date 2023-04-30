import { Router } from "express";
import { getEthereumStatsController, getEthereumAccountController, getEthereumTransactionsController } from "../controllers/ethereumController";
const router = Router();

router.get("/stats", getEthereumStatsController);
router.get("/account", getEthereumAccountController);
router.get("/transactions", getEthereumTransactionsController);
export default router;
