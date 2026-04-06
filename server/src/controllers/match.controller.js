const matchService = require("../services/match.service");
const accountService = require("../services/account.service");
exports.getMatchesByAccountId = async (req, res) => {
  try {
    const { id } = req.params;
    const { region } = req.query;
    const result = await matchService.getMatchesByAccountId(id, region);
    const matches = result.rows;
    res.json(matches.map((m) => m.match_id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchesByUser = async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const { region } = req.query;

    const account = await accountService.getAccountByUser(
      gameName,
      tagLine,
      region,
    );
    const result = await matchService.getMatchesByAccountId(
      account.puuid,
      region,
    );
    const matches = result.rows;
    res.json(matches.map((m) => m.match_id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
