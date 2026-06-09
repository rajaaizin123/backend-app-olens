const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://www.tempo.co/ekonomi/lps-bayar-klaim-penjaminan-nasabah-bpr-rp-304-8-miliar-2134465"

async function scraping_tempo(url) {

    const { data } = await axios.get(url, {
        headers: {
            "Origin": "https://www.tempo.co",
            "Referer": "https://www.tempo.co/",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        }
    });

    const $ = cheerio.load(data);

    const title = $("h1").text().trim();

    const subtitle = $(".font-roboserif").first().text().trim();

    const pubDate = $("p.text-sm").first().text().trim();

    const content = [];

    const source = "Tempo.co";

    const image = $("figure img")
        .first()
        .attr("src") || "";

    $("#content-wrapper p").each((i, el) => {
        const text = $(el).text().trim();

        if (text && !text.toLowerCase().includes("pilihan editor:")) {
            content.push(text);
        }
    });

    return {
        title,
        subtitle,
        pubDate,
        content,
        source,
        image
    }
}

async function scraping_tempo_for_cluster(url) {

    const { data } = await axios.get(url, {
        headers: {
            "Origin": "https://www.tempo.co",
            "Referer": "https://www.tempo.co/",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        }
    });

    const $ = cheerio.load(data);

    const title = $("h1").text().trim();

    const content = [];

    const source = "Tempo.co";

    const thumbnails = $("figure img")
        .first()
        .attr("src") || "";

    console.log(`tes gambar tempo: ${thumbnails}`);

    $("#content-wrapper p").each((i, el) => {
        const text = $(el).text().trim();

        if (text && !text.toLowerCase().includes("pilihan editor:")) {
            content.push(text);
        }
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
        source,
        summary,
        thumbnails
    }
}

module.exports = {
    scraping_tempo,
    scraping_tempo_for_cluster
};