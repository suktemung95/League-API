const express = require('express')
const router = express.Router()

const { getMatchByMatchId } = require('../controllers/match.controller')

router.get('/:matchId', getMatchByMatchId)
module.exports = router