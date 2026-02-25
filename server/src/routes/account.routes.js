const express = require('express')
const router = express.Router()

const { getAccountByRiotId } = require('../controllers/account.controller')

router.get('/:gameName/:tagLine', getAccountByRiotId)

module.exports = router