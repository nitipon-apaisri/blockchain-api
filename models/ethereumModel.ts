import { ethereumAccount, ethereumStats, tokenERC20 } from "../types/ethereumTypes";
import { tokenBalanceFormat, weiToEth, weiToGwei } from "../utils/converts";
import { BigNumber } from "alchemy-sdk";
import { sortTransactions } from "../utils/sortTransactions";
import { EthereumApis } from "../services/api";

const ethereumApis = new EthereumApis();

export const getEthereumStats = async () => {
    const resEthSupply = await ethereumApis.getSupply();
    const resEthNodes = await ethereumApis.getNodes();
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
    const resAccountBalance = await ethereumApis.getAccountBalance(address);
    const resAccountTransactions = await ethereumApis.getAccountTransactions(address);
    const tokens = await ethereumApis.getTokenBalances(address);
    const accountBalanceData = await resAccountBalance.data;
    const accountTransactionsData = await resAccountTransactions.data;

    for (let i of tokens.tokenBalances) {
        const token = await ethereumApis.getTokenMetadata(i.contractAddress);
        const tokenBalance = {
            name: token.name,
            balance: tokenBalanceFormat(i, token.symbol as string),
        };
        tokenBalances.push(tokenBalance as tokenERC20);
    }

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

export const getEthereumTransaction = async (txHash: string) => {
    const res = await ethereumApis.getTransaction(txHash);

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
