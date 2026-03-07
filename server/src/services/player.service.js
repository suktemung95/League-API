const playerRepo = require("../repositories/player.repository");
const playerApi = require("./riot/player.api");

const riotQueue = require('../queues/riot.queue');

const redis = require('../cache/redis');

const { getPlayerCacheKey } = require('../utils/cacheKey.gen')

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

async function getPlayerById(id, region) {

    const cacheKey = getPlayerCacheKey(id, region)

    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const player = await playerRepo.getPlayerById(id, region)

    if (!player) {

        const job = await riotQueue.add(
            'add-player',
            { id, region },
            {
                jobId: `player_add_${id}_${region}`,
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 3
            }

        )

        console.log('Add Player Job added:', job.id)
        return null
    }

    const lastUpdated = new Date(player.updated_at).getTime()
    const isStale = Date.now() - lastUpdated > ONE_HOUR

    if (isStale) {

        const job = await riotQueue.add(
            'refresh-player',
            { id, region },
            {
                jobId: `player_refresh_${id}_${region}`,
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 3
            }
        )
        console.log('Player data is stale. Refresh job added:', job.id)
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