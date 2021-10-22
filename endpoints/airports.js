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
    var arrivals = 0;
    var departures = 0;
    var numControllers = 0;
    for (var i = 0; i < pilots.length; i++) {
        let pilot = pilots[i];
        if (pilot.flight_plan != null) {
            let flightPlan = pilot.flight_plan;
            if (flightPlan.departure.toUpperCase() == icao) {
                departures++;
            }
            if (flightPlan.arrival.toUpperCase() == icao) {
                arrivals++;
            }
        }
    }
    let controllers = data.controllers;
    for (var i = 0; i < controllers.length; i++) {
        let controller = controllers[i];
        if (controller.callsign.includes(icao)) {
            numControllers++;
        }
    }
    let payload = {
        "departures": departures,
        "arrivals": arrivals,
        "controllers": numControllers
    }
    res.send(payload);
}

module.exports = { getAirportData }