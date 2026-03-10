const matchService = require("../services/match.service")

exports.getMatchesByAccountId = async (req, res) => {
    try {
        const { id } = req.params;
        const { region } = req.query
        const data = await matchService.getMatchesByAccountId(id, region);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}