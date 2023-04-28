import {Router} from 'express';
import { getEthereumStatsController, getEthereumNodesController,getEthereumAccountController } from '../controllers/ethereumController';
const router = Router();

router.get('/stats', getEthereumStatsController);
router.get('/nodes', getEthereumNodesController);
router.get('/account', getEthereumAccountController);
export default router;