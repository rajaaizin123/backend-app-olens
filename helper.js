function formatRelativeTime(dateString) {
    // tempo pubDate error
    const fixedDate = dateString.replace("Z", "+07:00");

    const published = new Date(fixedDate).getTime();
    const now = Date.now();

    const diffMinutes = Math.floor((now - published) / 60000);

    if (diffMinutes < 60) {
        return `${diffMinutes} menit lalu`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
        return `${diffHours} jam lalu`;
    }

    return `${Math.floor(diffHours / 24)} hari lalu`;
}

module.exports = {
    formatRelativeTime
}