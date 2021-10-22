const axios = require("axios");

async function getVatsimData() {
    const response = await axios.get("https://data.vatsim.net/v3/vatsim-data.json");
    return response.data;
}

module.exports = { getVatsimData }