const riotGet = require('./riotClient')
const accountApi = require('./account.api')

exports.getRankedDataByRiotId = async (gameName, tagLine, region, platform) => {

    // 1. Riot ID → PUUID
    const account = await accountApi.getAccountByRiotId(gameName, tagLine, region)

    // 2. PUUID → ranked
    const ranked = await riotGet(
        `/lol/league/v4/entries/by-puuid/${account.puuid}`,
        platform
    )

    return ranked

}