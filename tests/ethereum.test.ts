import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
import { weiToEth } from "../utils/convert";
describe("Ethereum", () => {
    const address = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
    test("should return Ethereum stats", async () => {
        const response = await request(app).get("/api/ethereum/stats");
        expect(response.status).toBe(200);
    });
    test("should return Ethereum account balance", async () => {
        const response = await request(app).get(`/api/ethereum/account?address=${address}`);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("number");
    });
    test("should return Ethereum transactions", async () => {
        const response = await request(app).get(`/api/ethereum/transactions?address=${address}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "OK");
        expect(response.body).toHaveProperty("result");
    });
});
describe("Utils", () => {
    test("10^18 wei should be 1 ETH", () => {
        expect(weiToEth("1000000000000000000")).toBe(1);
    });
});
