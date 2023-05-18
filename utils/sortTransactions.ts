import { BigNumber } from "alchemy-sdk";
import { ethereumTransaction } from "../types/ethereumTypes";
import { calcTransactionFee, weiToEth } from "./converts";

export const sortTransactions = (transactions: any, address: string) => {
    const sent = [] as any;
    const received = [] as any;

    for (let i of transactions) {
        const transaction: ethereumTransaction = {
            transaction: {
                from: i.from,
                to: i.to,
                txHash: i.hash,
                timeStamp: Number(i.timeStamp),
                transactionFee: {
                    value: calcTransactionFee(i.gasPrice, i.gasUsed),
                    unit: "ETH",
                },
                value: {
                    value: weiToEth(i.value, false),
                    unit: "ETH",
                },
            },
        };
        if (i.to.toLowerCase() === address.toLowerCase()) {
            received.push(transaction);
        }
        if (i.from.toLowerCase() === address.toLowerCase()) {
            sent.push(transaction);
        }
    }

    return { sent, received };
};
