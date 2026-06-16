const axios = require("axios");
const cheerio = require("cheerio");

const today = new Date().toISOString().split("T")[0];

const URL_KOMPAS_POPULER =
    `https://indeks.kompas.com/terpopuler?site=news&date=${today}`;

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

module.exports = {
    get_popular_page_kompas
};