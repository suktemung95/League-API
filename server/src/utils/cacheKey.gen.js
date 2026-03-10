exports.getPlayerCacheKey = (id, region) => `player:${id}:${region}`;
exports.getMatchesCacheKey = (id, region) => `matches:${id}:${region}`;