const playerRepo = require("../repositories/player.repository");
const playerApi = require("./riot/player.api");

const riotQueue = require('../queues/riot.queue');

const redis = require('../cache/redis');

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

async function getPlayerById(id, region) {

    const cacheKey = `player:${region}:${id}`

    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const player = await playerRepo.getPlayerById(id, region)

    if (!player) {

        await riotQueue.add(
            'add-player',
            { id, region },
            { jobId: `player:add:${id}:${region}` }
        )

        return null
    }

    const lastUpdated = new Date(player.updated_at).getTime()
    const isStale = Date.now() - lastUpdated > ONE_HOUR

    if (isStale) {

        await riotQueue.add(
            'refresh-player',
            { id, region },
            { jobId: `player:refresh:${id}:${region}` }
        )

    }

    await redis.set(cacheKey, JSON.stringify(player), { EX: 3600 })

    return player
}

async function refreshPlayerById(id, region) {

    const cacheKey = `player:${region}:${id}`;

    const player = await playerApi.getPlayerById(id, region)
    const updatedPlayer = await playerRepo.refreshPlayer(player, region)
    await redis.set(cacheKey, JSON.stringify(updatedPlayer), { EX: 3600 });
    return updatedPlayer
}

async function schedulePlayerRefresh(id, region) {
    await riotQueue.add(
        'refresh-player',
        { id, region },
        {
            jobId: `player:refresh:${id}:${region}`,
            attempts: 3
        });
}
module.exports = { getPlayerById, refreshPlayerById, schedulePlayerRefresh };