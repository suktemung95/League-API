const playerRepo = require("../repositories/player.repository");
const playerApi = require("../services/riot/player.api");

async function getPlayer(id) {
    try {
        // Logic to retrieve player data from repository
        const player = await getPlayerFromRepository(id);

        if (player) {
            return player;
        }

        // Logic to retrieve player data from Riot API
        const account = await getAccountByRiotId(gameName, tagLine, region);
        const playerData = await getPlayerData(account.puuid);
        await savePlayerToRepository(id, playerData);

        return playerData;
    } catch (error) {
        console.error('Error retrieving player data:', error);
        throw error;
    }
}

async function getRankedDataByRiotId(gameName, tagLine, region, platform) {
    try {
        // Logic to retrieve ranked data by Riot ID
        const account = await getAccountByRiotId(gameName, tagLine, region);
        const rankedData = await getRankedData(account.puuid, platform);
        return rankedData;
    } catch (error) {
        console.error('Error retrieving ranked data:', error);
        throw error;
    }
}

async function getMatchesByRiotId(gameName, tagLine, region) {
    try {
        // Logic to retrieve matches by Riot ID
        const account = await getAccountByRiotId(gameName, tagLine, region);
        const matchData = await getMatchData(account.puuid);
        return matchData;
    } catch (error) {
        console.error('Error retrieving match data:', error);
        throw error;
    }
}

module.exports = { getPlayer, getRankedDataByRiotId, getMatchesByRiotId };