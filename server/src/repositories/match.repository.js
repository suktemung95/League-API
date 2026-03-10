const pool = require("../db/postgres")

exports.getMatchesById = async (id, region) => {
    const query = "SELECT * FROM matches WHERE puuid=$1 AND region=$2"
    const result = await pool.query(query, [id, region])

    return result.rows[0]
}