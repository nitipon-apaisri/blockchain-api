import {Router} from 'express';
import { getEthereumStatsController, getEthereumNodesController } from '../controllers/ethereumController';
const router = Router();

router.get('/stats', getEthereumStatsController);
router.get('/nodes', getEthereumNodesController);

export default router;