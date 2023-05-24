import { Request, Response } from "express";
import { getEthereumStats, getEthereumAccount, getEthereumTransaction, getEthereumGasPrice, getENSbyAddress, getAddressbyENS } from "../models/ethereumModel";

const getEthereumStatsController = async (req: Request, res: Response) => {
    try {
        const data = await getEthereumStats();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum stats" });
    }
};

const getEthereumAccountController = async (req: Request, res: Response) => {
    try {
        const address = req.query.address as string;
        const data = await getEthereumAccount(address);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum account" });
    }
};

const getEthereumTransactionsController = async (req: Request, res: Response) => {
    try {
        const txHash = req.query.txhash as string;
        const data = await getEthereumTransaction(txHash);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum transactions" });
    }
};

const getEthereumGasController = async (req: Request, res: Response) => {
    try {
        const data = await getEthereumGasPrice();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching Ethereum gas" });
    }
};

const getENSbyAddressController = async (req: Request, res: Response) => {
    try {
        const address = req.query.address as string;
        const data = await getENSbyAddress(address);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching ENS by address" });
    }
};

const getAddressbyENSController = async (req: Request, res: Response) => {
    try {
        const name = req.query.ens as string;
        const data = await getAddressbyENS(name);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching address by ENS" });
    }
};

export { getEthereumStatsController, getEthereumAccountController, getEthereumTransactionsController, getEthereumGasController, getENSbyAddressController, getAddressbyENSController };
