import { describe, expect, test } from "@jest/globals";
import { weiToGwei, weiToEth, calcTransactionFee } from "../utils/converts";
describe("Utils", () => {
    test("10^18 wei should be 1 ETH", () => {
        expect(weiToEth("1000000000000000000", false)).toBe(1);
    });
    test("10^18 wei should be 10^9 gwei ", () => {
        expect(weiToGwei("1000000000000000000")).toBe(1000000000);
    });
    test("should return 0.000612443339624048 when gas used equal = 45896 and gas price equal 13344155038", async () => {
        expect(calcTransactionFee("13344155038", "45896")).toBe(0.000612443339624048);
    });
});
