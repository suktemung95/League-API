const accountRepo = require("../repositories/account.repository");
const accountApi = require("./riot/account.api");

async function getAccountByRiotId(name, tag, region) {
  let account = await accountRepo.getByRiotId(name, tag);

  if (!account) {
    account = await accountApi.getAccountByRiotId(name, tag, region);
    await accountRepo.addAccount({
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      region,
    });
  }

  return account;
}

module.exports = { getAccountByRiotId };
