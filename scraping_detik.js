const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://news.detik.com/berita/d-8481654/252-siswa-di-jaktim-diduga-keracunan-mbg-alami-gejala-usai-makan-pangsit-tahu"

async function scraping_detik(url) {

    const { data } = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0"
        }
    });

    const $ = cheerio.load(data);

    const title =
        $("h1.detail__title").text().trim() ||
        $("h1").first().text().trim();

    const pubDate =
        $(".detail__date").first().text().trim() ||
        $("time").first().text().trim();

    const article = $(".detail__body-text").first().clone();

    const image =
        $(".detail__media img").first().attr("src") ||
        $("figure img").first().attr("src") ||
        "";

    // hapus elemen bukan isi artikel
    article.find(".noncontent").remove();
    article.find("iframe").remove();
    article.find("script").remove();
    article.find("style").remove();
    article.find("table").remove();
    article.find(".detail__body-tag").remove();
    article.find(".clearfix").remove();
    article.find(".linksisip").remove();
    article.find(".lihatjg").remove();
    article.find(".sisip_embed_sosmed").remove();
    article.find(".ads-scrollpage-container").remove();

    const content = [];
    const source = "Detik";

    // ambil lead paragraph yang berada di luar <p>
    const intro = article
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

    if (
        intro &&
        intro.length > 20
    ) {
        content.push(intro);
    }

    article.find("p").each((_, el) => {

        let text = $(el).text().trim();

        if (!text) return;

        if (
            text.includes("Baca juga") ||
            text.includes("Lihat juga Video") ||
            text.includes("Baca berita selengkapnya") ||
            text.includes("SCROLL TO CONTINUE WITH CONTENT")
        ) {
            return;
        }

        text = text.replace(/Simak juga Video.*$/i, "").trim();

        // hapus credit wartawan
        if (/^\([a-z]+\/[a-z]+\)$/i.test(text)) {
            return;
        }

        content.push(text);
    });

    return {
        title,
        pubDate,
        content,
        source,
        image
    };
}

async function scraping_detikId_for_cluster(url) {
    console.log("aku scraping detiknews.id terpanggil.");

    const { data } = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0"
        }
    });

    const $ = cheerio.load(data);

    const title = $("header.entry-header h1.entry-title").text().trim();

    const article = $(".entry-content").clone();

    const thumbnails = $(".detail__media img").first().attr("src") ||
        $("figure img").first().attr("src") ||
        "";

    const source = "Detik";

    // hapus elemen bukan isi artikel
    article.find(".noncontent").remove();
    article.find("iframe").remove();
    article.find("script").remove();
    article.find("style").remove();
    article.find("table").remove();
    article.find(".detail__body-tag").remove();
    article.find(".clearfix").remove();

    const content = [];

    article.contents().each((_, el) => {
        let text = $(el).text().trim();

        if (!text) return;

        // filter text yang tidak diperlukan
        if (
            text.includes("Baca juga") ||
            text.includes("Lihat juga Video") ||
            text.includes("Baca berita selengkapnya")
        ) {
            return;
        }

        text = text.replace(/Simak juga Video.*$/i, "").trim();

        // hapus credit wartawan
        if (/^\([a-z]+\/[a-z]+\)$/i.test(text)) {
            return;
        }

        content.push(text);
    });

    //console.log(`data content: ${content}`);

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
        thumbnails,
        source
    }
}

async function scraping_detikCom_for_cluster(url) {
    console.log("aku scraping detik.news.com terpanggil.");

    const { data } = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0"
        }
    });

    const $ = cheerio.load(data);

    const title = $("h1.detail__title").text().trim();

    const article = $(".detail__body-text").clone();

    const thumbnails = $(".detail__media img").first().attr("src") ||
        $("figure img").first().attr("src") ||
        "";

    // hapus elemen bukan isi artikel
    article.find(".noncontent").remove();
    article.find("iframe").remove();
    article.find("script").remove();
    article.find("style").remove();
    article.find("table").remove();
    article.find(".detail__body-tag").remove();
    article.find(".clearfix").remove();

    const content = [];
    const source = "Detik";

    article.contents().each((_, el) => {
        let text = $(el).text().trim();

        if (!text) return;

        // filter text yang tidak diperlukan
        if (
            text.includes("Baca juga") ||
            text.includes("Lihat juga Video") ||
            text.includes("Baca berita selengkapnya")
        ) {
            return;
        }

        text = text.replace(/Simak juga Video.*$/i, "").trim();

        // hapus credit wartawan
        if (/^\([a-z]+\/[a-z]+\)$/i.test(text)) {
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
        thumbnails,
        source
    }
}

module.exports = {
    scraping_detik,
    scraping_detikCom_for_cluster,
    scraping_detikId_for_cluster
};