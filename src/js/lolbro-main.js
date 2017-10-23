require('dotenv').config();

import {
    Kayn,
    REGIONS,
    METHOD_NAMES,
    BasicJSCache,
    RedisCache,
} from 'kayn';
const summoner = require('./summoner');
const apiKey = process.env.RIOT_API_KEY;

const kayn = Kayn(apiKey)({
    region: 'euw'
});

let summonerName;
let summonerDiv;
let getSummonerButton;

window.addEventListener('DOMContentLoaded', _ => {
    console.log('loaded');
    summonerName = document.getElementById('summonerName');
    summonerDiv = document.getElementById('summonerDiv');
    getSummonerButton = document.getElementById('getSummonerButton');

    getSummonerButton.addEventListener('click', evt => {
        summoner.showSummoner(document, kayn, summonerName.value, summonerDiv);
    });
});