import axios from "axios";
import { ethereumAccount, ethereumStats, tokenERC20 } from "../types/ethereumTypes";
import { tokenBalanceFormat, weiToEth, weiToGwei } from "../utils/converts";
import { Alchemy, BigNumber } from "alchemy-sdk";
import { sortTransactions } from "../utils/sortTransactions";
import { alchemyConfig } from "../configs/alchemy";

const alchemy = new Alchemy(alchemyConfig);
const url = process.env.ETHERSCAN_API_URL;
const api = process.env.ETHERSCAN_API_KEY;
export const getEthereumStats = async () => {
    const resEthSupply = await axios.get(`${url}?module=stats&action=ethsupply2&apikey=${api}`);
    const resEthNodes = await axios.get(`${url}?module=stats&action=nodecount&apikey=${api}`);
    const ethSupplyData = await resEthSupply.data;
    const ethNodesData = await resEthNodes.data;
    const stats: ethereumStats = {
        stats: {
            supply: {
                value: weiToEth(ethSupplyData.result.EthSupply, false),
                unit: "ETH",
            },
            staking: {
                value: weiToEth(ethSupplyData.result.Eth2Staking, false),
                unit: "ETH",
            },
            burntFees: {
                value: weiToEth(ethSupplyData.result.BurntFees, false),
                unit: "ETH",
            },
            totalWithdrawn: {
                value: weiToEth(ethSupplyData.result.WithdrawnTotal, false),
                unit: "ETH",
            },
            totalNodes: {
                value: Number(ethNodesData.result.TotalNodeCount),
                unit: "Nodes",
            },
        },
    };
    if (resEthSupply.status !== 200 || resEthNodes.status !== 200) {
        throw new Error("Error fetching Ethereum stats");
    } else {
        return stats;
    }
};

export const getEthereumAccount = async (address: string) => {
    const tokenBalances = Array<tokenERC20>();
    const resAccountBalance = await axios.get(`${url}?module=account&action=balance&address=${address}&tag=latest&apikey=${api}`);
    const resAccountTransactions = await axios.get(`${url}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${api}`);
    const tokens = await alchemy.core.getTokenBalances(address);
    for (let i of tokens.tokenBalances) {
        const token = await alchemy.core.getTokenMetadata(i.contractAddress);
        const tokenBalance = {
            name: token.name,
            balance: tokenBalanceFormat(i, token.symbol as string),
        };
        tokenBalances.push(tokenBalance as tokenERC20);
    }
    const accountBalanceData = await resAccountBalance.data;
    const accountTransactionsData = await resAccountTransactions.data;
    const account: ethereumAccount = {
        account: {
            address: address,
            balance: {
                value: weiToEth(accountBalanceData.result, false),
                unit: "ETH",
            },
            tokens: tokenBalances,
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
