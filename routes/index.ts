import {Router} from 'express';
import { getEthereumStatsController } from '../controllers/ethereumController';
const router = Router();

router.get('/stats', getEthereumStatsController);

export default router;