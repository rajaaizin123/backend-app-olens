const axios = require("axios");
const cheerio = require("cheerio");

async function scraping_tribunnews(url) {

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

    const title = $("h1")
        .first()
        .text()
        .trim();


    // ======================
    // DATE
    // ======================

    const pubDate =
        $("time")
            .first()
            .text()
            .trim() ||

        "";

    // ======================
    // IMAGE
    // ======================

    let image =
        $("#artimg img.imgfull").attr("src") ||

        $("img.imgfull").first().attr("src") ||

        "";

    if (!image) {

        const html = $("#artimg").html() || "";

        const match = html.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);

        if (match && match[1]) {

            const videoId = match[1];

            image =
                `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }

    // ======================
    // IMAGE CAPTION
    // ======================

    const imageCaption =
        $("figcaption")
            .first()
            .text()
            .trim();

    // ======================
    // ARTICLE
    // ======================

    const article =
        $(".side-article").clone();

    // remove ads
    article.find(".ads-placeholder").remove();

    // remove baca juga
    article.find(".baca").remove();

    // remove iframe/script
    article.find("iframe").remove();
    article.find("script").remove();
    article.find("style").remove();

    const content = [];

    const source = "tribunnews";

    // ambil semua paragraph + blockquote
    article.find("p, blockquote li").each((_, el) => {

        const text = $(el)
            .text()
            .trim();

        if (!text) return;

        // filter baca juga
        if (
            text.includes("Baca juga") ||
            text.includes("Baca Selengkapnya")
        ) {
            return;
        }

        // filter credit
        if (/^\(\*\)$/.test(text)) {
            return;
        }

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

async function scraping_tribunnews_for_cluster(url) {

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

    const title = $("h1")
        .first()
        .text()
        .trim();


    // ======================
    // ARTICLE
    // ======================

    const article =
        $(".side-article").clone();

    // remove ads
    article.find(".ads-placeholder").remove();

    // remove baca juga
    article.find(".baca").remove();

    // remove iframe/script
    article.find("iframe").remove();
    article.find("script").remove();
    article.find("style").remove();

    const content = [];

    // ambil semua paragraph + blockquote
    article.find("p, blockquote li").each((_, el) => {

        const text = $(el)
            .text()
            .trim();

        if (!text) return;

        // filter baca juga
        if (
            text.includes("Baca juga") ||
            text.includes("Baca Selengkapnya")
        ) {
            return;
        }

        // filter credit
        if (/^\(\*\)$/.test(text)) {
            return;
        }

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
    };
}

module.exports = {
    scraping_tribunnews,
    scraping_tribunnews_for_cluster
};