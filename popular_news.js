const axios = require("axios");
const cheerio = require("cheerio");
const { formatRelativeTime } = require("./helper");

const today = new Date().toISOString().split("T")[0];

const URL_KOMPAS_POPULER =
    `https://indeks.kompas.com/terpopuler?site=news&date=${today}`;

const URL_DETIK_POPULER = "https://www.detik.com/terpopuler";

const URL_TRIBUN_POPULER = "https://www.tribunnews.com/populer/?section=&type=12h";

async function get_popular_page_kompas() {
    const { data } = await axios.get(URL_KOMPAS_POPULER, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",

            "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

            "Accept-Language":
                "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",

            "Referer":
                "https://www.google.com/",

            "Cache-Control":
                "no-cache",

            "Pragma":
                "no-cache",
        },
    });

    const $ = cheerio.load(data);

    const articles = [];

    $(".articleList.-list .articleItem").each((i, el) => {
        if (i >= 6) return false;

        const item = $(el);

        articles.push({
            title: item.find(".articleTitle").text().trim(),
            link: item.find("a.article-link").attr("href") || "",
            image: item.find(".articleItem-img img").attr("src") || "",
            //category: item.find(".articlePost-subtitle").text().trim(),
            source: "kompas",
            pubDate: item.find(".articlePost-date").text().trim(),
        });
    });

    return {
        source: "kompas",
        total: articles.length,
        data: articles,
    };

}

async function get_popular_page_tempo() {
    const response = await axios.post(
        "https://www.tempo.co/api/search/articles",
        {
            q: "",
            offset: 0,
            limit: 6,
            filter: 'access = "FREE" AND content_category = "trending" AND domain.domain = "www.tempo.co"',
            sort: ["unix_published_at:desc"],
            attributesToSearchOn: ["title_digital"]
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Origin": "https://www.tempo.co",
                "Referer": "https://www.tempo.co/",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
                "Accept": "application/json"
            }
        }
    );

    const articles = response.data.hits.map((item, index) => ({
        id: index + 1,
        title: item.title_digital,
        link: `https://www.tempo.co/${item.canonical_url}`,
        source: "tempo",
        image: item.feature_image,
        pubDate: formatRelativeTime(item.published_at),
    }));

    return {
        source: "tempo",
        total: articles.length,
        data: articles
    };
}

async function get_popular_page_detik() {
    const { data } = await axios.get(URL_DETIK_POPULER, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
    });

    const $ = cheerio.load(data);

    const articles = [];

    $(".grid-row.list-content")
        .first()
        .find("article.list-content__item")
        .each((i, el) => {

            if (articles.length >= 6) return false;

            const title = $(el)
                .find(".media__title")
                .text()
                .trim();

            if (!title) return;

            articles.push({
                id: i + 1,
                title,
                link: $(el)
                    .find(".media__title a")
                    .attr("href"),
                source: "detik",
                image: $(el)
                    .find(".media__image img")
                    .attr("src"),
                pubDate: $(el)
                    .find(".media__date")
                    .text()
                    .trim(),
            });
        });

    return {
        source: "detik",
        total: articles.length,
        data: articles
    };
}

async function get_popular_page_tribun() {

    const { data } = await axios.get(URL_TRIBUN_POPULER, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",

            "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

            "Accept-Language":
                "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",

            "Referer":
                "https://www.google.com/",

            "Cache-Control":
                "no-cache",

            "Pragma":
                "no-cache",
        },
    });

    const $ = cheerio.load(data);

    const articles = [];

    $(".lsi li").each((i, el) => {

        if (articles.length >= 6) return false;

        const title = $(el)
            .find("h3 a")
            .text()
            .trim();

        if (!title) return;

        articles.push({
            id: articles.length + 1,
            title,
            link: $(el)
                .find("h3 a")
                .attr("href") || "",
            source: "tribun",
            image: $(el)
                .find("img")
                .attr("src") || "",
            pubDate: $(el)
                .find("time")
                .text()
                .trim(),
        });
    });

    return {
        source: "tribun",
        total: articles.length,
        data: articles
    };
}

module.exports = {
    get_popular_page_kompas,
    get_popular_page_tempo,
    get_popular_page_detik,
    get_popular_page_tribun
};