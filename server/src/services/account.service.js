const accountRepo = require("../repositories/account.repository");
const accountApi = require("./riot/account.api");
const mapper = require("../utils/mapper");

async function getAccountByUser(name, tag, region) {
  let account = await accountRepo.getAccountByUser(name, tag);

  if (!account) {
    account = await accountApi.getAccountByUser(name, tag, region);
    await accountRepo.addAccount({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      region,
    });
  }

  return account;
}

async function getAccountById(id, platform) {
  let account = await accountRepo.getAccountById(id, mapper.toRegion(platform));

  if (!account) {
    account = await accountApi.getAccountById(id, mapper.toRegion(platform));
    await accountRepo.addAccount({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      region: mapper.toRegion(platform),
    });
  }

  return account;
}

module.exports = { getAccountByUser, getAccountById };