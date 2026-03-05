const { Queue } = require('bullmq');

const connection = {
    host: process.env.REDIS_HOST,
    port: 6379
}

const riotQueue = new Queue('riotQueue', { connection })

module.exports = riotQueue