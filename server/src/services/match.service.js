const { getMatchesCacheKey } = require("../utils/cacheKeys");

const matchRepo = require("../repositories/match.repository");
const matchJobs = require('../jobs/match.jobs')

async function getMatchesByAccountId(id, region) {

    const cacheKey = getMatchesCacheKey(id, region);

    // Check cache first
    const cachedData = await cache.get(cacheKey);

    if (cachedData) return JSON.parse(cachedData);

    const matches = await matchRepo.getMatchesByAccountId(id, region)

    if (!matches) {
        matchJobs.scheduleMatchesAdd(id, region)
        return null
    }

    refresher.refreshIfStale(matches, () => matchJobs.scheduleMatchesRefresh(id, region))

    await cache.set(cacheKey, JSON.stringify(matches), { EX: 3600 })

    return matches
}

module.exports = { getMatchesByAccountId }