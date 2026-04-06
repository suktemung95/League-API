const riotQueue = require("../queues/riot.queue");

async function scheduleMatchesAdd(id, region) {
  const job = await riotQueue.add(
    "add-matches",
    { id, region },
    {
      jobId: `matches_add_${id}_${region}`,
      removeOnComplete: true,
      removeOnFail: true,
      attempts: 3,
    },
  );

  console.log("Add Matches Job added:", job.id);
}

module.exports = { scheduleMatchesAdd };
