import { BigNumber } from "alchemy-sdk";

const weiToEth = (wei: string, isBigNumber: boolean) => {
    if (isBigNumber) {
        const bn = BigNumber.from(wei).toString();
        const calc = Number(bn) / 10 ** 18;
        return Number(calc.toFixed(4));
    } else {
        const calc = Number(wei) / 10 ** 18;
        return Number(calc.toFixed(4));
    }
};

const weiToGwei = (gwei: string) => {
    const calc = Number(gwei) / 10 ** 9;
    return Number(calc.toFixed(4));
};

const tokenBalanceFormat = (token: any, symbol: string) => {
    const tokenBalance = `${BigNumber.from(token.tokenBalance).toString()} ${symbol}`;
    return tokenBalance;
};
const calcTransactionFee = (gasPrice: string, gasUsed: string) => {
    const calc = (Number(gasPrice) * Number(gasUsed)) / 10 ** 18;
    return Number(calc);
};
export { weiToEth, weiToGwei, tokenBalanceFormat, calcTransactionFee };
