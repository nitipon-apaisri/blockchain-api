import { BigNumber } from "alchemy-sdk";

export const weiToEth = (wei: string, isBigNumber: boolean) => {
    if (isBigNumber) {
        const bn = BigNumber.from(wei).toString();
        const calc = Number(bn) / 10 ** 18;
        return Number(calc.toFixed(4));
    } else {
        const calc = Number(wei) / 10 ** 18;
        return Number(calc.toFixed(4));
    }
};

export const weiToGwei = (gwei: string) => {
    const calc = Number(gwei) / 10 ** 9;
    return Number(calc.toFixed(4));
};
