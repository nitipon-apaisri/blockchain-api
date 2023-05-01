import { ethereumAccount, ethereumStats } from "../types/ethereumTypes";
import { weiToEth, weiToGwei } from "../utils/convert";
import { Alchemy, Network, AssetTransfersCategory, BigNumber } from "alchemy-sdk";
const config = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(config);
const url = process.env.ETHERSCAN_API_URL;
const api = process.env.ETHERSCAN_API_KEY;
export const getEthereumStats = async () => {
    const resEthSupply = await fetch(`${url}?module=stats&action=ethsupply2&apikey=${api}`);
    const resEthNodes = await fetch(`${url}?module=stats&action=nodecount&apikey=${api}`);
    const ethSupplyData = await resEthSupply.json();
    const ethNodesData = await resEthNodes.json();
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
    const resAccountBalance = await fetch(`${url}?module=account&action=balance&address=${address}&tag=latest&apikey=${api}`);
    const resAccountTransactions = await fetch(`${url}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${api}`);
    const accountBalanceData = await resAccountBalance.json();
    const accountTransactionsData = await resAccountTransactions.json();
    const account: ethereumAccount = {
        account: {
            balance: weiToEth(accountBalanceData.result, false),
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
