const riotGet = require("./riotClient");
const accountApi = require("./account.api");

exports.getPlayerById = async (id, region) => {
    const path = `/lol/summoner/v4/summoners/by-puuid/${id}`;
    return await riotGet(path, region);
};
