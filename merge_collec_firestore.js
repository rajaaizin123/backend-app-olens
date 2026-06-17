const admin = require("firebase-admin");
const serviceAccount = require("./servicesAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function mergeCollections() {
    try {
        const sourceSnapshot = await db
            .collection("cluster_topics_3")
            .get();

        if (sourceSnapshot.empty) {
            console.log("Tidak ada dokumen di cluster_topics_3");
            return;
        }

        const batch = db.batch();

        sourceSnapshot.forEach((doc) => {
            const targetRef = db
                .collection("cluster_topics_4")
                .doc(doc.id);

            batch.set(
                targetRef,
                doc.data(),
                { merge: true }
            );
        });

        await batch.commit();

        console.log(
            `${sourceSnapshot.size} dokumen berhasil disalin ke cluster_topic_4`
        );

    } catch (error) {
        console.error("Gagal merge collection:", error);
    }
}

mergeCollections();