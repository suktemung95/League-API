const { getMatchesCacheKey } = require("../utils/cacheKey.gen");

const matchRepo = require("../repositories/match.repository");
const matchJobs = require("../jobs/match.jobs");

const redis = require("../cache/redis");

async function getMatchesByAccountId(id, region) {
  const cacheKey = getMatchesCacheKey(id, region);

  // Check cache first
  const cachedData = await redis.get(cacheKey);

  if (cachedData) return JSON.parse(cachedData);

  const matches = await matchRepo.getMatchesByAccountId(id, region);

  if (!matches) {
    matchJobs.scheduleMatchesAdd(id, region);
    return "No matches in DB, scheduling get matches job";
  }

  await cache.set(cacheKey, JSON.stringify(matches), { EX: 3600 });

  return matches;
}

module.exports = { getMatchesByAccountId };
