import { Router } from "express";
import { getEthereumStatsController, getEthereumNodesController, getEthereumAccountBalanceController, getEthereumTransactionsController } from "../controllers/ethereumController";
const router = Router();

router.get("/stats", getEthereumStatsController);
router.get("/nodes", getEthereumNodesController);
router.get("/account", getEthereumAccountBalanceController);
router.get("/transactions", getEthereumTransactionsController);
export default router;
