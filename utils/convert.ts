export const weiToEth = (wei: string) => {
    const calc = Number(wei) / 10 ** 18;
    return Number(calc.toFixed(4));
};
