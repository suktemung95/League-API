require('dotenv').config()
const { Queue } = require('bullmq');

const connection = {
    host: process.env.REDIS_HOST,
    port: 6379
}

const riotQueue = new Queue('riotQueue', { connection })

console.log("Riot Queue booting on host:", process.env.REDIS_HOST)

module.exports = riotQueue