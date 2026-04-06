const pool = require("../db/postgres");

exports.getMatchesByAccountId = async (id, region) => {
  const query = "SELECT * FROM matches WHERE puuid=$1 AND region=$2";
  const result = await pool.query(query, [id, region]);

  return result.rows[0];
};

exports.addMatches = async (id, region, matches) => {
  const query = `
  INSERT INTO matches (puuid, region, match_id)
  VALUES ($1, $2, $3)
  ON CONFLICT (match_id) DO NOTHING`;

  for (const matchId of matches) {
    await pool.query(query, [id, region, matchId]);
  }

  return this.getRecentMatches(id, region);
};

exports.getRecentMatches = async (id, region) => {
  const query = `
  SELECT match_id FROM matches WHERE puuid=$1 AND region=$2
  ORDER BY CAST(SPLIT_PART(match_id, '_', 2) AS BIGINT) DESC
  LIMIT 20`;

  return await pool.query(query, [id, region]);
};
