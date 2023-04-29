import { Router } from "express";
import { getEthereumStatsController, getEthereumAccountBalanceController, getEthereumTransactionsController } from "../controllers/ethereumController";
const router = Router();

router.get("/stats", getEthereumStatsController);
router.get("/account", getEthereumAccountBalanceController);
router.get("/transactions", getEthereumTransactionsController);
export default router;
