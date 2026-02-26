const matchService = require('../services/riot/match.api')

exports.getMatchByMatchId = async (req, res) => {

    const { matchId } = req.params
    const { region, platform } = req.query

    const data = await matchService.getMatchByMatchId(matchId, region)

    res.json(data)
}