require("dotenv").config();

const admin = require("firebase-admin");
const axios = require("axios");

// =====================
// INIT FIREBASE ADMIN
// =====================
const serviceAccount = require("./servicesAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// =====================
// CONFIG
// =====================
const API_URL = process.env.API_URL;
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || "100");

// =====================
// FETCH DATA FROM FIRESTORE
// =====================
async function fetchArticles() {
    const snapshot = await db
        .collection("artikel_berita_3")
        .limit(BATCH_SIZE)
        .get();

    return snapshot.docs.map(doc => {
        const d = doc.data();

        return {
            id: doc.id,
            title: d.title || "",
            summary: d.summary || "",
            source: d.source || "",
            thumbnails: d.thumbnails || "",
            link: d.link || ""
        };
    });
}

// =====================
// CALL FLASK API
// =====================
async function sendToClusteringAPI(data) {
    try {
        const response = await axios.post(API_URL, {
            data: data,
        });

        return response.data;
    } catch (err) {
        console.error("API ERROR:", err.response?.data || err.message);
        throw err;
    }
}

// =====================
// SAVE RESULT TO FIRESTORE
// =====================
async function saveTopics(result) {
    const batch = db.batch();

    const topics = result.topics || [];

    topics.forEach(topic => {
        const ref = db.collection("cluster_topics_3").doc();

        batch.set(ref, {
            topic_id: topic.topic_id,
            label: topic.label,
            article_count: topic.article_count,
            media_count: topic.media_count,
            keywords: topic.keywords,
            sources: topic.sources,
            articles: topic.articles,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    });

    await batch.commit();
}

// =====================
// MAIN PIPELINE
// =====================
async function runPipeline() {
    console.log("Starting clustering....");

    // 1. Extract
    const articles = await fetchArticles();
    console.log(`Fetched: ${articles.length} articles`);

    if (articles.length === 0) {
        console.log("No data found");
        return;
    }

    // 2. Transform (call API)
    const clustered = await sendToClusteringAPI(articles);
    console.log(`Topics received: ${clustered.total_topics}`);

    // 3. Load (save to Firestore)
    await saveTopics(clustered);

    console.log("Selesai completed successfully");
}

// =====================
// RUN
// =====================
runPipeline()
    .then(() => process.exit(0))
    .catch(err => {
        console.error("PIPELINE FAILED:", err);
        process.exit(1);
    });