export const sortTransactions = (transactions: any, address: string) => {
    const sent = [] as any;
    const received = [] as any;

    for (let i of transactions) {
        if (i.to.toLowerCase() === address.toLowerCase()) {
            received.push(i);
        }
        if (i.from.toLowerCase() === address.toLowerCase()) {
            sent.push(i);
        }
    }
    return { sent, received };
};
