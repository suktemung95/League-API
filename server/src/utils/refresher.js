const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

exports.refreshIfStale = async (item, refreshFunction) => {
    const lastUpdated = new Date(item.updated_at).getTime()
    const isStale = Date.now() - lastUpdated > ONE_HOUR

    if (isStale) refreshFunction(id, region)
}