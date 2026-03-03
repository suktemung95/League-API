const playerRepo = require("../repositories/player.repository");
const playerApi = require("./riot/player.api");
const accountService = require("./account.service");

async function getPlayerById(id, region) {
    let player = await playerRepo.getPlayerById(id, region);

    if (player) {
        return player;
    }

    const account = await accountService.getAccountById(id, region);
    const playerData = await playerApi.getPlayerById(account.puuid, region);
    await playerRepo.addPlayer(playerData, region);

    return playerData;
}

module.exports = { getPlayerById };