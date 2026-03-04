const accountRepo = require("../repositories/account.repository");
const accountApi = require("./riot/account.api");
const mapper = require("../utils/mapper");

const redis = require('../cache/redis')

async function getAccountByUser(name, tag, region) {

  // 1. Check redis
  const cacheKey = `account:${region}:${name}:${tag}`;
  const cachedAccount = await redis.get(cacheKey);

  if (cachedAccount) {
    return JSON.parse(cachedAccount);
  }

  // 2. Check database
  let account = await accountRepo.getAccountByUser(name, tag);

  // 3. If not found, fetch from Riot API
  if (!account) {
    account = await accountApi.getAccountByUser(name, tag, region);

    // 4. Save to database
    await accountRepo.addAccount({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      region,
    });
  }

  // 5. Save to Redis cache
  await redis.set(cacheKey, JSON.stringify(account), { EX: 3600 });

  return account;
}

async function getAccountById(id, platform) {

  const region = mapper.toRegion(platform)

  // 1. Check redis
  const cacheKey = `account:${region}:${id}`;
  const cachedAccount = await redis.get(cacheKey);

  if (cachedAccount) {
    return JSON.parse(cachedAccount);
  }

  // 2. Check database
  let account = await accountRepo.getAccountById(id, mapper.toRegion(platform));

  // 3. If not found, fetch from Riot API
  if (!account) {
    account = await accountApi.getAccountById(id, mapper.toRegion(platform));

    // 4. Save to database
    await accountRepo.addAccount({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      region: mapper.toRegion(platform),
    });
  }

  // 5. Save to Redis cache
  await redis.set(cacheKey, JSON.stringify(account), { EX: 3600 });

  return account;
}

module.exports = { getAccountByUser, getAccountById };