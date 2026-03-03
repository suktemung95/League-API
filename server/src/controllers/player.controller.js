const playerService = require("../services/player.service");
exports.getPlayerById = async (req, res) => {
    const { id } = req.params;
    const { platform } = req.query;

    const data = await playerService.getPlayerById(id, platform);
    res.json(data);
};