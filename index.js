const express = require("express");
const app = express();
const vatsim = require("./endpoints/vatsim")

//BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/metadata/totalUsers', vatsim.metadata.getTotalUsers);
app.get('/metadata/pilots', vatsim.metadata.getTotalPilots);
app.get('/metadata/controllers', vatsim.metadata.getTotalControllers);

app.get('/airports/:icao', vatsim.airports.getAirportData);

app.get('/pilots/byCID/:cid', vatsim.pilots.pilotByCID);
app.get('/pilots/byAircraft/:aircraft', vatsim.pilots.pilotByAircraft);
app.get('/pilots/byCompany/:company', vatsim.pilots.pilotByCompany);

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});