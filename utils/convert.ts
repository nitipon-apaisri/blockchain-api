export const weiToEth = (wei: string) => { 
    return Number(wei) / 10 ** 18;
}