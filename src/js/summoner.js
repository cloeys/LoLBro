require('request').debug = true;
var fs = require('fs');

const removeChildren = (node) => {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
};

const formatChamp = (champion, fullName = false) => {
    return fullName ? `${champion.name} ${champion.title}` : champion.name;
};

const addMatchToTarget = (doc, target, champName) => {
    console.log(champName);
    const match = doc.createElement('div');
    match.classList.add('match');
    const champion = doc.createElement('p');
    champion.innerHTML = champName;
    target.appendChild(match);
    match.appendChild(champion);
};

exports.showSummoner = (doc, kayn, summoner, target) => {
    if (summoner == null || summoner == '') return;
    removeChildren(target);

    const p = doc.createElement('p');
    let error;
    let matchesList = doc.createElement('div');
    matchesList.classList.add('matchContainer');
    let summonerObject;
    let argh = [];
    let allChamps;
    fs.readFile('champs.json', (err, data) => {
        if (err) throw err;
        allChamps = JSON.parse(data);
    });

    try {

        const lala = kayn.Summoner.by.name(summoner).then(summoner => {
                if (p.innerHTML == '') p.innerHTML = summoner.name;
                return kayn.Matchlist.Recent.by
                    .accountID(summoner.accountId);
            }, err => console.log(err))
            .then(matchlist => {
                let hello = matchlist.matches.map(match => {
                    return match.champion;
                });
                return hello;
            }, err => console.log(err))
            .then(requestArray => {
                for (let r in requestArray) {
                    let req = requestArray[r];
                    let champObj = allChamps.find(el => el.id == req);
                    let c = formatChamp(champObj);
                    addMatchToTarget(doc, matchesList, c);
                }
            });

    } catch (ex) {
        p.innerHTML = ex;
    } finally {
        target.appendChild(p);
        target.appendChild(matchesList);
    }
};