const playerRepo = require("../repositories/player.repository");
const playerApi = require("./riot/player.api");

const redis = require('../cache/redis')

async function getPlayerById(id, region) {

    // 1. Check redis
    const cacheKey = `player:${region}:${id}`;
    const cachedPlayer = await redis.get(cacheKey);

    if (cachedPlayer) {
        return JSON.parse(cachedPlayer);
    }

    // 2. Check database
    let player = await playerRepo.getPlayerById(id, region);

    // 3. If not found, fetch from Riot API
    const playerData = player;
    if (!player) {
        player = await playerApi.getPlayerById(id, region);

        // 4. Save to database
        await playerRepo.addPlayer(player, region);
    }

    // 5. Save to Redis cache
    await redis.set(cacheKey, JSON.stringify(player), { EX: 3600 });

    return player;
}

module.exports = { getPlayerById };