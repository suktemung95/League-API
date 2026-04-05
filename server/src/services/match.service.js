const { getMatchesCacheKey } = require("../utils/cacheKeys");

const matchRepo = require("../repositories/match.repository");
const matchJobs = require("../jobs/match.jobs");

const accountService = require("./account.service");

async function getMatchesByAccountId(id, region) {
  const cacheKey = getMatchesCacheKey(id, region);

  // Check cache first
  const cachedData = await cache.get(cacheKey);

  if (cachedData) return JSON.parse(cachedData);

  const matches = await matchRepo.getMatchesByAccountId(id, region);

  if (!matches) {
    matchJobs.scheduleMatchesAdd(id, region);
    return null;
  }

  refresher.refreshIfStale(matches, () =>
    matchJobs.scheduleMatchesRefresh(id, region),
  );

  await cache.set(cacheKey, JSON.stringify(matches), { EX: 3600 });

  return matches;
}

async function getMatchesByUser(gameName, tagLine, region) {
  // get puuid from account
  const account = accountService.getAccountByUser(gameName, tagLine, region);

  const puuid = account.puuid;

  return getMatchesByAccountId(puuid, region);
}
module.exports = { getMatchesByAccountId, getMatchesByUser };
