require('dotenv').config()

const playerRepo = require('../repositories/player.repository')
const playerJobs = require('../jobs/player.jobs')

async function scheduleRefresh() {

    console.log("Scheduler running at:", new Date())

    const players = await playerRepo.getPlayersNeedingRefresh()

    console.log("Players needing refresh:", players.length)

    for (const player of players) {
        await playerJobs.schedulePlayerRefresh(player.puuid, player.region)
    }

}

scheduleRefresh()
setInterval(scheduleRefresh, 60 * 60 * 1000)