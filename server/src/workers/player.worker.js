const { Worker } = require('bullmq')
const playerService = require('../services/player.service')
const playerRepo = require('../repositories/player.repository')
const playerApi = require('./riot/player.api')

const connection = {
    host: process.env.REDIS_HOST,
    port: 6379
}

const worker = new Worker(
    "riotQueue",
    async job => {
        if (job.name === 'refresh-player') {
            return playerService.refreshPlayerById(
                job.data.id,
                job.data.region
            )
        }

        if (job.name === 'add-player') {
            const player = await playerApi.getPlayerById(job.data.id, job.data.region);

            const newPlayer = await playerRepo.addPlayer(player, job.data.region);

            const cacheKey = `player:${job.data.region}:${job.data.id}`;

            await redis.set(cacheKey, JSON.stringify(newPlayer), { EX: 3600 })

            return newPlayer
        }
    },
    {
        connection,
        limiter: {
            max: 18,
            duration: 1000
        }
    }
)

worker.on("completed", (job) => {
    console.log(`Player refresh completed for job ${job.id}`)
})

worker.on('failed', (job, err) => {
    console.error("Player refresh failed", err)
})