import axios from "axios";
import { ethereumAccount, ethereumStats } from "../types/ethereumTypes";
import { weiToEth, weiToGwei } from "../utils/converts";
import { Alchemy, Network, BigNumber } from "alchemy-sdk";
import { sortTransactions } from "../utils/sortTransactions";
const config = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(config);
const url = process.env.ETHERSCAN_API_URL;
const api = process.env.ETHERSCAN_API_KEY;
export const getEthereumStats = async () => {
    const resEthSupply = await axios.get(`${url}?module=stats&action=ethsupply2&apikey=${api}`);
    const resEthNodes = await axios.get(`${url}?module=stats&action=nodecount&apikey=${api}`);
    const ethSupplyData = await resEthSupply.data;
    const ethNodesData = await resEthNodes.data;
    const stats: ethereumStats = {
        stats: {
            supply: weiToEth(ethSupplyData.result.EthSupply, false),
            staking: weiToEth(ethSupplyData.result.Eth2Staking, false),
            burntFees: weiToEth(ethSupplyData.result.BurntFees, false),
            totalWithdrawn: weiToEth(ethSupplyData.result.WithdrawnTotal, false),
            totalNodes: Number(ethNodesData.result.TotalNodeCount),
        },
    };
    if (resEthSupply.status !== 200 || resEthNodes.status !== 200) {
        throw new Error("Error fetching Ethereum stats");
    } else {
        return stats;
    }
};

export const getEthereumAccount = async (address: string) => {
    const resAccountBalance = await axios.get(`${url}?module=account&action=balance&address=${address}&tag=latest&apikey=${api}`);
    const resAccountTransactions = await axios.get(`${url}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${api}`);
    const accountBalanceData = await resAccountBalance.data;
    const accountTransactionsData = await resAccountTransactions.data;
    const account: ethereumAccount = {
        account: {
            balance: weiToEth(accountBalanceData.result, false),
            transactions: sortTransactions(accountTransactionsData.result, address),
        },
    };
    if (resAccountBalance.status !== 200 || resAccountTransactions.status !== 200) {
        throw new Error("Error fetching Ethereum account");
    } else {
        return account;
    }
};

export const getEthereumTransactions = async (txHash: string) => {
    const res = await alchemy.transact.getTransaction(txHash);
    const transaction = {
        transaction: {
            from: res?.from,
            to: res?.to,
            gasPrice: weiToGwei(BigNumber.from(res?.gasPrice).toString()),
            value: weiToEth(BigNumber.from(res?.value).toString(), res?.value._isBigNumber as boolean),
        },
    };
    if (res === null) {
        throw new Error("Error fetching Ethereum transactions");
    } else {
        return transaction;
    }
};
