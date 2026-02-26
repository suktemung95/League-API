const express = require('express')
const router = express.Router()

const { getPlayer, getRankedDataByRiotId, getMatchesByRiotId, getMatchByMatchId } = require('../controllers/player.controller')

router.get('/:id', getPlayer)
router.get('/:gameName/:tagLine/ranked', getRankedDataByRiotId)
router.get('/:gameName/:tagLine/matches', getMatchesByRiotId)
module.exports = router