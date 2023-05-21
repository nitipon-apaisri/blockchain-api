import { Router } from "express";
import { getEthereumStatsController, getEthereumAccountController, getEthereumTransactionsController, getEthereumGasController, getENSbyAddressController } from "../controllers/ethereumController";
const router = Router();

//Ethereum routes
router.get("/ethereum/stats", getEthereumStatsController);
router.get("/ethereum/account", getEthereumAccountController);
router.get("/ethereum/transaction", getEthereumTransactionsController);
router.get("/ethereum/gas", getEthereumGasController);
router.get("/ethereum/ens", getENSbyAddressController);
export default router;
