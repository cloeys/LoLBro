require('dotenv').config();

import {
    Kayn,
    REGIONS,
    METHOD_NAMES,
    BasicJSCache,
    RedisCache,
} from 'kayn';

const apiKey = process.env.RIOT_API_KEY;

const kayn = Kayn(apiKey)({
    region: 'euw'
  });

const querySummoner = async (name) => {
    const summoner = await kayn.Summoner.by.name(name);

    console.log(summoner);
};

querySummoner('superchrisbros');
