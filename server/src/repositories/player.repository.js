const pool = require("../db/postgres");

exports.getPlayerById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM players WHERE puuid=$1",
        [id]
    )

    return result.rows[0];
}

exports.addPlayer = async (playerData, region) => {
    const { puuid, profileIconId, summonerLevel, revisionDate } = playerData

    const result = await pool.query(
        `
        INSERT INTO players (puuid, region, profile_icon_id, summoner_level, revision_date)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (puuid) DO NOTHING
        RETURNING *
    `, [puuid, region, profileIconId, summonerLevel, revisionDate]
    )

    return result.rows[0];
}

exports.refreshPlayer = async (playerData, region) => {
    const { puuid, profileIconId, summonerLevel, revisionDate } = playerData

    const result = await pool.query(
        `
        UPDATE players
        SET profile_icon_id = $2, summoner_level = $3, revision_date = $4, updated_at = NOW()
        WHERE puuid = $1 AND region = $5
        RETURNING *
    `, [puuid, profileIconId, summonerLevel, revisionDate, region]
    )

    return result.rows[0];
}