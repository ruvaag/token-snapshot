import axios from 'axios';
import moment from 'moment';
import BigNumber from 'bignumber.js';

export default async function getSnapshot(address, date) {
    if (address === undefined || date === undefined) return null;

    const transfers = await fetchTransfers(address);
    const result = aggregateTransfers(transfers, address, date);
    formatBalances(result);
    await formatPrices(result);
    sortTokens(result);

    return result;
    // return new Promise((res) => { setTimeout(() => res("Late Text"), 5000) });
}

async function fetchTransfers(address) {
    const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
    const baseUrl = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&apikey=${apiKey}`;

    const res = await axios.get(baseUrl);
    return res.data.result;
}

function aggregateTransfers(transfers, address, date) {
    let result = {};

    const initObj = (e) => {
        result[e.contractAddress] = {
            "amt": BigNumber(0),
            "name": e.tokenName,
            "symbol": e.tokenSymbol,
            "decimals": e.tokenDecimal,
            "address": e.contractAddress,
        }
        return BigNumber(0);
    }

    transfers.forEach(e => {
        if (moment.unix(e.timeStamp).isAfter(moment.unix(date))) return;
        const prevAmt = result[e.contractAddress]?.amt ?? initObj(e)
        if (e.to === address) {
            result[e.contractAddress].amt = prevAmt.plus(BigNumber(e.value));
            return;
        }
        if (e.from === address) {
            result[e.contractAddress].amt = prevAmt.minus(BigNumber(e.value));
            return;
        }
        console.log("Borked");
    })

    result = Object.keys(result).filter(k => !result[k].amt.isEqualTo(0))
        .reduce((obj, k) => { obj[k] = result[k]; return obj; }, {});

    return Object.values(result);
}

function formatBalances(arr) {
    arr.forEach(e => {
        const amt = e.amt;
        const decimals = BigNumber(10).exponentiatedBy(e.decimals);
        e.balance = amt.dividedBy(decimals);
    })
}

async function formatPrices(arr) {
    const baseUrl = "https://api.coingecko.com/api/v3/simple/token_price/ethereum?";
    const args = arr.reduce((res, e) => res.concat(e.address, ','), "");
    const res = await axios.get(`${baseUrl}contract_addresses=${args}&vs_currencies=usd`)
    arr.forEach(e => {
        e.price = res.data.hasOwnProperty(e.address) ? res.data[e.address].usd : null;
        e.value = e?.price ? BigNumber(e.balance).multipliedBy(BigNumber(e.price)) : null;
    })
}

function sortTokens(arr) {
    const fn = (a, b) => {
        if (a.value == null && b.value != null) return 1;
        if (b.value == null && a.value != null) return -1;
        if (a.value == null && b.value == null) return 0;
        if (BigNumber(a.value).isEqualTo(BigNumber(b.value))) return 0;
        return BigNumber(a.value).isLessThan(BigNumber(b.value)) ? 1 : -1
    }
    arr.sort(fn);
}