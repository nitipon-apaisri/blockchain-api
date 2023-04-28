import { Request, Response } from "express";
import { getEthereumStats, getEthereumNodes, getEthereumAccountBalance, getEthereumTransactions } from "../models/ethereumModel";

export const getEthereumStatsController = async (req: Request, res: Response) => {
    try {
        const data = await getEthereumStats();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum stats" });
    }
};

export const getEthereumNodesController = async (req: Request, res: Response) => {
    try {
        const data = await getEthereumNodes();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum nodes" });
    }
};

export const getEthereumAccountBalanceController = async (req: Request, res: Response) => {
    try {
        const address = req.query.address as string;
        const data = await getEthereumAccountBalance(address);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum account" });
    }
};

export const getEthereumTransactionsController = async (req: Request, res: Response) => {
    try {
        const address = req.query.address as string;
        const data = await getEthereumTransactions(address);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum transactions" });
    }
};
