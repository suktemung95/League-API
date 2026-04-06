require("dotenv").config();

const { Worker } = require("bullmq");

const playerService = require("../services/player.service");
const playerRepo = require("../repositories/player.repository");
const playerApi = require("../services/riot/player.api");

const matchServices = require("../services/match.service");
const matchRepo = require("../repositories/match.repository");
const matchApi = require("../services/riot/match.api");
const redis = require("../cache/redis");

const {
  getPlayerCacheKey,
  getMatchesCacheKey,
} = require("../utils/cacheKey.gen");

const connection = {
  host: process.env.REDIS_HOST,
  port: 6379,
};

console.log("Worker Redis host:", process.env.REDIS_HOST);
console.log("Worker booting...");

const worker = new Worker(
  "riotQueue",
  async (job) => {
    console.log("Processing job:", job.name);
    console.log("Data:", job.data);

    if (job.name === "refresh-player") {
      return playerService.refreshPlayerById(job.data.id, job.data.region);
    }

    if (job.name === "add-player") {
      const player = await playerApi.getPlayerById(
        job.data.id,
        job.data.region,
      );

      const newPlayer = await playerRepo.addPlayer(player, job.data.region);

      const cacheKey = getPlayerCacheKey(job.data.id, job.data.region);

      await redis.set(cacheKey, JSON.stringify(newPlayer), { EX: 3600 });

      return newPlayer;
    }

    if (job.name === "add-matches") {
      const matches = await matchApi.getMatchesById(
        job.data.id,
        job.data.region,
      );

      const newMatches = await matchRepo.addMatches(
        job.data.id,
        job.data.region,
        matches,
      );

      const cacheKey = getMatchesCacheKey(job.data.id, job.data.region);

      await redis.set(cacheKey, JSON.stringify(newMatches), { EX: 3600 });

      return newMatches;
    }
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 18,
      duration: 1000,
    },
  },
);

worker.on("ready", () => {
  console.log("Worker ready");
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

worker.on("active", (job) => {
  console.log("Job started:", job.name, job.id);
});

worker.on("completed", (job) => {
  console.log(`Player refresh completed for job ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error("Player refresh failed", err);
});
