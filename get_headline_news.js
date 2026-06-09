const axios = require("axios");
const cheerio = require("cheerio");

const url_home_detik = "https://news.detik.com";
const url_popularNews_detik = "https://www.detik.com/terpopuler";
const url_home_tribun = "https://www.tribunnews.com";
const url_home_kompas = "https://www.kompas.com";
const url_home_tempo = "https://tempo.co";
const url_latest_tempo = "https://www.tempo.co/indeks?page=1&access=FREE&format_article_id=1";
const url_latest_detik = "https://news.detik.com/indeks";

async function get_headlineNews_detik() {
    const { data } = await axios.get(url_home_detik, {
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

    const title = $(".headline .media__title")
        .first()
        .text()
        .trim();

    const pubDate = $(".headline .media__date").first().text().trim();


    let image = $(".headline .media__image img")
        .first()
        .attr("src");

    const link = $(".headline .media__link").first().attr("href");

    const source = "detik";

    return {
        title,
        pubDate,
        image,
        link,
        source
    }
}

async function get_PopularNews() {
    const { data } = await axios.get(url_popularNews_detik, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
    });

    const $ = cheerio.load(data);

    const data_popular_news = [];


    $(".grid-row.list-content").first().find("article.list-content__item").each((i, el) => {

        if (data_popular_news.length >= 3) return false;

        const title = $(el)
            .find(".media__title")
            .text()
            .trim();

        const link = $(el)
            .find(".media__title a")
            .attr("href");

        const image = $(el)
            .find(".media__image img")
            .attr("src");

        const pubDate = $(el)
            .find(".media__date")
            .text()
            .trim();

        const source = "detik";

        if (!title) return;

        data_popular_news.push({
            id: i + 1,
            title,
            link,
            source,
            image,
            pubDate,
        });
    });

    return data_popular_news;

}

async function get_latestNews_tribun() {
    const { data } = await axios.get(url_home_tribun, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
    });

    const $ = cheerio.load(data);

    const latest_news = [];
    const source = "tribun";

    $("#latesthome")
        .find(".listicle.pos_rel.bdr")
        .each((i, el) => {

            // 4 berita
            if (latest_news.length >= 4) {
                return false;
            }

            const title = $(el)
                .find("h3 a")
                .text()
                .trim();

            let link = $(el)
                .find("h3 a")
                .attr("href");

            // karena link tribun kadang relative
            if (link && !link.startsWith("http")) {
                link = "https://www.tribunnews.com/" + link;
            }

            const image = $(el)
                .find("img")
                .attr("src");

            const pubDate = $(el)
                .find("time")
                .text()
                .trim();

            if (!title) return;

            latest_news.push({
                id: i + 1,
                title,
                link,
                source,
                image,
                pubDate,
            });
        });

    return latest_news;
}

async function get_latestNews_kompas() {
    const { data } = await axios.get(url_home_kompas, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
    });

    const $ = cheerio.load(data);

    const latest_news = [];
    const source = "kompas";

    $(".wSpec-list .wSpec-item").each((i, el) => {

        // 4 berita
        if (latest_news.length >= 4) {
            return false;
        }

        const title = $(el)
            .find("h4.wSpec-title")
            .clone()
            .children(".wSpec-badge")
            .remove()
            .end()
            .text()
            .trim();

        let link = $(el)
            .find("a")
            .attr("href");

        if (link && link.startsWith("/")) {
            link = baseUrl + link;
        }

        const image =
            $(el).find(".wSpec-img img").attr("src") ||
            $(el).find(".wSpec-img img").attr("data-src");

        const pubDate = $(el)
            .find(".wSpec-subtitle span")
            .text()
            .trim();

        if (!title || !link) return;

        latest_news.push({
            id: i + 1,
            title,
            link,
            source,
            image,
            pubDate,
        });
    });

    return latest_news;
}

async function get_latestNews_tempo() {
    const response = await axios.post(
        "https://www.tempo.co/api/search/articles",
        {
            "q": "",
            "offset": 0,
            "limit": 4,
            "filter": "access = \"FREE\" AND format_article_id = 1 AND domain.domain = \"www.tempo.co\"",
            "sort": ["unix_published_at:desc"],
            "attributesToSearchOn": ["title_digital"]
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

    return response.data.hits.map((item, index) => ({
        id: index + 1,
        title: item.title_digital,
        link: `https://www.tempo.co/${item.canonical_url}`,
        source: "tempo",
        image: item.feature_image,
        pubDate: item.published_at,
    }));
}

async function get_latestNews_detik() {
    const { data } = await axios.get(url_latest_detik, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
    });

    const $ = cheerio.load(data);

    const latest_news = [];
    const source = "detik";

    $("article.list-content__item").each((i, el) => {

        if (latest_news.length >= 4) {
            return false;
        }

        const aTitle = $(el).find("h3.media__title a");

        const title = aTitle.text().trim();
        const link = aTitle.attr("href");

        const image = $(el)
            .find(".media__image img")
            .attr("src");

        const pubDate = $(el)
            .find(".media__date span")
            .text()
            .trim();

        if (!title || !link) return;

        latest_news.push({
            id: latest_news.length + 1,
            title,
            link,
            source: "detik",
            image,
            pubDate,
        });
    });

    return latest_news;
}


module.exports = {
    get_headlineNews_detik,
    get_PopularNews,
    get_latestNews_tribun,
    get_latestNews_kompas,
    get_latestNews_tempo,
    get_latestNews_detik
}