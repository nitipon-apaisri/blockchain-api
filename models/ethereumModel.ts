import { ethereumStats } from "../types/ethereumTypes";
import { weiToEth } from "../utils/convert";

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

export const getEthereumAccountBalance = async (address: string) => {
    const res = await fetch(`${url}?module=account&action=balance&address=${address}&tag=latest&apikey=${api}`);
    const data = await res.json();
    const balance = weiToEth(data.result);
    return balance;
};

export const getEthereumTransactions = async (address: string) => {
    const res = await fetch(`${url}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${api}`);
    const data = await res.json();
    return data;
};
