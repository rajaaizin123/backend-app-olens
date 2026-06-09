const axios = require("axios");
const cheerio = require("cheerio");

async function scraping_kompas(url) {

    const { data } = await axios.get(url, {
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

    // ======================
    // TITLE
    // ======================

    const title = $(".read__title")
        .first()
        .text()
        .trim();

    // ======================
    // DATE
    // ======================

    const pubDate =
        $(".read__time")
            .first()
            .text()
            .trim() ||

        "";

    // ======================
    // IMAGE
    // ======================

    let image =
        $(".photo__wrap img").attr("src") ||

        "";

    // ======================
    // CONTENT
    // ======================

    const content = [];

    const source = "kompas.com";

    $(".read__content p, .read__content h2").each((i, el) => {
        const text = $(el).text().trim();

        if (!text) return;

        if (text.toLocaleLowerCase().includes("baca juga")) return;

        if (text.toLocaleLowerCase().includes("baca berikutnya")) return;

        if (text.toLocaleLowerCase().includes("kompas.com berkomitmen")) return;

        content.push(text);

    });

    return {
        title,
        pubDate,
        image,
        //imageCaption,
        content,
        source
    };
}

async function scraping_kompas_for_cluster(url) {

    const { data } = await axios.get(url, {
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

    // ======================
    // TITLE
    // ======================

    const title = $(".read__title")
        .first()
        .text()
        .trim();

    // ======================
    // CONTENT
    // ======================

    const content = [];

    const thumbnails =
        $(".photo__wrap img").attr("src") ||

        "";

    const source = "kompas";

    $(".read__content p, .read__content h2").each((i, el) => {
        const text = $(el).text().trim();

        if (!text) return;

        if (text.toLocaleLowerCase().includes("baca juga")) return;

        if (text.toLocaleLowerCase().includes("baca berikutnya")) return;

        if (text.toLocaleLowerCase().includes("kompas.com berkomitmen")) return;

        content.push(text);

    });

    const summary = content
        .filter(text =>
            text &&
            text.length > 30 &&
            !text.includes("ADVERTISEMENT") &&
            !text.includes("SCROLL TO CONTINUE")
        )
        .slice(0, 3)
        .join(" ");

    return {
        title,
        summary,
        source,
        thumbnails
    };
}

module.exports = {
    scraping_kompas,
    scraping_kompas_for_cluster
};