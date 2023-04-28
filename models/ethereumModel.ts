import { weiToEth } from "../utils/convert";

const url = process.env.ETHERSCAN_API_URL;
const api = process.env.ETHERSCAN_API_KEY;
export const getEthereumStats = async () => {
    const res = await fetch(`${url}?module=stats&action=ethprice&apikey=${api}`);
    const data = await res.json();
    return data;
};

export const getEthereumNodes = async () => {
    const res = await fetch(`${url}?module=stats&action=nodecount&apikey=${api}`);
    const data = await res.json();
    return data;
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
