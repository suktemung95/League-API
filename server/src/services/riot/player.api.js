const riotGet = require("./riotClient");

exports.getPlayerById = async (id, region) => {
  const path = `/lol/summoner/v4/summoners/by-puuid/${id}`;
  return await riotGet(path, region);
};
