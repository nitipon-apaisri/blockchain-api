import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
import { weiToEth } from "../utils/convert";
describe("Ethereum", () => {
    const address: string = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
    const txHash: string = "0x7c103b7a93c6d73f5840d5452b4bc01a032940c3ca6fbc4792123bad55017dab";
    test("should return Ethereum stats", async () => {
        const response = await request(app).get("/api/ethereum/stats");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("stats");
    });
    test("should return Ethereum account", async () => {
        const response = await request(app).get(`/api/ethereum/account?address=${address}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("account");
        expect(response.body.account).toHaveProperty("balance");
    });
    // test("should return Ethereum transactions", async () => {
    //     const response = await request(app).get(`/api/ethereum/transactions?txhash=${txHash}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty("message", "OK");
    //     expect(response.body).toHaveProperty("result");
    // });
});
describe("Utils", () => {
    test("10^18 wei should be 1 ETH", () => {
        expect(weiToEth("1000000000000000000")).toBe(1);
    });
});
