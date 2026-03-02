const express = require("express");
const router = express.Router();

const db = require("../db/postgres");

router.get("/db-test", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
