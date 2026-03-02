const accountService = require("../services/account.service");

exports.getAccountByRiotId = async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const { region } = req.query;

    const data = await accountService.getAccountByRiotId(
      gameName,
      tagLine,
      region,
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
