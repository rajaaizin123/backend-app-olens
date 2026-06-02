const express = require("express");
const Parser = require("rss-parser");
const axios = require("axios");
const pLimit = require("p-limit").default;
const { decodeGoogleNewsUrl } = require("./decoder");
const { scraping_tempo, scraping_tempo_for_cluster } = require("./scraping_tempo");
const { scraping_detik, scraping_detikCom_for_cluster, scraping_detikId_for_cluster } = require("./scraping_detik");
const { scraping_tribunnews, scraping_tribunnews_for_cluster } = require("./scraping_tribunnews");
const { scraping_kompas, scraping_kompas_for_cluster } = require("./scraping_kompas");
const { get_headlineNews_detik, get_PopularNews, get_latestNews_tribun, get_latestNews_kompas, get_latestNews_tempo, get_latestNews_detik } = require("./get_headline_news");
const { getAllLinkMedia_for_cluster, getDecodedLinks } = require('./scraping_raw_cluster');

const app = express();

app.use(express.json());

const parser = new Parser({
    customFields: {
        item: ["source"]
    }
});

const SOURCES = [
    '"tempo.co"',
    '"tribunnews.com"',
    '"kompas.com"',
    '"detikcom"'
];

const BASE_URL =
    "https://news.google.com/rss/search?hl=id&gl=ID&ceid=ID:id&q=";

const URL_SENTIMEN_ANALYZE = "https://aizinraja.pythonanywhere.com";

function getSource(item) {
    if (!item.source) return "";

    if (typeof item.source === "object") {
        return item.source?._ || item.source?.title || "";
    }

    return item.source;
}

// fetch RSS
async function fetchRSS(query) {
    const feed = await parser.parseURL(BASE_URL + query);

    return feed.items.slice(0, 2).map(item => ({
        title: item.title ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate ?? "",
        source: getSource(item)
    }));
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/", (req, res) => {
    return res.json({
        status: "success",
        message: "API backend jalan cuy!",
    });
});

// homepage endpoint
app.get("/homepage", async (req, res) => {
    console.log("Ada request masuk untuk: /homepage");

    const [data_headline, data_popular_news,
        data_latestNews_tribun, data_latestNews_kompas,
        data_latestNews_tempo, data_latestNews_detik] = await Promise.all([

            get_headlineNews_detik(),
            get_PopularNews(),
            get_latestNews_tribun(),
            get_latestNews_kompas(),
            get_latestNews_tempo(),
            get_latestNews_detik()
        ]);

    //const data_headline = await get_headlineNews_detik();
    //const data_popular_news = await get_PopularNews();

    return res.json({
        status: "success",
        message: "This is homepage bro!",
        data: {
            data_headline,
            data_popular_news,
            data_latestNews_tribun,
            data_latestNews_kompas,
            data_latestNews_tempo,
            data_latestNews_detik
        },
    });
});

// endpoint
app.get("/search", async (req, res) => {
    const q = req.query.q || "jokowi";

    try {
        // RSS
        const feeds = await Promise.all(
            SOURCES.map(src => fetchRSS(`${src} ${q}`))
        );

        const allItems = feeds.flat();

        // decode paralel
        const decoded = await Promise.all(
            allItems.map(async (item, i) => {
                await delay(i * 50); // rate limit

                const result = await decodeGoogleNewsUrl(item.link);

                return {
                    ...item,
                    url: result.status ? result.decodedUrl : item.link
                };
            })
        );

        res.json({
            query: q,
            total: decoded.length,
            results: decoded
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// scraping tempo
app.get("/scrapingTempo", async (req, res) => {
    try {
        const url = req.query.url;
        //console.log(url);

        if (!url) {
            return res.status(400).json({
                error: "Parameter url wajib",
            });
        }
        const data = await scraping_tempo(url);


        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// scraping detik
app.get("/scrapingDetik", async (req, res) => {
    console.log("Ada request masuk untuk: /ScrapingDetik")
    try {
        const url = req.query.url;
        //const source = req.query.source;

        if (!url) {
            return res.status(400).json({
                error: "Parameter url wajib",
            });
        }
        const data = await scraping_detik(url);
        //data.source = source;

        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// scraping tribunnews
app.get("/scrapingTribun", async (req, res) => {

    try {

        const url = req.query.url;

        const data =
            await scraping_tribunnews(url);

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message,
        });
    }
});

// scraping kompas
app.get("/scrapingKompas", async (req, res) => {
    console.log("ada request untuk: /scrapingKompas");
    try {

        let url = req.query.url;

        if (!url) {
            return res.status(400).json({
                error: "Parameter url wajib"
            });
        }

        if (url.includes("?")) {
            url += "&page=all";
        } else {
            url += "?page=all";
        }

        const data =
            await scraping_kompas(url);

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message,
        });
    }
});

// sentimen endpoint
app.post("/sentiment_analyze", async (req, res) => {
    console.log("Ada request untuk: /sentiment_analyze");

    const text = req.body.text;

    if (!text) {
        return res.status(400).json({
            success: false,
            message: "Field text wajib diisi"
        });
    }

    const response = await axios.post(
        URL_SENTIMEN_ANALYZE + "/analyze",
        {
            text: text
        },
        {
            headers: {
                "Content-Type":
                    "application/json"
            },

            timeout: 10000
        }

    );

    return res.json({
        success: true,
        data: response.data
    });

});

// bersiaplah ...
app.get("/tempo_summary_for_cluster", async (req, res) => {
    console.log("ada request masuk untuk: /tempo_summary_for_cluster");
    try {

        const limit = pLimit(5);
        // data 25 link media tempo
        const tempoLinks = await getDecodedLinks("tempo.co");

        const articles = await Promise.all(
            tempoLinks.map(item =>
                limit(() =>
                    scraping_tempo_for_cluster(item.link)
                )
            )
        );

        res.json({
            source: "tempo",
            total: articles.length,
            data: articles.map(a => ({
                ...a,
                source: "tempo"
            }))
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/tribun_summary_for_cluster", async (req, res) => {
    console.log("ada request masuk untuk: /tribun_summary_for_cluster");
    try {
        const limit = pLimit(5);
        // data 25 link
        const tempoLinks = await getDecodedLinks("tribunnews.com");

        const articles = await Promise.all(
            tempoLinks.map(item =>
                limit(() =>
                    scraping_tribunnews_for_cluster(item.link)
                )
            )
        );

        res.json({
            source: "tribunnews",
            total: articles.length,
            data: articles.map(a => ({
                ...a,
                source: "tribun"
            }))
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/detik_summary_for_cluster", async (req, res) => {
    console.log("ada request masuk untuk: /detik_summary_for_cluster");
    try {
        const limit = pLimit(5);
        // data 25 link
        const tempoLinks = await getDecodedLinks("detikNews");

        const articles = await Promise.all(
            tempoLinks.map(item =>
                limit(async () => {
                    const host_detik = new URL(item.link).hostname;

                    let scrapper;

                    if (host_detik === "news.detik.com") {
                        scraper = scraping_detikCom_for_cluster;
                    }
                    else if (host_detik === "detiknews.id") {
                        scraper = scraping_detikId_for_cluster;
                    }
                    else {
                        throw new Error(`hostname tak didukung: ${host_detik}`);
                    }

                    return await scraper(item.link);
                })
            )
        );

        res.json({
            source: "detik",
            total: articles.length,
            data: articles.map(a => ({
                ...a,
                source: "detik"
            }))
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/kompas_summary_for_cluster", async (req, res) => {
    console.log("ada request masuk untuk: /kompas_summary_for_cluster");
    try {
        const limit = pLimit(5);
        // data 25 link
        const tempoLinks = await getDecodedLinks("kompas.com");

        const articles = await Promise.all(
            tempoLinks.map(item =>
                limit(() =>
                    scraping_kompas_for_cluster(item.link)
                )
            )
        );

        res.json({
            source: "kompas",
            total: articles.length,
            data: articles.map(a => ({
                ...a,
                source: "kompas"
            }))
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


// server
app.listen(3000, () => {
    console.log("API jalan di http://localhost:3000");
});

