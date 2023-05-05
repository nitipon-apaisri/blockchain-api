export interface ethereumStats {
    stats: {
        supply: number;
        staking: number;
        burntFees: number;
        totalWithdrawn: number;
        totalNodes: number;
    };
}

export interface ethereumAccount {
    account: {
        address: string;
        balance: string;
        transactions: { sent: any; received: any };
        tokens: Array<tokenERC20>;
    };
}

export interface tokenERC20 {
    name: string;
    balance: string;
}
