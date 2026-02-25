const riotGet = require('./riotClient');

exports.getAccountByRiotId = async (gameName, tagLine, region) => {
    const path = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
    return await riotGet(path, region)
}