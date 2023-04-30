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
        balance: number;
        transactions: { [key: string]: string }[];
    };
}
