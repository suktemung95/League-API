const express = require('express')
const router = express.Router()

const { getPlayerById } = require('../controllers/player.controller')

router.get('/:id', getPlayerById)
module.exports = router