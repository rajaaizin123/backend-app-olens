const axios = require("axios");
const cheerio = require("cheerio");
const Parser = require("rss-parser");
const pLimit = require("p-limit");
const { decodeGoogleNewsUrl } = require("./decoder");

const parser = new Parser();

const BASE_URL_RSS =
    "https://news.google.com/rss/search?hl=id&gl=ID&ceid=ID:id&q=";

async function getMediaLink(media_domain) {
    const feed = await parser.parseURL(
        BASE_URL_RSS + `"${media_domain}"`
    );

    return feed.items.slice(0, 25).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: media_domain
    }));
}

async function getAllLinkMedia_for_cluster() {
    const [tempo, tribun, kompas, detik] = await Promise.all([
        getMediaLink("tempo.co"),
        getMediaLink("tribunnews.com"),
        getMediaLink("kompas.com"),
        getMediaLink("detikNews")
    ]);

    const allItems = [
        ...tempo,
        ...tribun,
        ...kompas,
        ...detik
    ];

    const decodedItems = await Promise.all(
        allItems.map(async (item) => {
            try {
                const result = await decodeGoogleNewsUrl(item.link);

                return {
                    ...item,
                    link: result.status
                        ? result.decodedUrl
                        : item.link
                };
            } catch (err) {
                return item;
            }
        })
    );

    return {
        "tempo.co": decodedItems.filter(
            item => item.source === "tempo.co"
        ),
        "tribunnews.com": decodedItems.filter(
            item => item.source === "tribunnews.com"
        ),
        "kompas.com": decodedItems.filter(
            item => item.source === "kompas.com"
        ),
        "detikNews": decodedItems.filter(
            item => item.source === "detikNews"
        )
    };
}

// fungsi untuk mendapatkan 25 link per media yang sudah di decoded
async function getDecodedLinks(media_domain) {

    const links = await getMediaLink(media_domain);

    return Promise.all(
        links.map(async (item) => {
            try {

                const result =
                    await decodeGoogleNewsUrl(item.link);

                return {
                    ...item,
                    link: result.status
                        ? result.decodedUrl
                        : item.link
                };

            } catch (err) {

                return item;
            }
        })
    );
}

module.exports = {
    getAllLinkMedia_for_cluster,
    getDecodedLinks
};