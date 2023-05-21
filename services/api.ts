import axios from "axios";
import { Alchemy } from "alchemy-sdk";
import { alchemyConfig } from "../configs/alchemy";
import { ENS } from "@ensdomains/ensjs";
import { ethers } from "ethers";
class EthereumApis {
    protected ethereumApiUrl: any = axios.create({ baseURL: process.env.ETHERSCAN_API_URL });
    protected ethscanApiKey: any = process.env.ETHERSCAN_API_KEY;
    protected alchemy = new Alchemy(alchemyConfig);

    async getSupply() {
        const resEthSupply = await this.ethereumApiUrl.get(`?module=stats&action=ethsupply2&apikey=${this.ethscanApiKey}`);
        return resEthSupply;
    }

    async getNodes() {
        const resEthNodes = await this.ethereumApiUrl.get(`?module=stats&action=nodecount&apikey=${this.ethscanApiKey}`);
        return resEthNodes;
    }

    async getAccountBalance(address: string) {
        const resAccountBalance = await this.ethereumApiUrl.get(`?module=account&action=balance&address=${address}&tag=latest&apikey=${this.ethscanApiKey}`);
        return resAccountBalance;
    }

    async getAccountTransactions(address: string) {
        const resAccountTransactions = await this.ethereumApiUrl.get(`?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${this.ethscanApiKey}`);
        return resAccountTransactions;
    }

    async getTokenBalances(address: string) {
        const resTokenBalances = await this.alchemy.core.getTokenBalances(address);
        return resTokenBalances;
    }

    async getTokenMetadata(contractAddress: string) {
        const resTokenMetadata = await this.alchemy.core.getTokenMetadata(contractAddress);
        return resTokenMetadata;
    }

    async getTransaction(txHash: string) {
        const resTransaction = await this.alchemy.transact.getTransaction(txHash);
        return resTransaction;
    }
    async getGasPrice() {
        const resGasPrice = await this.ethereumApiUrl.get(`?module=gastracker&action=gasoracle&apikey=${this.ethscanApiKey}`);
        return resGasPrice;
    }
    async getENSbyAddress(address: string) {
        const provider = new ethers.JsonRpcProvider(`${process.env.INFURA_API_URL}/${process.env.INFURA_API_KEY}`);
        // const ENSInstance = new ENS()
        const blockNumber = await provider.getBlockNumber();
        return blockNumber;
        // const endPrimaryName = await ENSInstance.getName(address)
    }
}

export { EthereumApis };
