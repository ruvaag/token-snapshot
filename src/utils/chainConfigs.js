const config = {
    "1": {
        "name": "Ethereum",
        "cgChainId": "ethereum",
        "transfersUrl": (address) => `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
        "explorerUrl": (token) => `https://etherscan.io/token/${token}`,
    },
    "56": {
        "name": "Binance",
        "cgChainId": "binance-smart-chain",
        "transfersUrl": (address) => `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_BSCSCAN_API_KEY}`,
        "explorerUrl": (token) => `https://bscscan.com/token/${token}`,
    },
    "10": {
        "name": "Optimism",
        "cgChainId": "optimistic-ethereum",
        "transfersUrl": (address) => `https://api-optimistic.etherscan.io/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_OPTISCAN_API_KEY}`,
        "explorerUrl": (token) => `https://optimisticetherscan.io/token/${token}`
    },
    "137": {
        "name": "Polygon",
        "cgChainId": "polygon-pos",
        "transfersUrl": (address) => `https://api.polygonscan.com/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`,
        "explorerUrl": (token) => `https://poylgonscan.com/token/${token}`,
    },
    "42161": {
        "name": "Arbitrum",
        "cgChainId": "arbitrum-one",
        "transfersUrl": (address) => `https://api.arbiscan.io/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_ARBISCAN_API_KEY}`,
        "explorerUrl": (token) => `https://arbiscan.io/token/${token}`,
    },
    "43114": {
        "name": "Avalanche-C",
        "cgChainId": "avalanche",
        "transfersUrl": (address) => `https://api.snowtrace.io/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_SNOWTRACE_API_KEY}`,
        "explorerUrl": (token) => `https://snowtrace.io/token/${token}`,
    },
    "250": {
        "name": "Fantom",
        "cgChainId": "fantom",
        "transfersUrl": (address) => `https://api.ftmscan.com/api?module=account&action=tokentx&address=${address}&apikey=${process.env.REACT_APP_FTMSCAN_API_KEY}`,
        "explorerUrl": (token) => `https://ftmscan.com/token/${token}`,
    }
}

export default config;