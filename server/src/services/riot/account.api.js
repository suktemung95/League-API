const riotGet = require("./riotClient");

exports.getAccountByUser = async (gameName, tagLine, region) => {
  const path = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  return await riotGet(path, region);
};

exports.getAccountById = async (id, region) => {
  const path = `/riot/account/v1/accounts/by-puuid/${id}`;
  return await riotGet(path, region);
};