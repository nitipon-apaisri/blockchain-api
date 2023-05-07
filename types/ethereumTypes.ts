export interface ethereumStats {
    stats: {
        supply: valueFormat;
        staking: valueFormat;
        burntFees: valueFormat;
        totalWithdrawn: valueFormat;
        totalNodes: valueFormat;
    };
}

export interface ethereumAccount {
    account: {
        address: string;
        balance: valueFormat;
        transactions: { sent: any; received: any };
        tokens: Array<tokenERC20>;
    };
}

export interface tokenERC20 {
    name: string;
    balance: string;
}

export interface valueFormat {
    value: number;
    unit: string;
}
