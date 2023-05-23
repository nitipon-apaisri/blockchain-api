import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
describe("Ethereum", () => {
    const address: string = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
    const txHash: string = "0x7c103b7a93c6d73f5840d5452b4bc01a032940c3ca6fbc4792123bad55017dab";
    test("should return Ethereum stats", async () => {
        try {
            const response = await request(app).get("/api/ethereum/stats");
            expect(response.status).toBe(200);
            expect(response.body.stats).toHaveProperty("supply");
        } catch (error) {
            console.error(error);
        }
    });
    test.skip("should return Ethereum account", async () => {
        const response = await request(app).get(`/api/ethereum/account?address=${address}`);
        expect(response.status).toBe(200);
        expect(response.body.account).toHaveProperty("transactions");
    }, 10000);
    test("should return Ethereum transaction", async () => {
        const response = await request(app).get(`/api/ethereum/transaction?txhash=${txHash}`);
        expect(response.status).toBe(200);
        expect(response.body.transaction).toHaveProperty("value");
    });
    test("should return Ethereum gas", async () => {
        const response = await request(app).get("/api/ethereum/gas");
        expect(response.status).toBe(200);
        // expect(response.body.gas).toHaveProperty("fast");
    });
    test("should return ENS primary name", async () => {
        const response = await request(app).get("/api/ethereum/ens/lookup?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
        expect(response.status).toBe(200);
        expect(response.body.ens).toBe("vitalik.eth");
    });
    test("should return the binding address", async () => {
        const response = await request(app).get("/api/ethereum/ens/resolveName?ens=vitalik.eth");
        expect(response.status).toBe(200);
        expect(response.body.ens).toBe("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
    });
});
