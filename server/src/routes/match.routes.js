const express = require("express");
const router = express.Router();

const {
  getMatchesByAccountId,
  getMatchesByUser,
} = require("../controllers/match.controller");

router.get("/by-account/:id", getMatchesByAccountId);
router.get("/by-user/:gameName/:tagLine", getMatchesByUser);

module.exports = router;
