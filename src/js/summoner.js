
require('request').debug = true;
var fs = require('fs');

const removeChildren = (node) => {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
};

const retrieveChampion = async(kayn, id, fullName = false) => {
    let champion = await new Promise((resolve, reject) => kayn.Static.Champion.get(id).callback(data => resolve(data)));
    console.log(champion);
    let champName = fullName ? `${champion.name} ${champion.title}` : champion.name;
    return new Promise((resolve, reject) => resolve(champName));
};

const addMatchToTarget = (doc, target, champName) => {
    const match = doc.createElement('div');
    match.classList.add('match');
    const champion = doc.createElement('p');
    champion.innerHTML = champName;
    target.appendChild(match);
    match.appendChild(champion);
};

exports.showSummoner = async(doc, kayn, summoner, target) => {
    console.log("hey")
    if (summoner == null || summoner == '') return;
    removeChildren(target);

    const p = doc.createElement('p');
    let error;
    let matchesList = doc.createElement('div');
    matchesList.classList.add('matchContainer');
    let summonerObject;
    let argh = []
    let allChamps;
    fs.readFile('champs.json', (err, data) => {  
        if (err) throw err;
        allChamps = JSON.parse(data);
    });

    try {
        
        const lala = kayn.Summoner.by.name(summoner).then(summoner => {
                speechSynthesis.innerHTML = summoner.name;
                return kayn.Matchlist.Recent.by
                    .accountID(summoner.accountId);
            }, err => console.log(err))
            .then(matchlist => {
                return matchlist.matches.map(match => {
                    let e = kayn.Champion.get(match.champion)
                    return e;
                })
            }, err => console.log(err))
            .then(requestArray => {
                console.log(requestArray)
                for (let r in requestArray) {
                    let req = requestArray[r]
                    console.log(req)
                    req.callback((_, data) => {
                        let champObj = data;
                        console.log(allChamps.find(el => el.id == champObj.id));
                    });
                }
            })

    } catch (ex) {
        console.log(ex);
        error = ex;
    } finally {
        console.log("finlly!");
        if (error) {
            p.innerHTML = error;
        } else {
            //p.innerHTML = summonerObject.name;
        }

        target.appendChild(p);
        if (matchesList.hasChildNodes()) {
            target.appendChild(matchesList);

        }
    }
};