const riotGet = require('./riotClient');
const accountApi = require('./account.api')

exports.getMatchesByRiotId = async (gameName, tagLine, region) => {

    // Riot ID → PUUID
    const account = await accountApi.getAccountByRiotId(gameName, tagLine, region)
    // const path = 

    // PUUID → matches
    const matches = await riotGet(
        `/lol/match/v5/matches/by-puuid/${account.puuid}/ids`,
        region
    )

    return matches
}

exports.getMatchByMatchId = async (matchId, region) => {

    const match = await riotGet(
        `/lol/match/v5/matches/${matchId}`,
        region
    )

    return match
}