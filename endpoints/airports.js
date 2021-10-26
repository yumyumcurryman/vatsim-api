const bodyParser = require("body-parser");
const network = require("./network")

async function getAirportData(req, res, next) {
    if (req.params.icao == null) {
        res.send("no icao given");
        return;
    }
    let icao = req.params.icao.toUpperCase();
    let data = await network.getVatsimData();
    let pilots = data.pilots;
    var numArrivals = 0;
    var numDepartures = 0;
    var departures = [];
    var arrivals = [];
    var numControllers = 0;
    var aControllers = [];
    for (var i = 0; i < pilots.length; i++) {
        let pilot = pilots[i];
        if (pilot.flight_plan != null) {
            let flightPlan = pilot.flight_plan;
            if (flightPlan.departure.toUpperCase() == icao) {
                numDepartures++;
                departures.push(pilot);
            }
            if (flightPlan.arrival.toUpperCase() == icao) {
                numArrivals++;
                arrivals.push(pilot);
            }
        }
    }
    let controllers = data.controllers;
    for (var i = 0; i < controllers.length; i++) {
        let controller = controllers[i];
        if (controller.callsign.includes(icao)) {
            numControllers++;
            aControllers.push(controller);
        }
    }
    let payload = {
        "metadata" : {
            "departures": numDepartures,
            "arrivals": numArrivals,
            "controllers": numControllers
        },
        "departures": departures,
        "arrivals": arrivals,
        "controllers": aControllers
    }
    res.type('json').send(JSON.stringify(payload, null, 2) + '\n');
}

module.exports = { getAirportData }