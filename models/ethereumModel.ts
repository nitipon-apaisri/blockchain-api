import { ethereumAccount, ethereumStats } from "../types/ethereumTypes";
import { weiToEth } from "../utils/convert";

// import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";
// const config = {
//     apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
//     network: Network.ETH_MAINNET, // Replace with your network.
//   };

// const alchemy = new Alchemy(config);
const url = process.env.ETHERSCAN_API_URL;
const api = process.env.ETHERSCAN_API_KEY;

export const getEthereumStats = async () => {
    const resEthSupply = await fetch(`${url}?module=stats&action=ethsupply2&apikey=${api}`);
    const resEthNodes = await fetch(`${url}?module=stats&action=nodecount&apikey=${api}`);
    const ethSupplyData = await resEthSupply.json();
    const ethNodesData = await resEthNodes.json();
    const stats: ethereumStats = {
        stats: {
            supply: weiToEth(ethSupplyData.result.EthSupply),
            staking: weiToEth(ethSupplyData.result.Eth2Staking),
            burntFees: weiToEth(ethSupplyData.result.BurntFees),
            totalWithdrawn: weiToEth(ethSupplyData.result.WithdrawnTotal),
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
    const resAccountBalance = await fetch(`${url}?module=account&action=balance&address=${address}&tag=latest&apikey=${api}`);
    const resAccountTransactions = await fetch(`${url}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${api}`);
    const accountBalanceData = await resAccountBalance.json();
    const accountTransactionsData = await resAccountTransactions.json();
    const account: ethereumAccount = {
        account: {
            balance: weiToEth(accountBalanceData.result),
            transactions: accountTransactionsData.result,
        },
    };
    if (resAccountBalance.status !== 200 || resAccountTransactions.status !== 200) {
        throw new Error("Error fetching Ethereum account");
    } else {
        return account;
    }
};

export const getEthereumTransactions = async (txHash: string) => {
    console.log(txHash);
    const res = await fetch(`${url}?module=account&action=txlistinternal&txhash=${txHash}&apikey=${api}`);
    const data = await res.json();
    return data;
};
