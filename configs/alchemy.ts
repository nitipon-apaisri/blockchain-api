import { Network } from "alchemy-sdk";

export const alchemyConfig = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_MAINNET, // Replace with your network.
};
