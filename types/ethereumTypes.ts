interface ethereumStats {
    stats: {
        supply: valueFormat;
        staking: valueFormat;
        burntFees: valueFormat;
        totalWithdrawn: valueFormat;
        totalNodes: valueFormat;
    };
}

interface ethereumAccount {
    account: {
        address: string;
        balance: valueFormat;
        transactions: { sent: any; received: any };
        tokens: Array<tokenERC20>;
    };
}

interface ethereumTransaction {
    transaction: {
        from: string;
        to: string;
        gasPrice: valueFormat;
        value: valueFormat;
    };
}

interface ethereumGas {
    gas: {
        average: valueFormat;
        lastBlock: number;
    };
}
interface tokenERC20 {
    name: string;
    balance: string;
}

interface valueFormat {
    value: number;
    unit: string;
}

export { ethereumStats, ethereumAccount, ethereumTransaction, ethereumGas, tokenERC20 };
