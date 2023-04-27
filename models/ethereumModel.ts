export const getEthereumStats = async () => { 
    const res = await fetch(`${process.env.ETHERSCAN_API_URL}?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`);
    const data = await res.json();
    return data;
}


