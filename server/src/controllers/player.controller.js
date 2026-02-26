const rankedService = require('../services/riot/ranked.api')
const matchService = require('../services/riot/match.api')

exports.getPlayer = async (req, res) => {
    const { id } = req.params

    res.json({
        playerId: id,
        message: "Player endpoint working"
    })
}

exports.getRankedDataByRiotId = async (req, res) => {

    const { gameName, tagLine } = req.params
    const { region, platform } = req.query

    const data = await rankedService.getRankedDataByRiotId(gameName, tagLine, region, platform)

    res.json(data)
}

exports.getMatchesByRiotId = async (req, res) => {

    const { gameName, tagLine } = req.params
    const { region, platform } = req.query

    const data = await matchService.getMatchesByRiotId(gameName, tagLine, region)

    res.json(data)
}