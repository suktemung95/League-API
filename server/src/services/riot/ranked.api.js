const riotGet = require('./riotClient')

exports.getRankedDataByRiotId = async (gameName, tagLine, region, platform) => {

    // 1. Riot ID → PUUID
    const account = await riotGet(
        `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        region
    )

    // 2. PUUID → ranked
    const ranked = await riotGet(
        `/lol/league/v4/entries/by-puuid/${account.puuid}`,
        platform
    )

    return ranked

}