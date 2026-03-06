require('dotenv').config()

const riotQueue = require('../queues/riot.queue')
const playerRepo = require('../repositories/player.repository')

async function scheduleRefresh() {

    console.log("Scheduler running at:", new Date())

    const players = await playerRepo.getPlayersNeedingRefresh()

    console.log("Players needing refresh:", players.length)

    for (const player of players) {

        const job = await riotQueue.add(
            'refresh-player',
            { id: player.puuid, region: player.region },
            {
                jobId: `player_refresh_${player.puuid}_${player.region}`,
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 3
            }
        )

        console.log(`Job added: ${job.id}`)
    }

}

scheduleRefresh()
setInterval(scheduleRefresh, 60 * 60 * 1000)