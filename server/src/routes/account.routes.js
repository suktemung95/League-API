const express = require('express')
const router = express.Router()

const { getAccountByUser } = require('../controllers/account.controller')

router.get('/:gameName/:tagLine', getAccountByUser)

module.exports = router