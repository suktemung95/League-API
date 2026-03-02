const pool = require("../db/postgres");

exports.getByRiotId = async (gameName, tagLine) => {
  const result = await pool.query(
    "SELECT * FROM accounts WHERE game_name=$1 AND tag_line=$2",
    [gameName, tagLine],
  );

  return result.rows[0];
};

exports.addAccount = async (account) => {
  const { puuid, gameName, tagLine, region } = account;

  const query = `
        INSERT INTO accounts (puuid, game_name, tag_line, region)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (puuid) DO NOTHING
        RETURNING *
    `;

  const values = [puuid, gameName, tagLine, region];

  const result = await pool.query(query, values);

  return result.rows[0];
};
