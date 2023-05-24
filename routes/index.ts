import { Router } from "express";
import * as ethController from "../controllers/ethereumController";
const router = Router();

//Ethereum routes
router.get("/ethereum/stats", ethController.getEthereumStatsController);
router.get("/ethereum/account", ethController.getEthereumAccountController);
router.get("/ethereum/transaction", ethController.getEthereumTransactionsController);
router.get("/ethereum/gas", ethController.getEthereumGasController);
router.get("/ethereum/ens/lookupAddress", ethController.getENSbyAddressController);
router.get("/ethereum/ens/resolveName", ethController.getAddressbyENSController);
export default router;
