const network = require("./network");

async function pilotByCID(req, res, next) {
    let cid = req.params.cid;
    let result = null;
    let data = await network.getVatsimData();
    let pilots = data.pilots;
    for (var i = 0; i < pilots.length; i++) {
        let pilot = pilots[i];
        if (pilot.cid == cid) {
            result = pilot;
            break;
        }
    }
    if (result == null) {
        res.send("cid not found");
    } else {
        res.type('json').send(JSON.stringify(result, null, 2) + '\n');
    }
}

async function pilotByAircraft(req, res, next) {
    let aircraft = req.params.aircraft;
    let data = await network.getVatsimData();
    let payload = [];
    let pilots = data.pilots;
    for (let i = 0; i < pilots.length; i++) {
        let pilot = pilots[i];
        if (pilot.flight_plan != null) {
            if (pilot.flight_plan.aircraft_short.toUpperCase() == aircraft.toUpperCase()) {
                payload.push(pilot);
            }
        }
    }
    if (payload.length > 0) {
        res.type('json').send(JSON.stringify(payload, null, 2) + '\n');
    } else {
        res.send("hmm... nobody seems to be flying the " + aircraft.toUpperCase());
    }
    
}

async function pilotByCompany(req, res, next) {
    let company = req.params.company;
    let payload = []
    let data = await network.getVatsimData();
    let pilots = data.pilots;
    for (var i = 0; i < pilots.length; i++) {
        let pilot = pilots[i];
        if (pilot.callsign.toLowerCase().includes(company.toLowerCase())) {
            payload.push(pilot);
        }
    }
    if (payload.length > 0) {
        res.type('json').send(JSON.stringify(payload, null, 2) + '\n');
    } else {
        res.send("hmm... nobody seems to be flying for " + company.toUpperCase());
    }
}

module.exports = {pilotByCID, pilotByAircraft, pilotByCompany};