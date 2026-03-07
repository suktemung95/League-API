async function schedulePlayerRefresh(id, region) {
    const job = await riotQueue.add(
        'refresh-player',
        { id, region },
        {
            jobId: `player_refresh_${id}_${region}`,
            removeOnComplete: true,
            removeOnFail: true,
            attempts: 3
        });

    console.log('Player Refresh Job added:', job.id)
}

module.exports = { schedulePlayerRefresh };