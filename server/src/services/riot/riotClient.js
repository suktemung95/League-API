const axios = require('axios')
require('dotenv').config()

const RIOT_API_KEY = process.env.RIOT_API_KEY


const riotClient = axios.create({
    timeout: 5000,
    headers: {
        'X-Riot-Token': RIOT_API_KEY
    }
})

async function riotGet(path, region) {
    const url = `https://${region}.api.riotgames.com${path}`
    console.log('Logging URL', url)
    const response = await riotClient.get(url)
    console.log('Success')

    return response.data
}

module.exports = riotGet