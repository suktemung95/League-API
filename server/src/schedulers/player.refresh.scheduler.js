const riotQueue = require('../queues/riot.queue')
const playerRepo = require('../repositories/player.repository')

async function scheduleRefresh() {

    const players = await playerRepo.getPlayersNeedingRefresh()

    for (const player of players) {

        await riotQueue.add(
            'refresh-player',
            { id: player.puuid, region: player.region },
            { jobId: `player:refresh:${player.puuid}:${player.region}` }
        )

    }

}

setInterval(scheduleRefresh, 60 * 60 * 1000)