const network = require("./network");

async function getTotalUsers(req, res, next) {
    let data = await network.getVatsimData();
    res.send(data.general.unique_users.toString());
}

async function getTotalPilots(req, res, next) {
    let data = await network.getVatsimData();
    let pilots = data.pilots;
    res.send(pilots.length.toString());
}

async function getTotalControllers(req, res, next) {
    let data = await network.getVatsimData();
    let controllers = data.controllers;
    res.send(controllers.length.toString());
}

module.exports = { getTotalUsers, getTotalPilots, getTotalControllers };