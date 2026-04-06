const riotGet = require("./riotClient");

exports.getMatchesById = async (id, region) => {
  const path = `/lol/match/v5/matches/by-puuid/${id}/ids`;
  return await riotGet(path, region);
};
