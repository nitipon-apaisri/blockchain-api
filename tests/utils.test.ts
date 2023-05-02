import { describe, expect, test } from "@jest/globals";
import { weiToGwei, weiToEth } from "../utils/converts";
describe("Utils", () => {
    test("10^18 wei should be 1 ETH", () => {
        expect(weiToEth("1000000000000000000", false)).toBe(1);
    });
    test("10^18 wei should be 10^9 gwei ", () => {
        expect(weiToGwei("1000000000000000000")).toBe(1000000000);
    });
});
