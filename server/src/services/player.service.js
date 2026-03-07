const playerRepo = require("../repositories/player.repository");
const playerApi = require("./riot/player.api");
const playerJobs = require('../jobs/player.jobs')

const redis = require('../cache/redis');

const { getPlayerCacheKey } = require('../utils/cacheKey.gen')

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

async function getPlayerById(id, region) {

    const cacheKey = getPlayerCacheKey(id, region)

    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const player = await playerRepo.getPlayerById(id, region)

    if (!player) {

        playerJobs.schedulePlayerAdd(id, region)
        return null
    }

    const lastUpdated = new Date(player.updated_at).getTime()
    const isStale = Date.now() - lastUpdated > ONE_HOUR

    if (isStale) {

        playerJobs.schedulePlayerRefresh(id, region)
    }

    await redis.set(cacheKey, JSON.stringify(player), { EX: 3600 })

    return player
}

async function refreshPlayerById(id, region) {

    const cacheKey = getPlayerCacheKey(id, region)

    const player = await playerApi.getPlayerById(id, region)
    const updatedPlayer = await playerRepo.refreshPlayer(player, region)
    await redis.set(cacheKey, JSON.stringify(updatedPlayer), { EX: 3600 });
    return updatedPlayer
}

module.exports = { getPlayerById, refreshPlayerById };