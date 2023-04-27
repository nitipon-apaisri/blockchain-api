
import  {Request, Response} from 'express';
import { getEthereumStats } from "../models/ethereumModel";

export const getEthereumStatsController = async (req: Request, res: Response) => {
    try {
        const data = await getEthereumStats();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching Ethereum stats"});
    }
}