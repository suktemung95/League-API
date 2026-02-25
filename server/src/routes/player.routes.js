const express = require('express')
const router = express.Router()

const { getPlayer, getRankedDataByRiotId } = require('../controllers/player.controller')

router.get('/:id', getPlayer)
router.get('/:gameName/:tagLine/ranked', getRankedDataByRiotId)

module.exports = router