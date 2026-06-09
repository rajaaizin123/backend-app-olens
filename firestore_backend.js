const admin = require('firebase-admin');

const serviceAccount = require('./servicesAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function store_data(data) {

    if (!Array.isArray(data) || data.length === 0) {
        console.log('Operasi dibatalkan: Data kosong atau bukan format array.');
        return;
    }

    const batch = db.batch();
    const collectionRef = db.collection('artikel_berita_3');

    data.forEach(item => {
        const docRef = collectionRef.doc();

        if (!item.source) {
            item.source = 'Tidak diketahui';
        }

        batch.set(docRef, item);
    });

    try {
        await batch.commit();
        console.log(`Sukses! ${data.length} dokumen berhasil disimpan ke Firestore.`);
    } catch (error) {
        console.error('Gagal menyimpan data ke Firestore:', error);
    }
}

// ==========================================
// Contoh Cara Memanggil Fungsi
// ==========================================

const dataBerita = [
    {
        "source": "detik",
        "title": "Negosiasi Damai Meruncing: Trump Perketat Syarat, Iran Tegas Menolak",
        "summary": "Presiden AS Donald Trump berupaya mengubah beberapa persyaratan dalam usulan proposal untuk mengakhiri perang di Timur Tengah. Namun Kepala Negosiator Iran, Mohammad Bagher Ghalibaf menyebut Iran tak akan menyetujui kesepakatan apapun dengan AS jika gagal menjamin hak rakyat Iran. Dilansir AFP, Minggu (31/5/2026), Trump dilaporkan berupaya mengubah beberapa syarat dalam usulan proposal untuk mengakhiri perang di Timur Tengah. The New York Times melaporkan perubahan yang dilakukan Trump melibatkan penguatan persyaratan kesepakatan. AS juga telah mengirimkan kerangka kerja baru tersebut kembali untuk dipertimbangkan oleh Iran. Hal itu disampaikan para pejabat yang mengetahui proses tersebut."
    },
    {
        "source": "detik",
        "title": "Iran Tutup Kafe Diduga Gelar Aktivitas 'Satanis'",
        "summary": "Pihak berwenang Iran menutup sebuah kafe di pusat Teheran. Kafe tersebut ditutup karena tuduhan mempromosikan aktivitas \"satanis\". Dilansir AFP, Minggu (31/5/2026), berdasarkan laporan media lokal lapor kantor berita Fars, kafe tersebut terletak di jalan Valiasr yang terkenal di Teheran. Kafe tersebut dilaporkan telah menyelenggarakan acara yang menampilkan musik bergaya Barat yang 'menyediakan latar untuk perilaku abnormal'. Kantor berita Mehr mengatakan polisi menuduh para pengunjung terlibat dalam 'gerakan setan'."
    },
    {
        "source": "detik",
        "title": "Serangan Hizbullah Tewaskan 1 Tentara Israel",
        "summary": "Israel mengatakan salah satu tentaranya tewas akibat serangan drone peledak Hizbullah di Lebanon selatan. Dengan demikian, jumlah korban tewas militer Israel sejak awal Maret menjadi 25 orang. Dilansir AFP dan Aljazeera, Minggu (31/5/2026), kelompok Hizbullah terus melancarkan serangan drone ke wilayah Israel yang kemudian terjadi aksi saling balas dari Israel. Adapun tentara Israel yang gugur teridentifikasi sebagai Sersan Staf Michael Tyukin berusia 21 tahun. Seorang juru bicara tentara mengatakan kepada AFP bahwa ia tewas akibat serangan drone Hizbullah."
    },
    {
        "source": "detik",
        "title": "Ini Desain Medali Finisher Riau Bhayangkara Run, Beda dan Penuh Makna",
        "summary": "Riau Bhayangkara Run 2026 memperkenalkan desain medali unik, berbeda dari yang lain. Para finisher nantinya akan mendapatkan medali yang berbentuk panah (arrow). Karorena Polda Riau sekaligus Ketua Panitia Riau Bhayangkara Run 2026, Kombes Daniel Muharam, mengungkap alasan mengapa medali Riau Bhayangkara Run 2026 ini dibuat berbeda. Salah satu keunikannya yakni terletak pada bentuknya yang menyerupai panah ini ternyata memiliki filosofi yang mendalam. \"Filosofi bentuk panah ini, bentuk utama medali yang menyerupai anak panah mengarah ke depan dan ke bawah melambangkan perjalanan seorang pelari yang memiliki tujuan, fokus, dan arah yang jelas,\" kata Daniel dalam keterangannya, Minggu (31/5/2026)."
    },
    {
        "title": "Israel Klaim Rebut Kastil Beauford di Lebanon, Bendera Dikibarkan",
        "summary": "Israel mengklaim telah merebut Kastil Beaufort (Qalaat al-Shaqif) di dekat kota Nabatieh di Lebanon Selatan. Bendera Israel berkibar di atas benteng abad pertengahan di Beaufort, Lebanon. Dilansir AFP dan Aljazeera, Minggu (31/5/2026), dan juga dilaporkan media Reuters dan AP, pasukan Israel telah merebut Kastil Beaufort (Qalaat al-Shaqif) di dekat kota Nabatieh di Lebanon selatan. Suara tembakan artileri terdengar dan asap mengepul dari daerah sekitarnya saat bendera pasukan penyerang terlihat oleh AFP di atas kastil, yang terkenal digunakan pasukan Israel sebagai pangkalan selama pendudukan mereka selama dua dekade sebelumnya."
    },
    {
        "source": "detik",
        "title": "Jejak Dua Dekade Lumpur Lapindo di Sidoarjo",
        "summary": "Sidoarjo - Lumpur Lapindo masih mengalir dua dekade setelah pertama muncul di Sidoarjo. Bencana ini mengubah kawasan permukiman dan kehidupan ribuan warga."
    },
    {
        "source": "detik",
        "title": "Trump Tebar Ancaman ke Oman Dibalas Seruan 'Solidaritas' Iran",
        "summary": "Trump DikecamOman sebelumnya bertindak sebagai mediator utama antara AS dan Iran ketika mereka berupaya menyelesaikan perang yang dimulai pada 28 Februari, ketika AS dan Israel menyerang Iran.Ancaman Trump yang tampak pada hari Rabu menyoroti peningkatan ketergantungannya pada kekuatan militer dalam kebijakan luar negerinya, sebuah strategi yang kadang-kadang disebut \"diplomasi kapal perang\" .Namun, para kritikus dengan cepat mengecam ancaman tersebut sebagai tindakan sembrono. Raed Jarrar, Direktur Advokasi di kelompok Hak Asasi Manusia DAWN yang berbasis di AS, menyamakan komentar presiden AS dengan komentar seorang \"bos mafia\".\"Piagam PBB melarang ancaman kekerasan terhadap negara mana pun, dan larangan itu mengikat Amerika Serikat persis seperti mengikat semua orang lain,\" kata Jarrar kepada Al Jazeera.\"Mengancam untuk 'meledakkan' negara Arab karena perairannya kebetulan berada di sepanjang jalur minyak yang ingin dibuka kembali oleh Washington adalah logika tanpa hukum yang sama yang menghasilkan perang ini pada bulan Februari, dan itu adalah sinyal paling jelas bahwa gencatan senjata apa pun yang ditengahi pemerintahan ini hanya akan bertahan sampai presiden kehilangan kesabarannya lagi dalam rapat kabinet,\" imbuhnya.Ancaman Trump muncul setelah televisi pemerintah Iran melaporkan kerangka kerja nota kesepahaman (MOU) antara kedua negara.Draf memorandum tersebut dilaporkan akan memberikan Iran dan Oman kendali bersama untuk mengelola selat tersebut. Namun, pemerintahan Trump menyebut laporan itu sebagai \"sebuah rekayasa sepenuhnya\".Selat Hormuz - jalur pelayaran utama untuk produk energi global dan pupuk pertanian - telah beroperasi sebagai jalur internasional bebas selama beberapa dekade. Namun setelah AS dan Israel mulai membombardir Iran pada bulan Februari, Teheran menutup selat tersebut dan mulai menegaskan kedaulatannya atas selat itu.Sebagian jalur air tersebut melewati perairan teritorial Iran dan Oman.Respons IranPresiden Amerika Serikat (AS) Donald Trump mengancam akan menggunakan kekuatan militer terhadap Oman jika negara tersebut berkolaborasi dengan Iran untuk menegaskan kendali atas Selat Hormuz. Merespons hal itu, Iran menyatakan solidaritasnya terhadap Oman.Dilansir Aljazeera, Kamis (28/5/2026), Juru bicara Kementerian Luar Negeri Iran, Esmaeil Baghaei angkat bicara soal ancaman Trump tersebut. Ia menyatakan solidaritasnya dengan Oman setelah \"ancaman dari pejabat AS\".Pernyataan itu disampaikan setelah Trump mengancam akan \"meledakkan\" Oman, jika negara itu tidak \"berperilaku seperti negara lain\" terkait kendali atas Selat Hormuz.Baghaei juga mengutuk serangan AS baru-baru ini terhadap wilayah Bandar Abbas di Iran."
    },
    {
        "title": "Danrem 084/Bhaskara Jaya Hadiri Puncak Hari Jadi Kota Surabaya ke-733",
        "summary": "Detiknews.id Surabaya – Suasana penuh keakraban, semangat persatuan, dan rasa cinta terhadap Kota Pahlawan begitu terasa dalam puncak peringatan Hari Jadi Kota Surabaya ke-733 yang digelar di Halaman Balai Kota Surabaya, Jalan Taman Surya No. 1 Surabaya, Minggu (31/05/26). Ribuan masyarakat dari berbagai kalangan tampak larut dalam nuansa kebersamaan yang hangat. Momentum bersejarah tersebut turut dihadiri Komandan Korem 084/Bhaskara Jaya, Brigjen TNI Kohir bersama jajaran Forkopimda, tokoh masyarakat, serta berbagai elemen warga Surabaya. Kehadiran Danrem menjadi simbol kuatnya sinergitas antara TNI, Pemerintah Kota Surabaya, Polri, dan seluruh unsur masyarakat dalam menjaga keamanan, ketertiban, serta mendukung pembangunan kota yang semakin maju dan humanis."
    },
    {
        "source": "detik",
        "title": "Trump Sehat tapi Harus Diet Ketat",
        "summary": "Memo tiga halaman tersebut memberikan gambaran umum tentang pemeriksaan fisik dan pengujian diagnostik Trump yang dilakukan di Rumah Sakit Walter Reed Medical di dekat Washington pada hari Selasa lalu.Barbabella mengatakan Trump \"sepenuhnya layak untuk menjalankan semua tugas Panglima Tertinggi dan Kepala Negara.\"Trump, yang akan berusia 80 tahun bulan depan, mengonsumsi tiga obat, dua di antaranya ditujukan untuk mengontrol kolesterol dan yang ketiga adalah aspirin untuk \"pencegahan penyakit jantung.\"Dengan tinggi 191 cm, berat badan Trump meningkat menjadi 108 kilogram dari berat badannya yang diumumkan secara publik sebesar 101,6 kilogram pada pemeriksaan medis tahunan terakhirnya pada April tahun lalu.Pemeriksaan tersebut merupakan pemeriksaan medis ketiga Trump sejak kembali menjabat tahun lalu. Pemeriksaan ini dilakukan menyusul spekulasi yang meningkat tentang masalah kesehatan, termasuk memar di tangannya dan tampak mengantuk selama pertemuan.\"Pemeriksaan punggung tangan menunjukkan ekimosis (memar), yang konsisten dengan iritasi jaringan lunak ringan terkait dengan seringnya berjabat tangan dalam konteks penggunaan aspirin untuk pencegahan penyakit jantung,\" demikian memo tersebut mengenai tangan Trump yang memar."
    },
    {
        "title": "Ribuan Warga Padati Car Free Night Istimewa di Cibinong",
        "summary": "Jakarta - Ribuan warga memadati Car Free Night di Jalan Tegar Beriman, Cibinong. Acara HUT ke-544 Bogor itu menghadirkan seni, musik, kuliner, dan UMKM."
    },
    {
        "source": "detik",
        "title": "Penasihat Khamenei Sebut Trump Khianati Diplomasi Ketiga Kalinya",
        "summary": "\"Saya akan bertemu sekarang, di Ruang Situasi, untuk membuat keputusan akhir,\" kata Trump dalam unggahan panjang di media sosial.Trump menekankan bahwa Iran harus setuju untuk tidak pernah memiliki senjata nuklir dan membuka jalur pelayaran Selat Hormuz.Trump juga menegaskan bahwa persediaan uranium yang diperkaya di Iran \"akan digali oleh Amerika Serikat... dalam koordinasi dan kerja sama erat dengan Republik Islam Iran, ditambah Badan Energi Atom Internasional, dan DIHANCURKAN.\""
    },
    {
        "source": "detik",
        "title": "5 Berita Terpopuler Internasional",
        "summary": "\"Presiden Trump tetap dalam kondisi kesehatan prima, menunjukkan fungsi jantung, paru-paru, neurologis, dan fisik yang secara keseluruhan kuat,\" kata dokter Trump, Kapten Angkatan Laut AS Sean Barbabella.- Memanas, Drone Ukraina Hantam Kapal Tanker-Depot Minyak di RusiaSerangan drone Ukraina menghatam sebuah kapal tanker di pelabuhan Taganrog, Rusia, dan menghantam depot minyak di kota Armavir, Rusia. Demikian disampaikan otoritas di wilayah Rostov dan Krasnodar, Rusia selatan pada hari Sabtu (30/5).Dilansir media Al Arabiya, Sabtu (30/5/2026), gubernur wilayah Rostov, Yury Slyusar, menuliskan di Telegram, bahwa kebakaran di kapal tanker dan di pelabuhan Taganrog - sebuah kota dengan sekitar 240.000 penduduk - telah dipadamkan, tanpa adanya tumpahan minyak yang dilaporkan. Dia mengatakan bahwa dua orang terluka dalam serangan itu.Walikota kota tersebut, Svetlana Kambulova, mengatakan bahwa keadaan darurat lokal, yang diberlakukan pada 27 Mei, telah diperpanjang.Tonton juga Video: Terpopuler Sepekan: 9 WNI Ditangkap Israel hingga Rupiah Melemah"
    },
    {
        "source": "detik",
        "title": "Kerbau 'Donald Trump' Tak Jadi Dipotong saat Idul Adha, Ini Alasannya",
        "summary": "Mantan pemilik kerbau itu, Zia Uddin Mridha (28) mengatakan saudaranya menamainya \"Trump\" karena \"bulunya yang luar biasa\".Mridha mengatakan banyak pengunjung yang penasaran hingga anak-anak datang dengan antusias untuk melihat hewan itu. Namun, ia menjual hewan itu menjelang Idul Adha.Tetapi polisi telah bertindak setelah pemerintah memerintahkan agar kerbau itu diselamatkan.\"Departemen peternakan meminta kami untuk mengambil kerbau itu dari pemiliknya karena merupakan hewan langka,\" kata Mohammad Ruhul Quddus, petugas yang bertanggung jawab di Kantor Polisi Keraniganj, Dhaka, tempat kerbau itu dibawa.\"Mereka mengatakan bahwa kerbau albino itu masih sangat muda, dan dapat dipelihara selama beberapa tahun,\" katanya.Lebih dari 12 juta hewan ternak termasuk kambing, domba, sapi, dan kerbau diperkirakan akan disembelih selama Hari Raya Idul Adha."
    },
    {
        "source": "detik",
        "title": "Tragedi Truk Terbalik, 18 Orang Tewas Termasuk 10 Anak-anak",
        "summary": "Tragis! Sebuah truk terbalik di Afghanistan timur pada hari Sabtu (30/5), menewaskan 18 orang di dalamnya termasuk 10 anak-anak. Kecelakaan lalu lintas yang fatal sering terjadi di Afghanistan. Kecelakaan tersebut terjadi sebagian karena kondisi jalan yang buruk setelah puluhan tahun konflik, perilaku mengemudi yang berbahaya, dan kurangnya regulasi. Dilansir kantor berita AFP, Sabtu (30/5/2026), saat kejadian, truk tersebut membawa keluarga-keluarga Afghanistan yang kembali dari Pakistan, tempat mereka tinggal. Demikian disampaikan Abdul Malik Niazay, juru bicara gubernur provinsi Laghman."
    },
    {
        "source": "detik",
        "title": "Trump Sedang Buat 'Keputusan Akhir' soal Kesepakatan dengan Iran",
        "summary": "Presiden Amerika Serikat (AS) Donald Trump mengaku sedang membuat keputusan akhir perihal perang dengan Iran. Trump akan mengambil keputusan apakah akan mencapai kesepakatan damai dengan Iran atau tidak. \"Saya akan bertemu sekarang, di Ruang Situasi, untuk membuat keputusan akhir,\" kata Trump dalam unggahan panjang di media sosial, seperti dilansir AFP, Jumat (29/5/2026). Trump menegaskan Iran harus setuju untuk tidak pernah memiliki senjata nuklir dan membuka kembali jalur pelayaran Selat Hormuz."
    },
    {
        "source": "detik",
        "title": "5 Berita Terpopuler Internasional Hari Ini",
        "summary": "- Netanyahu Perintahkan Militer Israel Ambil Alih 70 Persen Wilayah GazaPerdana Menteri (PM) Israel Benjamin Netanyahu mengatakan bahwa dirinya telah memerintahkan militer Tel Aviv untuk mengambil alih 70 persen wilayah Jalur Gaza. Perintah ini menjadi sikap menentang ketentuan gencatan senjata Gaza yang rapuh yang mulai diberlakukan pada Oktober tahun lalu.\"Saat ini kami sedang menekan Hamas. Kami sekarang menguasai 60 persen wilayah Jalur Gaza,\" kata Netanyahu saat menghadiri sebuah konferensi di area permukiman Tepi Barat, menurut video yang ditayangkan oleh televisi Israel, Channel 12, seperti dilansir AFP, Jumat (29/5/2026).Dikatakan Netanyahu bahwa militer Israel telah menguasai 50 persen wilayah Jalur Gaza berdasarkan ketentuan gencatan senjata. Dia kemudian menambahkan: \"Arahan saya adalah untuk bergerak ke... 70 persen.\"- Israel Putuskan Kontak dengan Sekjen PBB Antonio Guterres, Ada Apa?Israel mengumumkan pihaknya memutuskan semua kontak dengan Sekretaris Jenderal Perserikatan Bangsa-Bangsa (PBB) Antonio Guterres. Langkah ini merespons masuknya Israel ke dalam daftar hitam yang dirilis PBB terkait dugaan kekerasan seksual di zona konflik.Otoritas Tel Aviv mengecam daftar hitam semacam itu \"keterlaluan\", terlebih Israel berada dalam daftar yang sama dengan kelompok Hamas.\"Kami sudah selesai dengan Sekretaris Jenderal ini,\" kata Duta Besar Israel untuk PBB, Danny Danon, dalam pernyataan video yang diunggah ke media sosial X, seperti dilansir AFP, Jumat (29/5/2026).- Garda Revolusi Iran: Perdamaian Mustahil Tercapai hingga Israel DilenyapkanKorps Garda Revolusi Iran (IRGC) mengecam keras pembunuhan yang dilakukan Israel terhadap komandan-komandan senior kelompok Hamas di Jalur Gaza. IRGC memperingatkan bahwa kawasan Asia Barat, atau Timur Tengah, tidak akan mengalami perdamaian kecuali Israel sepenuhnya dilenyapkan.IRGC dalam pernyataannya, seperti dilansir Press TV, Jumat (29/5/2026), mengutuk keras pembunuhan dua komandan senior Hamas, Mohammed Odeh dan Ezzeddin al-Haddad atau Abu Suhaib, oleh Israel. Keduanya merupakan komandan senior sayap bersenjata Hamas, Brigade Ezzedine al-Qassam.Odeh dilaporkan tewas bersama istri dan ketiga anaknya akibat serangan Israel di area Kota Gaza.Tonton juga Video Terpopuler Sepekan: 9 WNI Ditangkap Israel hingga Rupiah Melemah"
    },
    {
        "source": "detik",
        "title": "Trump Hanya Terima Kesepakatan dengan Iran Jika Syarat-syaratnya Dipenuhi",
        "summary": "Seorang pejabat Gedung Putih mengatakan Presiden Amerika Serikat (AS) Donald Trump hanya akan membuat kesepakatan damai dengan Iran jika memenuhi semua syaratnya. Pejabat itu mengatakan Iran tak boleh mempunyai senjata nuklir. Dilansir AFP, Sabtu (30/5/2025) pejabat Gedung Putih mengungkap syarat Trump tersebut setelah pemimpin AS itu berkumpul dengan para ajudannya untuk membahas kemungkinan kesepakatan. \"Pertemuan di Ruang Situasi telah selesai dan berlangsung sekitar dua jam. Presiden Trump hanya akan membuat kesepakatan yang bagus untuk Amerika dan memenuhi garis merahnya,\" kata pejabat Gedung Putih itu dengan syarat anonim."
    },
    {
        "source": "detik",
        "title": "AS Serang Kapal Penyelundup Narkoba di Pasifik Timur, 3 Orang Tewas",
        "summary": "Militer Amerika Serikat melakukan serangan mematikan terhadap sebuah kapal di Pasifik Timur, dan menewaskan tiga orang. Dilansir kantor berita AFP, Sabtu (30/5/2026), ini adalah serangan mematikan ketiga dalam seminggu terakhir, sehingga jumlah total korban tewas menjadi setidaknya 198 orang -- menurut perhitungan AFP -- sejak pemerintahan Trump memulai serangan terhadap kapal-kapal yang diduga terlibat perdagangan narkoba pada bulan September tahun lalu. Dalam sebuah unggahan di media sosial X, Komando Selatan AS mengatakan \"kapal tersebut sedang melintasi rute perdagangan narkoba yang dikenal di Pasifik Timur dan terlibat dalam operasi perdagangan narkoba.\""
    },
    {
        "source": "detik",
        "title": "Iran: Tidak Ada Negosiasi dengan AS soal Isu Nuklir",
        "summary": "Kementerian Luar Negeri Iran mengatakan bahwa tidak ada negosiasi yang berlangsung mengenai program nuklirnya. Iran mengatakan saat ini sedang fokus mengakhiri perang. Dilansir AFP, Sabtu (30/5/2026), tanggapan Iran ini muncul setelah Presiden Amerika Serikat (AS) Donald Trump menyarankan bahwa Iran akan melepaskan uranium yang diperkaya di bawah kesepakatan untuk mengakhiri perang Timur Tengah. \"Pada tahap ini, kami fokus pada mengakhiri perang, dan tidak ada negosiasi mengenai isu nuklir,\" kata juru bicara kementerian Esmaeil Baqaei kepada TV pemerintah."
    },
    {
        "source": "detik",
        "title": "AS Bilang Lebih dari Mampu untuk Perang Lagi dengan Iran",
        "summary": "Menyusul laporan bahwa Iran telah menuntut kompensasi finansial atas perang tersebut dan bahwa Gedung Putih telah mengemukakan gagasan investasi, Trump mengatakan \"tidak akan ada uang yang ditukar, sampai pemberitahuan lebih lanjut.\"Trump menambahkan bahwa hanya \"hal-hal yang jauh tidak penting yang telah disepakati.\"Sementara itu, Kementerian Luar Negeri Iran mengatakan bahwa tidak ada negosiasi yang berlangsung mengenai program nuklirnya. Iran mengatakan saat ini sedang fokus mengakhiri perang.\"Pada tahap ini, kami fokus pada mengakhiri perang, dan tidak ada negosiasi mengenai isu nuklir,\" kata juru bicara kementerian Esmaeil Baqaei kepada TV pemerintah.Esmaeil Baqaei mengatakan bahwa masih belum ada \"kesepakatan akhir\" dengan Amerika Serikat untuk mengakhiri perang di Timur Tengah.Simak Video Di Balik Ketegangan Baru AS dan Iran: Rincian Syarat dari Trump-Respons Teheran"
    },
    {
        "source": "detik",
        "title": "15 Anak Tewas dan 62 Terluka dalam Sepekan Saat Gencatan Senjata Lebanon",
        "summary": "Perserikatan Bangsa-Bangsa (PBB) mengatakan sebanyak 15 anak tewas dalam 7 hari terakhir di Lebanon saat gencatan senjata Hizbullah dengan Israel masih berlangsung. Sebanyak 62 anak lainnya juga dilaporkan terluka. UNICEF, badan anak-anak PBB, menyebut angka-angka tersebut mengejutkan. UNICEF menekankan bahwa berdasarkan hukum humaniter internasional, anak-anak harus dilindungi setiap saat selama konflik. \"Menurut Kementerian Kesehatan Masyarakat Lebanon, 77 anak dilaporkan tewas atau terluka hanya dalam seminggu terakhir,\" kata juru bicara UNICEF Ricardo Pires dalam konferensi pers di Jenewa."
    },
    {
        "source": "detik",
        "title": "Tekanan Baru AS ke Dunia Penerbangan Iran",
        "summary": "Bessent juga menyinggung dampak blokade angkatan laut AS terhadap pelabuhan-pelabuhan Iran. Dia menyebut hal itu telah memastikan 'jumlah minyak mentah Iran di lautan berada pada rekor terendah'.\"Kami juga akan menutup akses maskapai penerbangan Iran ke tempat-tempat pendaratan, pengisian bahan bakar, dan penjualan tiket,\" ucapnya.Dia menyebut hanya kemajuan dalam negosiasi yang akan menghentikan tekanan terhadap dunia penerbangan Iran. Dia menyebut hasil memuaskan dalam negosiasi akan menurunkan tekanan dari AS.\"Hanya hasil yang memuaskan dalam negosiasi yang akan mengakhiri penurunan terus-menerus ini,\" katanya.Namun, Bessent menyebut warga negara Iran yang ingin terbang ke Makkah atau Madinah di Arab Saudi untuk haji dan umrah dengan maskapai Iran tetap diizinkan. Dilansir AFP dan New York Post, Bessent mengatakan akan ada pengecualian terbatas untuk pergerakan terkait alasan keagamaan.\"Satu hal yang tidak akan kami lakukan adalah membatasi pergerakan karena alasan keagamaan, jadi warga Iran yang ingin melakukan ziarah ke Makkah atau Madinah akan diizinkan,\" tegas Bessent.\"Kami juga akan mengizinkan alasan kemanusiaan yang sah,\" imbuhnya."
    },
    {
        "source": "detik",
        "title": "Penerbangan di Bandara Munich Jerman Disetop Sementara karena Drone",
        "summary": "Penerbangan sempat dihentikan di bandara Munich, Jerman pada hari Sabtu (30/5) karena penampakan objek diduga drone. Seorang juru bicara polisi setempat mengatakan, dua pilot melaporkan insiden mencurigakan yang melibatkan apa yang tampak seperti drone tak lama setelah pukul 9:00 pagi waktu setempat. \"Dalam koordinasi dengan pengontrol lalu lintas udara Jerman, otoritas keamanan kemudian memutuskan untuk menutup landasan pacu,\" kata juru bicara tersebut, seperti dilansir kantor berita AFP, Sabtu (30/5/2026)."
    },
    {
        "source": "detik",
        "title": "Panas! Giliran Iran Serang Pangkalan Udara AS",
        "summary": "\"Empat kapal mencoba melewati Selat Hormuz dan memasuki Teluk Persia tanpa berkoordinasi dengan pasukan keamanan yang bertanggung jawab atas selat tersebut,\" demikian dilaporkan beberapa media yang berafiliasi dengan pemerintah Iran dilansir CNN Internasional, Kamis, (28/5/2026).\"Mereka telah diperingatkan, dan setelah mengabaikan peringatan tersebut, tembakan peringatan dilepaskan ke arah mereka, memaksa mereka untuk berbalik arah,\" menurut laporan tersebut.Sementara itu, Kantor Berita Tasnim, yang berafiliasi dengan Korps Garda Revolusi Islam (IRGC), melaporkan bahwa Angkatan Laut IRGC telah menembakkan tembakan peringatan ke arah \"kapal tanker minyak Amerika\" yang memaksa kapal tersebut untuk berbalik arah."
    },
    {
        "source": "detik",
        "title": "Menlu Singapura Sebut Korut Tak Tertarik Dialog dengan AS-Korsel",
        "summary": "Balakrishnan mengatakan bahwa dirinya juga mengamati sikap Korut yang semakin keras terhadap reunifikasi. \"Saat ini, (Korut) tidak mencari peluang untuk pembicaraan atau keterlibatan secara signifikan,\" ujarnya.Meskipun hampir tidak ada perdagangan antara kedua negara, hubungan antara Singapura dan Korut tetap tergolong ramah. Balakrishnan mengatakan bahwa dirinya telah mengundang Pyongyang untuk menghadiri forum regional yang digelar oleh Perhimpunan Bangsa-Bangsa Asia Tenggara (ASEAN).Dalam postingan Facebooknya, Balakrishan mengunggah video yang isinya mengatakan \"Pyongyang adalah kota modern, bersih, dan terencana dengan baik\".\"Terus mengalami kemajuan signifikan sejak kunjungan terakhir saya delapan tahun lalu. Jalanan ramai, lebih banyak mobil di jalan, dan banyak bangunan serta pembangunan baru,\" ucapnya.Lebih lanjut, Balakrishnan mendesak adanya \"kesabaran strategis\" dalam menghadapi Korut.\"Jangan memperburuk situasi, jangan memperparah masalah, tetapi lihatlah peluang dalam jangka panjang untuk membantu atau membuka saluran komunikasi,\" cetus Menlu Singapura tersebut.Tonton juga Video: Korut Uji Coba Rudal Balistik Jelang Kedatangan Trump ke Korsel"
    },
    {
        "title": "Taktik Bunglon Diplomasi Sumitro di PBB",
        "source": "tempo",
        "summary": "MENDAPAT kabar soal serangan Belanda ke Daerah Istimewa Yogyakarta, Sumitro Djojohadikusumo bergegas ke Washington, DC, Amerika Serikat, pada 19 Desember 1948. Saat itu ia sedang berada di New York. Ia menempuh perjalanan sekitar 364 kilometer sambil menenteng surat yang disebut sebagai memorandum."
    },
    {
        "title": "Gerilya Menjadikan Sumitro dan Margono Pahlawan Nasional",
        "source": "tempo",
        "summary": "ACARA buka puasa yang digelar di Markas Komando Distrik Militer 0709/Kebumen pada 25 Maret 2025 tak hanya diisi dengan makan-makan. Sahibulhajat, Komandan Kodim Kebumen Letnan Kolonel Ardianta Purwandhana, mengundang puluhan tokoh dan akademikus di Kabupaten Kebumen, Jawa Tengah, untuk mengulas bukunya yang berjudul Kebumen: Kota yang Kehilangan Pahlawan yang baru sebulan terbit."
    },
    {
        "title": "Sumitro Raih Dua Doktor dari Belanda. Apa yang Diteliti?",
        "source": "tempo",
        "summary": "PERAYAAN dies natalis Erasmus Universiteit ke-82 di Rotterdam, Belanda, kedatangan tamu dari timur jauh. Pada 8 November 1995, kehadiran pelawat itu untuk menerima gelar doktor kehormatan membuat Perdana Menteri Belanda Wim Kok dan Menteri Keuangan Gerrit Zalm sampai datang ke kampus. Tamu itu tak lain adalah Sumitro Djojohadikusumo."
    },
    {
        "title": "Demam Parfum Anak Sekolah",
        "source": "tempo",
        "summary": "PEMANDANGAN yang terlihat di Pondok Indah Mall, Jakarta Selatan, pada 16 Mei 2026 membuat heboh. Ratusan orang sudah mengular sejak 07.00 demi berburu parfum lokal merek Mykonos. Yang membuat publik tercengang bukan hanya panjang antreannya, melainkan juga siapa yang berdiri di sana: anak-anak lelaki usia siswa sekolah dasar dan sekolah menengah pertama."
    },
    {
        "title": "Tim Film Pesta Babi Hormati Laporan Mama Yasinta ke Polisi",
        "source": "tempo",
        "summary": "TIM kolaborasi pembuat film Pesta Babi menyatakan menghormati keputusan Yasinta Moiwend atau Mama Yasinta mendatangi Kepolisian Daerah Metropolitan Jakarta dan mempersoalkan film Pesta Babi. Para pembuat film itu terdiri dari Ekspedisi Indonesia Baru, Greenpeace Indonesia, Jubi Media, LBH Papua Merauke, Pusaka Bentala Rakyat, dan Watchdoc. Sejumlah lembaga swadaya masyarakat yang terlibat dalam memproduksi film ini menyatakan Mama Yasinta Moiwend adalah seorang tokoh perempuan adat Malind yang sudah lama berjuang untuk diri dan komunitasnya, jauh sebelum proses pembuatan film dokumenter ini berlangsung. Karena itu, mereka meminta publik tidak menyudutkan keputusan Mama Yasinta tersebut. “Kami meminta publik untuk tidak menyudutkan atau menghakimi beliau, sembari kami masih berusaha memahami apa yang terjadi dengan perubahan pilihan sikap ini,” tulis tim kolaborasi pembuat film Pesta Babi dalam keterangan tertulis pada Sabtu, 30 Mei 2026."
    },
    {
        "title": "Konferensi Republik di UGM Bahas Remiliterisasi Prabowo",
        "source": "tempo",
        "summary": "RATUSAN akademikus, aktivis, pegiat organisasi masyarakat sipil, dan komunitas berkonsolidasi di University Club Universitas Gadjah Mada Yogyakarta, Sabtu, 30 Mei 2026. Forum tersebut berlangsung untuk merespons menguatnya militer sebagai bagian dari kemunduran demokrasi pemerintahan Presiden Prabowo Subianto-Gibran Rakabuming Raka. Remiliterisasi menjadi salah satu topik yang dibahas dalam konsolidasi bertajuk Konferensi Republik Meneguhkan Civil Society Pilar Republik. Selain menguatnya militerisme, mereka membicarakan berbagai isu krusial di antaranya ketimpangan ekonomi, krisis representasi dan demokrasi, pelemahan basis sosial, dan krisis hukum dan institusi. Konsolidasi yang berlangsung selama sehari itu melibatkan sejumlah pembicara, di antaranya Jaleswari Pramodhawardani, Yanuar Nugroho, Zainal Arifin Mochtar, Arie Sujito, Alissa Wahid, Bhima Yudistira, Candra Hamzah, Titi Anggraini, Andi Wijayanto, Leo Kleden, Baiquni, Gita Wirjawan, Komaruddin Hidayat, Komaruddin Hidayat. Dalam pertemuan itu juga terlihat pendiri Saiful Mujani Research and Consulting (SMRC) Saiful Mujani."
    },
    {
        "title": "Dino Sarankan Prabowo Belajar dari Presiden Cina dan Meksiko",
        "source": "tempo",
        "summary": "PENDIRI Foreign Policy Community of Indonesia (FPCI), Dino Patti Djalal, menyarankan Presiden Prabowo Subianto untuk belajar kepada Presiden China Xi Jinping dan Presiden Meksiko Claudia Sheinbaum dalam menghemat perjalanan dinas luar negeri. Dalam unggahan video di Instagram miliknya, @dinopattidjalal, Dino menyampaikan lima saran kepada Presiden Prabowo setelah banyak rakyat Indonesia meminta Prabowo mengurangi perjalanan ke luar negeri. Salah satunya dalam satu tahun ke depan Presiden Prabowo diminta lebih banyak menerima tamu negara di tanah air ketimbang melakukan perjalanan ke luar negeri. Dino mengatakan strategi ini yang dilakukan Presiden China Xi Jinping yang jauh lebih banyak menerima tamu negara di Beijing ketimbang pepergian ke luar negeri. Baru-baru ini Prabowo dikritik karena berkunjung ke Prancis untuk keempat kalinya."
    },
    {
        "title": "Apa yang Dikerjakan Sumitro Selama Kuliah di Eropa",
        "source": "tempo",
        "summary": "RENCANA studi Sumitro Djojohadikusumo di Nederlandsche Economische Hogeschool (NEH), Rotterdam, Belanda, hampir saja berantakan karena Dolores. Ia berjumpa dengan perempuan berdarah Filipina-Spanyol itu di atas geladak kapal SS Potsdam dari Jakarta menuju Europoort Rotterdam."
    },
    {
        "title": "Persiapan Operasional PT Danantara Sumberdaya Indonesia",
        "source": "tempo",
        "summary": "Menteri Koordinator Perekonomian Airlangga Hartarto (tengah) bersama Kepala Badan Pengaturan BUMN Dony Oskaria (kanan) dan Menteri Keuangan Purbaya Yudhi Sadewa ketika konferensi pers persiapan operasional PT Danantara Sumberdaya Indonesia di Jakarta, 31 Mei 2026. Pemerintah memastikan kebijakan ekspor satu pintu untuk komoditas strategis melalui PT Danantara Sumberdaya Indonesia mulai diterapkan pada 1 Juni 2026. Tahap awal implementasi mencakup ekspor batu bara, minyak kelapa sawit, dan ferro alloy.\nTempo/Amston Probel Kepala Badan Pengaturan BUMN Dony Oskaria (kanan) dan Menteri Keuangan Purbaya Yudhi Sadewa dalam konferensi pers persiapan operasional PT Danantara Sumberdaya Indonesia di Jakarta, 31 Mei 2026. Tempo/Amston Probel Kepala Badan Pengaturan BUMN Dony Oskaria (kanan), Menteri Keuangan Purbaya Yudhi Sadewa, Menteri Koordinator Perekonomian Airlangga Hartarto, dan Kepala Badan Komunikasi Pemerintah M. Qodari dalam konferensi pers persiapan operasional PT Danantara Sumberdaya Indonesia di Jakarta, 31 Mei 2026. Tempo/Amston Probel"
    },
    {
        "title": "Mas Bahlil Ganteng dan Lagu Publik",
        "source": "tempo",
        "summary": "MARI kita bahas tema receh yang menarik. Pada akhir April 2026, akun TikTok @VOKALIS_NETIZEN mengunggah sebuah jingle pendek yang tak terduga akan mengisi lini masa media sosial Indonesia selama berpekan-pekan, bahkan viral hingga kini."
    },
    {
        "title": "Potret Keterampilan Anak Suku Bajo di Pulau Labengki",
        "source": "tempo",
        "summary": "Anak suku Bajo bermain di laut Pulau Labengki, Konawe Utara, Sulawesi Tenggara, 29 Mei 2026. Orang tua suku Bajo sejak dini melatih anak-anak mereka untuk terbiasa dengan laut. Keterampilan seperti mendayung, berenang, memancing, dan menyelam tanpa alat bantu sering kali diajarkan sebagai bagian dari kehidupan sehari-hari dan bermain, bahkan sebelum anak-anak tersebut belajar membaca. Antara/Jojon Anak suku Bajo bermain di laut Pulau Labengki, Konawe Utara, Sulawesi Tenggara, 29 Mei 2026. Antara/Jojon Keindahan bawah laut di Pulau Labengki, Konawe Utara, Sulawesi Tenggara, 29 Mei 2026. Antara/Jojon"
    },
    {
        "title": "Anggaran yang Dihabiskan Sekali Kunjungan Prabowo ke Paris",
        "source": "tempo",
        "summary": "KEDATANGAN Presiden Prabowo Subianto di Paris, Prancis, disambut oleh Menteri Tenaga Kerja dan Solidaritas Prancis Jean-Pierre Farandou pada Selasa, 26 Mei 2026. Setelah menempuh penerbangan selama 16 jam Jakarta-Paris, Prabowo dan rombongan bergegas melanjutkan perjalanan dari bandar udara menuju hotel tempat mereka menginap di Paris."
    },
    {
        "title": "Komunitas BMX Gelar Gowes Bersama di Bandung",
        "source": "tempo",
        "summary": "Penggemar sepada BMX dari berbagai komunitas gowes bareng dalam acara halal bihalal \"BMX Around The City\" di Bandung, Jawa Barat, 31 Mei 2026. Ratusan penggemar BMX dari berbagai kota berkumpul, saling berinteraksi, dan bersepeda keliling kota. Tempo/Prima Mulia Penggemar sepada BMX dari berbagai komunitas gowes bareng dalam acara halal bihalal \"BMX Around The City\" di Bandung, Jawa Barat, 31 Mei 2026. Tempo/Prima Mulia Sepada BMX dalam acara halal bihalal \"BMX Around The City\" di Bandung, Jawa Barat, 31 Mei 2026. Tempo/Prima Mulia"
    },
    {
        "title": "Sejarah Kritik Sosial Lewat Lagu di Indonesia",
        "source": "tempo",
        "summary": "INDONESIA memiliki sejarah panjang soal kritik sosial lewat lagu. Pada masa Orde Baru, ketika ruang kritik begitu sempit, musik menjadi satu medium yang kuat untuk menyampaikan keresahan sosial. Balada seperti “Bongkar” dan \"Surat Buat Wakil Rakyat\" dari Iwan Fals menggema sebagai suara perlawanan. Liriknya lugas menyuarakan kemarahan terharap penindasan dan kesewenang-wenangan kekuasaan."
    },
    {
        "title": "Tradisi Maaf Waisak Lintas Agama di Dusun Thekelan",
        "source": "tempo",
        "summary": "Umat Buddha merayakan Hari Raya Waisak melalui tradisi saling bersalaman dan memaafkan di Dusun Thekelan, Kabupaten Semarang, Jawa Tengah, 31 Mei 2026. Prosesi salam-salaman tersebut turut diikuti oleh umat beragama lain, di antaranya Islam dan Kristen. Tradisi turun-temurun ini terus dilestarikan demi menjaga toleransi serta kerukunan antarumat beragama di dusun lereng Gunung Merbabu tersebut. Tempo/Budi Purwanto Umat Buddha merayakan Hari Raya Waisak melalui tradisi saling bersalaman dan memaafkan di Dusun Thekelan, Kabupaten Semarang, Jawa Tengah, 31 Mei 2026. Tempo/Budi Purwanto Umat Buddha merayakan Hari Raya Waisak melalui tradisi saling bersalaman dan memaafkan di Dusun Thekelan, Kabupaten Semarang, Jawa Tengah, 31 Mei 2026. Tempo/Budi Purwanto"
    },
    {
        "title": "Menguak Misteri Stupa Kuno Abad ke-8 di Teras Boyolali",
        "source": "tempo",
        "summary": "Tim arkeolog dari Balai Pelestarian Kebudayaan (BPK) Wilayah X Jawa Tengah meneliti lokasi penemuan stupa kuno di Desa Nepen, Kecamatan Teras, Kabupaten Boyolali, Jawa Tengah, 30 Mei 2026. Batu besar berukuran tinggi 1,25 meter dan diameter 1,30 meter tersebut dipastikan merupakan stupa peninggalan masa klasik periode Hindu-Buddha. Tim arkeolog berhasil mengidentifikasi struktur bangunan yang terdiri dari prasada (kaki stupa), anda (badan stupa), harmika, dan yasti (puncak stupa). Objek cagar budaya ini diperkirakan berasal dari sekitar abad ke-8 hingga ke-10 Masehi. Tempo/Septhia Ryanthie Lokasi penemuan stupa kuno di Desa Nepen, Kecamatan Teras, Kabupaten Boyolali, Jawa Tengah, 30 Mei 2026. Tempo/Septhia Ryanthie Tim arkeolog dari Balai Pelestarian Kebudayaan (BPK) Wilayah X Jawa Tengah meneliti lokasi penemuan stupa kuno di Desa Nepen, Kecamatan Teras, Kabupaten Boyolali, Jawa Tengah, 30 Mei 2026. Tempo/Septhia Ryanthie"
    },
    {
        "title": "150 Penari Topeng Meriahkan Hari Tari Sedunia di TMII",
        "source": "tempo",
        "summary": "Seniman membawakan Tari Topeng di Taman Mini Indonesia Indah (TMII), Jakarta, 30 Mei 2026. Dalam rangka merawat kebudayaan nasional sekaligus memperingati Hari Tari Sedunia, TMII menggelar pertunjukan Tari Topeng massal yang diikuti oleh 150 penari dari berbagai daerah di Indonesia. Antara/Rivan Awal Lingga Seniman membawakan Tari Topeng di Taman Mini Indonesia Indah (TMII), Jakarta, 30 Mei 2026. Antara/Rivan Awal Lingga Seniman membawakan Tari Topeng di Taman Mini Indonesia Indah (TMII), Jakarta, 30 Mei 2026. Antara/Rivan Awal Lingga"
    },
    {
        "title": "Begini Cara Bedakan Layanan PayLater Indonesia yang Resmi",
        "source": "tempo",
        "summary": "INFO NASIONAL - Kemudahan untuk bertransaksi sekarang dan membayar di kemudian hari kini sudah menjadi bagian dari gaya hidup digital masyarakat. Mulai dari urusan belanja kebutuhan harian, membeli tiket perjalanan, hingga membayar tagihan bulanan, semuanya bisa diselesaikan dengan cepat. Tidak heran jika popularitas layanan paylater Indonesia terus meroket, karena menawarkan fleksibilitas yang nyata bagi pengelolaan arus kas harian. Namun, di tengah tingginya minat masyarakat, muncul tantangan baru yang wajib diwaspadai, yakni maraknya aplikasi pinjaman online (pinjol) ilegal yang berkedok sebagai penyedia paylater. Jika tidak hati-hati dalam memilih, alih-alih mendapatkan kemudahan finansial, kamu justru bisa terjerat masalah hukum, bunga selangit yang mencekik, hingga penyalahgunaan data pribadi. Agar tidak salah melangkah, berikut cara mudah membedakan layanan paylater yang resmi dan aman:"
    },
    {
        "title": "Jejak Emas Peradaban Buddha di Nusantara",
        "source": "tempo",
        "summary": "Candi Borobudur dari Punthuk Setumbu, Magelang, Jawa Tengah, 1 November 2015. Peninggalan Dinasti Syailendra ini merupakan candi Buddha terbesar di dunia dengan 2.672 panel relief. Sebagai pusat spiritual penting, situs purbakala ini rutin dipadati umat lintas negara setiap Hari Raya Waisak untuk mengikuti prosesi sakral hingga pelepasan lampion pencerahan batin. Tempo/Subekti Candi Sewu di dalam kawasan Taman Arkeologi Prambanan, Kabupaten Klaten, Jawa Tengah, 7 April 2012. Menjadi candi Buddha terbesar kedua di Indonesia peninggalan era Mataram Kuno, situs dengan 249 bangunan perwara ini berdiri berdampingan langsung dengan kompleks candi Hindu. Kedekatan tata letak geografis tersebut merekam jejak nyata sejarah toleransi dan kerukunan umat beragama yang kokoh di Nusantara sejak masa lampau. Tempo/Subekti Candi Muaro Jambi di Desa Muara Jambi, Kecamatan Maro Sebo, Kabupaten Muaro Jambi, Jambi, 29 Oktober 2018. Sebagai kompleks percandian Hindu-Buddha terluas di Asia Tenggara, situs ini dahulu merupakan mahavihara dan pusat pendidikan Buddhisme dunia menurut catatan biksu I-Tsing. Kini, Candi Muaro Jambi berfungsi sebagai living monument tempat ibadah dan lokasi utama perayaan Waisak di Sumatera. Shutterstock"
    },
    {
        "title": "BPIP Sebut Proses Seleksi Paskibraka di Sulsel Sesuai Aturan",
        "source": "tempo",
        "summary": "BADAN Pembinaan Ideologi Pancasila (BPIP) mengklaim tak ada diskriminasi dalam seleksi anggota Pasukan Pengibar Bendera Pusaka (Paskibraka) tingkat nasional 2026 di Sulawesi Selatan. Wakil Kepala BPIP Rima Agristina mengatakan lembaganya memantau proses seleksi Paskibraka itu. \"Kami pastikan bahwa setiap proses juga dimonitor oleh BPIP. Jadi tidak ada tindakan diskriminasi tersebut,\" ujarnya di Jakarta, seperti dikutip dari saluran YouTube BPIP, Jumat, 29 Mei 2026. Rima mengatakan pemerintah daerah sudah menjelaskan isu tersebut. BPIP juga sudah mengirim tim untuk mengecek. Dia menyatakan seleksi itu sesuai dengan aturan."
    },
    {
        "title": "10 Sekolah Rakyat Akan Berdiri di Jakarta",
        "source": "tempo",
        "summary": "SEKRETARIAT Kabinet mengumumkan akan ada sepuluh sekolah rakyat di Jakarta dalam waktu dekat. Sekretaris Kabinet Teddy Indra Wijaya dan Menteri Sosial Saifullah Yusuf membahas wacana itu saat bertemu pada Sabtu, 30 Mei 2026. Menurut keterangan Sekretariat Kabinet, pemerintah telah meninjau sejumlah sekolah di Jakarta yang akan menjadi sekolah rakyat. \"Termasuk sekolah-sekolah yang telah ditinjau bulan lalu,\" seperti tertulis dalam keterangan itu, Ahad, 31 Mei 2026. Rencananya, sepuluh sekolah rakyat di Jakarta akan menampung 1.000 siswa kurang mampu. Mereka termasuk anak-anak yang tidak bersekolah, putus sekolah, hingga anak jalanan."
    },
    {
        "title": "Kata Ahli soal Anak Bupati Positif Ganja tanpa Mengkonsumsi",
        "source": "tempo",
        "summary": "ANAK Bupati Pelalawan berinisial FA dinyatakan positif menggunakan narkoba golongan I jenis ganja tanpa terbukti mengkonsumsinya. Polisi mengklaim FA terpapar asap ganja saat berada di kamar mandi salah satu tempat hiburan malam. Guru Besar Farmasi Universitas Gadjah Mada Zullies Ikawati mengatakan, secara ilmiah, kemungkinan seseorang mendapat hasil positif tetrahydrocannabinol (THC) karena pasif menghirup asap ganja memang ada, tapi sangat bergantung pada kondisi paparannya. Menurut Zullies, THC bisa terdeteksi dalam urine atau darah orang yang tidak turut mengkonsumsi ganja apabila terpapar asap di ruang tertutup dan ventilasi buruk dengan konsentrasi asap sangat tinggi dan berlangsung cukup lama."
    },
    {
        "title": "Jemaah Haji Asal Bangkalan Telat Terima Makanan di Mina",
        "source": "tempo",
        "summary": "KEMENTERIAN Haji dan Umrah buka suara soal jemaah haji Indonesia asal Bangkalan tidak mendapat makanan karena masalah distribusi. Jemaah haji asal Bangkalan yang tergabung dalam kelompok terbang SUB-72 itu dikabarkan terlambat mendapatkan makanan saat berada di Mina, Arab Saudi. Juru bicara Kementerian Haji dan Umrah, Ichsan Marsha, mengatakan peristiwa tersebut terjadi pada hari pertama kedatangan jemaah di Mina pada Rabu, 27 Mei 2026. Berdasarkan hasil penelusuran di lapangan, ditemukan adanya ketidaksesuaian prosedur distribusi konsumsi antara pihak syarikah dan petugas pengawas konsumsi di Markaz 71. “Makanan yang seharusnya diserahkan kepada petugas pengawas konsumsi untuk kemudian didistribusikan kepada jemaah ternyata langsung diletakkan oleh pihak syarikah di area tengah gang tanpa pemberitahuan kepada petugas yang bertanggung jawab,” kata Ichsan dalam keterangan tertulisnya pada Sabtu, 30 Mei 2026."
    },
    {
        "title": "Ritual Melasti, Bagian dari Rangkaian Yadnya Kasada",
        "source": "tempo",
        "summary": "Masyarakat Tengger membawa sesaji ketika mengikuti ritual Melasti di kawasan Taman Nasional Bromo Tengger Semeru (TNBTS), Kabupaten Probolinggo, Jawa Timur, 30 Mei 2026. Ritual tersebut merupakan bagian dari rangkaian Yadnya Kasada yang dilakukan sebagai sarana penyucian diri sebelum puncak pelaksanaan upacara adat masyarakat Tengger. ANTARA/Irfan Sumanjaya Masyarakat Tengger membawa sesaji ketika mengikuti ritual Melasti di kawasan Taman Nasional Bromo Tengger Semeru (TNBTS), Kabupaten Probolinggo, Jawa Timur, 30 Mei 2026. ANTARA/Irfan Sumanjaya Ritual Melasti di kawasan Taman Nasional Bromo Tengger Semeru (TNBTS), Kabupaten Probolinggo, Jawa Timur, 30 Mei 2026. ANTARA/Irfan Sumanjaya"
    },
    {
        "title": "Kemendikti Akan Tutup Prodi yang Tak Relevan dengan Industri",
        "source": "tempo",
        "summary": "KEMENTERIAN Pendidikan Tinggi, Sains, dan Teknologi berencana menutup berbagai program studi yang dinilai kurang relevan dengan kebutuhan industri pertumbuhan ekonomi di masa depan. Rencana ini disampaikan oleh Sekretaris Jenderal Kemendiktisaintek Badri Munir Sukoco dalam Simposium Nasional Kependudukan Tahun 2026 di Kabupaten Badung, Bali, pada Kamis, 23 April 2026. Badri mengatakan rencana ini akan dieksekusi dalam waktu dekat. Ia lantas meminta perguruan tinggi memiliki kerelaan hati untuk menyeleksi prodi apa saja yang perlu ditutup. “Nanti mungkin ada beberapa yang harus kami eksekusi dalam waktu tidak terlalu lama terkait dengan prodi-prodi, perlu kita pilih, kita pilah, dan kalau perlu ditutup untuk bisa meningkatkan relevansi,” kata Badri Munir Sukoco, dipantau dari siaran ulang Youtube Kementerian Kependudukan dan Pembangunan Keluarga."
    },
    {
        "title": "Hasil Final Singapore Open: Ditekan Ganda India, Fajar/Fikri Runner-up",
        "summary": "KOMPAS.com - Fajar Alfian/Muhammad Shohibul Fikri harus mengakui keunggulan ganda India, Satwiksairaj Rankireddy/Chirag Shetty, di final Singapore Open 2026. Pertandingan final Singapore Open 2026 berlangsung di Singapore Indoor Stadium pada Minggu (32/5/2026). Fajar Alfian/Muhammad Shohibul Fikri kalah rubber game 21-18, 17-21, 16-21. Awal gim pertama menciptakan keunggulan Fajar/Fikri secara permainan. Mereka langsung melancarkan drive tajam dan meraih skor 5-3.",
        "source": "kompas"
    },
    {
        "title": "Link Live Streaming MotoGP Italia 2026 Sesi Race",
        "summary": "KOMPAS.com - MotoGP Italia 2026 sesi race akan berlangsung pada Minggu (31/5/2026) pukul 19.00 WIB di Sirkuit Mugello. Balapan ini menjadi seri ketujuh dalam kalender MotoGP 2026 dan diprediksi menghadirkan persaingan ketat di papan atas klasemen MotoGP. Penggemar MotoGP di Indonesia bisa menyaksikan balapan melalui siaran langsung Trans7 serta live streaming SPOTV di Vidio.",
        "source": "kompas"
    },
    {
        "title": "Jenazah Ryamizard Ryacudu Tiba di Rumah Duka di Cikeas, Tangis Keluarga Pecah",
        "summary": "JAKARTA, KOMPAS.com - Jenazah Mantan Menteri Pertahanan (Menhan) Ryamizard Ryacudu tiba di rumah duka di Cikeas, Bogor, Jawa Barat. Berdasarkan pantauan Kompas.com, mobil yang membawa jenazah Almarhum Ryamizard tiba pukul 16.55 WIB. Kedatangan Ryamizard langsung disambut pecah tangis keluarga.",
        "source": "kompas"
    },
    {
        "title": "9 Alasan Perhimpunan Guru Tolak Bahasa Perancis Jadi Pelajaran Wajib",
        "summary": "KOMPAS.com - Perhimpunan Pendidikan dan Guru (P2G) menolak jika pemerintah ingin menjadikan bahasa Perancis sebagai mata pelajaran wajib di sekolah. Koordinator Nasional P2G Satriwan Salim mengatakan, ada beberapa alasan yang membuat P2G menolak rencana tersebut. Alasan tolak bahasa Perancis jadi mapel wajib",
        "source": "kompas"
    },
    {
        "title": "Kekuatan Hukum SIM Digital Setara SIM Fisik, Begini Cara Membuatnya",
        "summary": "JAKARTA, KOMPAS.com - Korps Lalu Lintas (Korlantas) Polri memastikan keabsahan Surat Izin Mengemudi (SIM) digital melalui aplikasi Digital Korlantas setara dengan SIM fisik. Hal ini diutarakan Direktur Registrasi dan Identifikasi (Dirregident) Korlantas Polri Brigjen Pol Wibowo beberapa waktu lalu. \"SIM digital memiliki kekuatan hukum yang sama dengan SIM kartu elektronik atau fisik,\" katanya.",
        "source": "kompas"
    },
    {
        "title": "BYD M6 DM Classic Jadi Varian Termurah, Dapat Apa Saja?",
        "summary": "JAKARTA, KOMPAS.com - PT BYD Motor Indonesia memastikan BYD M6 DM Classic akan menjadi varian terendah pada lini M6 DM yang segera dipasarkan di Indonesia. Kepastian tersebut sekaligus menjawab spekulasi yang muncul setelah unit BYD M6 DM Classic terlihat di jaringan diler. “Ya betul, yang Classic (varian terendah dari M6 DM),” ujar Head of Public & Government Relations PT BYD Motor Indonesia, Luther Panjaitan, kepada Kompas.com, Jumat (29/5/2026).",
        "source": "kompas"
    },
    {
        "title": "Kemenangan KO Sunan dan Lelang Foto Ellyas Pical Warnai Pattimura International Big Fight 2026",
        "summary": "KOMPAS.com - Dua petinju Indonesia, Sunan Agung Amoragam dan Noldi Mahakane, berhasil menorehkan kemenangan pada Kejuaraan Tinju Amatir Profesional (Ampro) bertajuk Pattimura International Big Fight 2026. Kedua petinju tersebut sama-sama mengalahkan lawannya dari Thailand pada partai yang berlangsung di Studio LPP TVRI, Jakarta, Jumat (29/5/2026). Dalam duel gengsi tinju antara Indonesia dan Thailand itu, Sunan Agung Amoragam tampil mengesankan di kelas super bantam (55,3 kg).",
        "source": "kompas"
    },
    {
        "title": "Hasil Kualifikasi Moto3 Italia 2026: Veda Ega Start ke-13",
        "summary": "JAKARTA, KOMPAS.com - Pebalap muda kebanggaan Indonesia, Veda Ega Pratama, kembali menunjukkan taji dan potensinya yang menjanjikan di panggung kejuaraan dunia. Tampil pada seri Moto3 Italia 2026 yang berlangsung di Sirkuit Mugello, pebalap asal Gunungkidul, Yogyakarta, ini sanggup meraih hasil start yang cukup baik saat melakoni sesi kualifikasi yang sengit. Performa apik Veda sejatinya sudah terlihat sejak rangkaian sesi latihan bebas atau Free Practice (FP) dimulai. Berkat konsistensi dan catatan waktu yang memuaskan selama latihan, Veda berhasil mengamankan tempat untuk langsung lolos dan mengikuti sesi kualifikasi utama atau Q2, tanpa harus merangkak dari Q1 terlebih dahulu. Namun, atmosfer di Sirkuit Mugello yang terkenal teknis dan menuntut konsentrasi tinggi membuat jalannya sesi kualifikasi tidak berjalan mudah bagi sang rider. Persaingan ketat di kelas Moto3 memaksa setiap pebalap untuk langsung tancap gas sejak menit-menit awal demi mencari slipstream dan mencetak waktu terbaik.",
        "source": "kompas"
    },
    {
        "title": "“Kamu Berbohong Terus”, Teguran Keras Kapolres untuk Owner WO Marwah",
        "summary": "JAKARTA, KOMPAS.com - Kapolres Metro Jakarta Timur Kombes Pol Alfian Nurrizal melontarkan teguran keras kepada pemilik Wedding Organizer (WO) Marwah yang diduga terlibat kasus penipuan terhadap puluhan calon pengantin. Momen tersebut terjadi saat pertemuan antara para korban dan pihak yang diduga sebagai pelaku di Polres Metro Jakarta Timur. Video pertemuan itu kemudian diunggah melalui akun TikTok resmi Alfian, @alfiannurrizal.id dan beredar luas di media sosial.",
        "source": "kompas"
    },
    {
        "title": "Berlaku Besok, Eksportir CPO hingga Batu Bara Harus Lapor ke PT DSI",
        "summary": "JAKARTA, KOMPAS.com - Menteri Koordinator (Menko) Bidang Perekonomian Airlangga Hartarto memastikan kebijakan ekspor satu pintu melalui PT Danantara Sumber Daya Indonesia (DSI) mulai berlaku besok, Senin (1/6/2026). Ia mengatakan, implementasi ini merupakan tahap transisi sebelum diterapkan secara penuh per 1 Januari 2027 mendatang. Pada periode ini, para eksportir produk minyak mentah kelapa sawit (crude palm oil/CPO), batu bara, dan paduan besi (ferro alloy) tetap melakukan ekspor seperti biasa, namun seluruh kegiatannya harus dilaporkan.",
        "source": "kompas"
    },
    {
        "title": "Denza D9 Tak Lagi Inden, tapi Stok Warna Favorit Menipis",
        "summary": "JAKARTA, KOMPAS.com – Setelah sempat mengalami antrean pemesanan hingga tiga bulan saat pertama kali meluncur di Indonesia pada pertengahan 2025, kini konsumen yang mengincar Denza D9 tak lagi harus menunggu lama. Stok MPV premium listrik dari Denza tersebut saat ini diklaim masih tersedia di jaringan diler, sehingga proses pembelian dapat dilakukan tanpa inden panjang seperti pada masa awal peluncuran. CEO Haka Auto, Hariyadi Kaimuddin, mengatakan permintaan terhadap Denza D9 masih tergolong tinggi.",
        "source": "kompas"
    },
    {
        "title": "Bocoran Harga BYD M6 DM, Varian Termurah Hanya Segini",
        "summary": "JAKARTA, KOMPAS.com – Bocoran harga BYD M6 DM mulai beredar menjelang peluncuran resminya di Indonesia. Berdasarkan informasi yang diterima Kompas.com dari tenaga penjual, model plug-in hybrid electric vehicle (PHEV) tersebut diperkirakan akan dipasarkan mulai Rp 310 jutaan. Meski demikian, tenaga penjual BYD mengatakan harga yang saat ini beredar masih bersifat sementara dan berpotensi berubah saat peluncuran resmi.",
        "source": "kompas"
    },
    {
        "title": "Telat Ganti Oli Lebih dari Setahun, Amankah buat Mesin Mobil?",
        "summary": "JAKARTA, KOMPAS.com - Ketika oli mesin tidak diganti dalam waktu yang lama, pertanyaan yang sering muncul adalah apakah kondisi mesin masih bisa diselamatkan atau justru sudah telanjur mengalami kerusakan. Risiko ini semakin besar jika kendaraan tetap digunakan meski usia oli sudah melewati rekomendasi pabrikan hingga lebih dari satu tahun. Salah satu dampak yang kerap muncul akibat keterlambatan penggantian oli adalah terbentuknya sludge atau endapan lumpur oli di dalam mesin. Endapan tersebut dapat mengganggu proses pelumasan dan membuat kinerja mesin menurun.",
        "source": "kompas"
    },
    {
        "title": "Bocoran Harga Chery Q, di Bawah Rp 230 Juta?",
        "summary": "JAKARTA, KOMPAS.com – Chery memberi sinyal kuat bahwa mobil listrik terbarunya, Chery Q, akan dipasarkan dengan harga di bawah Rp 230 juta. Bahkan, konsumen yang sudah melakukan pemesanan awal dijanjikan mendapatkan pengembalian uang tanda jadi secara penuh apabila harga resmi nantinya melebihi angka tersebut. Informasi tersebut disampaikan tenaga penjual Chery kepada Kompas.com. Saat ini, konsumen sudah bisa melakukan pre-booking dengan membayar uang tanda jadi sebesar Rp 5 juta untuk mendapatkan nomor antrean.",
        "source": "kompas"
    },
    {
        "title": "Kapan Pabrik Mobil Listrik BYD di Subang Mulai Beroperasi?",
        "summary": "JAKARTA, KOMPAS.com - Pembangunan pabrik BYD di Indonesia semakin mendekati tahap akhir. Pabrikan kendaraan listrik asal China tersebut mengungkapkan bahwa fasilitas manufakturnya di Subang, Jawa Barat, kini sudah memasuki fase final sebelum resmi beroperasi penuh. Kabar ini menjadi sinyal penting bagi industri otomotif nasional, mengingat pabrik BYD di Indonesia digadang-gadang sebagai salah satu fasilitas produksi kendaraan listrik terbesar di Asia Tenggara. Head of Public & Government Relations PT BYD Motor Indonesia, Luther Panjaitan, mengatakan progres pembangunan pabrik terus berjalan sesuai rencana.",
        "source": "kompas"
    },
    {
        "title": "Perawatan Mobil Listrik: Optimalkan Baterai dan Pahami Fitur ADAS",
        "summary": "JAKARTA, KOMPAS.com – Pemilik mobil listrik perlu memperhatikan sejumlah hal untuk menjaga performa kendaraan tetap optimal, terutama terkait penggunaan baterai dan pembaruan perangkat lunak atau software. Aftersales Service Operation Manager Jaecoo, Bayu Agus Mustofa, mengatakan salah satu hal yang perlu dihindari adalah membiarkan kapasitas baterai turun terlalu rendah. \"Hindari baterai di bawah 10 persen atau di-discharge. Karena ini untuk menjaga kesehatan sel dari baterai tersebut,\" ujar Bayu, saat ditemui di Jakarta Utara, belum lama ini.",
        "source": "kompas"
    },
    {
        "title": "Kemendikdasmen Minta Anak SMK Tak Minder, Banyak Peluang Kerja ke Luar Negeri",
        "summary": "KOMPAS.com - Direktur Jenderal Pendidikan Menengah dan Pendidikan Khusus Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen), Tatang Muttaqin mengingatkan agar lulusan SMK tidak berkecil hati saat mencari pekerjaan di luar negeri Sebab, kata Tatang, saat ini yang dicari bukan orang yang hanya memahami teori tetapi juga orang yang memang memiliki kemampuan, disiplin, mau belajar dan mudah beradaptasi. \"Jangan minder jadi anak SMK karena dunia hari ini tidak hanya mencari orang pintar, tetapi juga orang terampil, disiplin, dan mau belajar. Masa depan bukan milik mereka yang paling banyak teori, tapi milik mereka yang siap beradaptasi dan berani melangkah ke luar batas,\" kata Tatang dikutip dari keterangan tertulis, Sabtu (30/5/2026).",
        "source": "kompas"
    },
    {
        "title": "Upgrade Gadget di Blibli XPO 2026, Dapat Diskon hingga Rp 5 Juta",
        "summary": "JAKARTA, KOMPAS.com – Momentum belanja pertengahan tahun dimanfaatkan PT Global Digital Niaga Tbk (BELI) atau Blibli melalui penyelenggaraan Blibli XPO 2026. Pameran teknologi tersebut berlangsung pada 27 sampai 31 Mei 2026 di Main Atrium Grand Indonesia East Mall, Jakarta. Melalui entitas anak usahanya, PT Global Teknologi Niaga (GTNi), perusahaan menghadirkan berbagai penawaran untuk konsumen yang ingin membeli atau mengganti perangkat elektronik seperti smartphone, laptop, smartwatch, hingga perangkat wearable terbaru.",
        "source": "kompas"
    },
    {
        "title": "Google Search Kini Mirip ChatGPT, Link Website Tak Lagi Jadi Prioritas",
        "summary": "KOMPAS.com - Google untuk pertama kalinya dalam lebih dari 25 tahun merombak tampilan kotak pencariannya. Perubahan besar ini diumumkan dalam ajang Google I/O 2026 yang berlangsung Selasa (20/5/2026) di markas Google, dan disebut sebagai salah satu transformasi terbesar sejak mesin pencari ini pertama kali hadir pada akhir 1990-an. Kotak pencarian yang selama ini dikenal dengan desain sederhana kini dibuat lebih panjang dan lebih canggih untuk mendukung pencarian berbasis AI. Google menyebut desain barunya ini sebagai \"Intelligent Search Box\".",
        "source": "kompas"
    },
    {
        "title": "Menanggung Anak dan Orangtua Sekaligus? Ini Cara Mengatur Keuangan",
        "summary": "JAKARTA, KOMPAS.com - Generasi sandwich semakin menjadi fenomena yang banyak dibahas seiring meningkatnya harapan hidup masyarakat dan bertambahnya kebutuhan ekonomi keluarga. Kelompok ini merujuk pada individu yang berada di posisi “terjepit” karena harus menanggung kebutuhan dua generasi sekaligus, yakni anak-anak yang masih bergantung secara finansial dan orangtua yang memasuki usia lanjut. Dikutip dari Britannica, Minggu (31/5/2026), istilah generasi sandwich menggambarkan orang-orang yang harus membagi waktu, tenaga, perhatian, serta sumber daya keuangan untuk anak dan orangtua pada saat bersamaan.",
        "source": "kompas"
    },
    {
        "title": "Nilai Rata-rata TKA SD SMP 2026 Sekolah Negeri-Swasta, Mana Tertinggi?",
        "summary": "KOMPAS.com - Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) telah merilis nilai rerata Tes Kemampuan Akademik (TKA) jenjang SD dan SMP sederajat 2026. Tidak hanya nilai rerata TKA nasional dan daerah, ternyata Kemendikdasmen juga merilis data nilai rata-rata di sekolah SD dan SMP baik di sekolah negeri ataupun swasta. Selain nilai rata-rata, Kemendikdasmen juga memberikan informasi seputar simpangan baku atau standar deviasi dari nilai-nilai di setiap jenjang pendidikan.",
        "source": "kompas"
    },
    {
        "title": "Pendaftaran Pelatihan Vokasi Kemnaker Dibuka hingga 9 Juni 2026",
        "summary": "JAKARTA, KOMPAS.com – Kementerian Ketenagakerjaan (Kemnaker) kembali membuka Program Pelatihan Vokasi Nasional Tahap 2 yang dapat diikuti masyarakat untuk meningkatkan keterampilan sekaligus memperbesar peluang masuk ke dunia kerja. Pendaftaran program ini dibuka mulai 19 Mei hingga 9 Juni 2026 dengan menyediakan 24 kejuruan yang disusun berdasarkan kebutuhan dunia usaha dan industri. Menteri Ketenagakerjaan, Yassierli, mengatakan pelatihan vokasi menjadi salah satu langkah strategis pemerintah untuk mempercepat kesiapan kerja masyarakat melalui pembelajaran yang berorientasi pada praktik.",
        "source": "kompas"
    },
    {
        "title": "Jangan Asal Menepi, Berhenti di Pinggir Jalan Punya Risiko Besar",
        "summary": "JAKARTA, KOMPAS.com - Saat kendaraan mengalami masalah di tengah perjalanan, banyak pengemudi memilih langsung menepi ke pinggir jalan. Padahal, tindakan tersebut tidak selalu aman, terutama jika dilakukan tanpa memperhatikan kondisi lalu lintas dan prosedur keselamatan. Training Director Safety Defensive Consultant Indonesia (SDCI) Sony Susmana mengatakan, pada prinsipnya kendaraan tidak disarankan berhenti di pinggir jalan. Sebab, keberadaan kendaraan yang diam di area tersebut dapat menimbulkan risiko bagi pengemudi maupun pengguna jalan lainnya. \"Masalahnya ada pada mindset saat berhenti. Berhenti itu tidak disarankan di pinggir jalan. Kalau memang terpaksa, pengemudi harus sangat waspada dan menerapkan prosedur keselamatan,\" kata Sony kepada Kompas.com belum lama ini.",
        "source": "kompas"
    },
    {
        "title": "Rupiah Melemah, Purbaya Yakin Tekanan Akan Mereda dalam Beberapa Bulan",
        "summary": "JAKARTA, KOMPAS.com – Menteri Keuangan Purbaya Yudhi Sadewa, menilai tekanan terhadap nilai tukar rupiah berpotensi mereda dalam beberapa bulan ke depan seiring membaiknya kondisi geopolitik global. Purbaya mengatakan perkembangan hubungan antara Amerika Serikat, Iran, dan Israel menunjukkan sinyal positif yang dapat meningkatkan stabilitas keamanan dan ekonomi global. Kondisi tersebut diyakini akan turut membantu memperkuat nilai tukar rupiah yang belakangan berada dalam tekanan.",
        "source": "kompas"
    },
    {
        "title": "Dampak DSI ke Penerimaan Negara Akan Dievaluasi Setiap Tiga Bulan",
        "summary": "JAKARTA, KOMPAS.com - Pemerintah akan melakukan evaluasi berkala setiap tiga bulan untuk mengukur dampak implementasi PT Danantara Sumberdaya Indonesia (DSI) terhadap penerimaan negara. Evaluasi tersebut dilakukan seiring dimulainya penerapan kebijakan tata kelola ekspor komoditas sumber daya alam strategis melalui mekanisme satu pintu. Menteri Keuangan Purbaya Yudhi Sadewa, mengatakan pemerintah masih belum dapat memperkirakan secara pasti tambahan penerimaan negara yang akan dihasilkan dari implementasi DSI.",
        "source": "kompas"
    },
    {
        "title": "Qodari Jelaskan Instruksi Prabowo soal Bahasa Prancis Masuk Sekolah",
        "summary": "Kepala Badan Komunikasi RI Muhammad Qodari menyatakan pengaturan teknis pembelajaran bahasa Prancis di sekolah akan ditindaklanjuti oleh Kementerian Pendidikan Dasar dan Menengah Menurutnya, kemampuan berbahasa asing menjadi kebutuhan penting di era global yang semakin terhubung Instruksi Presiden Prabowo Subianto itu juga sejalan dengan penguatan kerja sama Indonesia dan Prancis di berbagai sektor",
        "source": "tribun"
    },
    {
        "title": "Sudirman Said: Saatnya Masyarakat Sipil Berani Masuk ke Ruang Kebijakan",
        "summary": "Ketua Umum Panitia Konferensi Republik, Sudirman Said, menegaskan pentingnya keterlibatan masyarakat sipil dalam proses politik dan pengambilan keputusan negara. Konferensi yang digelar di UGM Yogyakarta memberi mandat kepada Sudirman dan Yanuar Nugroho untuk melanjutkan agenda forum melalui rapat kerja. Konferensi ini menjadi ruang konsolidasi nasional masyarakat sipil untuk merumuskan arah gerakan publik di tengah krisis demokrasi, ekonomi, sosial, hukum, dan ekologi.",
        "source": "tribun"
    },
    {
        "title": "Purbaya Hitung Potensi Penerimaan Negara Setelah Beroperasinya DSI",
        "summary": "Pemerintah belum menghitung secara detail potensi penerimaan negara dari dibentuknya badan ekspor PT Danantara Sumberdaya Indonesia (DSI). PT DSI akan mulai beroperasi sebagai eksportir tunggal tiga komoditas berbasis sumber daya alam yakni sawit, batu bara serta ferro alloy. TRIBUNNEWS.COM, JAKARTA - Menteri Keuangan Purbaya Yudhi Sadewa menyatakan, pemerintah belum menghitung secara detail potensi penerimaan negara dari dibentuknya badan ekspor PT Danantara Sumberdaya Indonesia (DSI).",
        "source": "tribun"
    },
    {
        "title": "Momen Iduladha, Sebar Kurban 2026 Jangkau 204 Ribu Penerima Manfaat",
        "summary": "Program Sebar Kurban 2026 menjangkau 204.184 penerima manfaat di 547 desa, 129 kabupaten/kota, dan 7 negara, dengan fokus distribusi ke wilayah pelosok serta daerah dengan akses pangan bergizi yang terbatas. Sebanyak 2.241 ekor sapi dan 5.527 ekor domba disalurkan melalui kolaborasi dengan 238 peternak lokal, sekaligus mendukung penguatan ekonomi dan ekosistem peternakan TRIBUNNEWS.COM, JAKARTA - Sebar Kurban 2026 menorehkan capaian signifikan pada momentum Iduladha tahun ini dengan menjangkau 204.184 penerima manfaat yang tersebar di 547 desa, 129 kabupaten/kota, serta 7 negara.",
        "source": "tribun"
    },
    {
        "title": "Penyumbatan Jantung Sering Tanpa Gejala, Opini Kedua Jadi Pertimbangan Penting",
        "summary": "Penyakit jantung koroner kini semakin banyak menyerang usia produktif akibat gaya hidup modern. Penyumbatan sering terdeteksi saat pemeriksaan kesehatan dan memerlukan evaluasi medis menyeluruh tepat. Second opinion membantu pasien memahami pilihan terapi terbaik berdasarkan kondisi dan kebutuhan individual.",
        "source": "tribun"
    },
    {
        "title": "Danantara Umumkan Direksi Badan Ekspor PT DSI Pekan Depan",
        "summary": "Danantara akan melakukan seleksi penerimaan sumber daya manusia (SDM) untuk ditempatkan badan ekspor PT Danantara Sumberdaya Indonesia (DSI). Hingga hari ini, baru terisi satu jabatan strategis di PT DSI yakni Luke Thomas Mahony yang menjabat sebagai direktur utama. TRIBUNNEWS.COM, JAKARTA - Chief Operating Officer (COO) BPI Danantara, Dony Oskaria menyatakan, pihaknya akan melakukan seleksi penerimaan sumber daya manusia (SDM) untuk ditempatkan badan ekspor PT Danantara Sumberdaya Indonesia (DSI).",
        "source": "tribun"
    },
    {
        "title": "Adhisty Zara Resmi Menikah dengan Tsaqib, Sekaligus Umumkan Kehamilan Pertama",
        "summary": "Adhisty Zara mengumumkan telah resmi menikah dengan musisi Tsaqib melalui unggahan bersama di Instagram pada Minggu (31/5/2026) Dalam unggahan tersebut, Zara juga mengonfirmasi dirinya tengah hamil dengan memperlihatkan baby bump pada salah satu foto Kabar ini sekaligus menjawab berbagai rumor yang sempat beredar mengenai hubungan dan kehamilannya",
        "source": "tribun"
    },
    {
        "title": "Hizbullah Disebut Serang Target Militer Israel, Satu Tentara Zionis Tewas",
        "summary": "Hizbullah menyerang sejumlah target militer Israel. Satu tentara Israel tewas dan empat lainnya terluka. Serangan disebut sebagai respons atas operasi Israel di Lebanon.",
        "source": "tribun"
    },
    {
        "title": "Meski Kondisi Kesehatan Baik, Trump Diminta agar Turunkan Berat Badan",
        "summary": "Presiden AS Donald Trump dinyatakan dalam kondisi kesehatan yang sangat baik. Namun, dokter menyarankan agar Donald Trump menurunkan berat badan. Trump disimpulkan \"sepenuhnya layak untuk melaksanakan semua tugas Panglima Tertinggi dan Kepala Negara.\"",
        "source": "tribun"
    },
    {
        "title": "Penjualan Hewan Kurban dari Peternak Lampung sampai Jakarta, Banten dan Jawa Barat",
        "summary": "Penjualan hewan kurban dari peternak Lampung sampai Jakarta, Banten dan Jawa Barat. Tujuan penjualan hewan kurban tersebut terungkap berdasar data lalu lintas ternak Disnakeswan Lampung. Produksi hewan ternak dari peternak di Lampung tidak hanya untuk memenuhi kebutuhan lokal.",
        "source": "tribun"
    },
    {
        "title": "Bulan Depan Jokowi Akan Keliling Indonesia, Pengamat: Dia Ahli Pencitraan",
        "summary": "Mantan Presiden Jokowi akan keliling Indonesia mulai Juni 2026 setelah pulih dari sakitnya. Pengamat komunikasi politik menyebut Jokowi adalah ahli pencitraan dan politisi andal. Kunjungan Jokowi akan dimulai dari Provinsi Lampung.",
        "source": "tribun"
    },
    {
        "title": "Pancasila dan Tanggung Jawab Moral Indonesia Bagi Perdamaian Dunia",
        "summary": "PERINGATAN Hari Lahir Pancasila tahun 2026 memiliki makna strategis bagi masa depan Indonesia dan peradaban dunia. Tema nasional “Pancasila Pemersatu Bangsa, Fondasi Perdamaian Dunia” menegaskan posisi Pancasila sebagai nilai hidup yang terus relevan dalam menjawab tantangan global berupa konflik kemanusiaan, krisis moral, disrupsi teknologi, krisis ekologis, hingga polarisasi sosial-politik global. Indonesia merupakan contoh nyata bangsa besar yang mampu merawat keberagaman dalam satu ikatan kebangsaan.",
        "source": "tribun"
    },
    {
        "title": "BREAKING NEWS: Mantan KSAD dan Menhan Ryamizard Ryacudu Tutup Usia",
        "summary": "Mantan KSAD sekaligus Menteri Pertahanan periode 2014–2019, Jenderal (Purn) TNI Ryamizard Ryacudu, meninggal dunia pada Minggu 31 Mei 2026, di RSPAD Gatot Soebroto, Jakarta, setelah menjalani perawatan medis. Kepergiannya meninggalkan duka mendalam bagi TNI dan pemerintahan. Ryamizard lahir di Palembang pada 21 April 1950 dan meniti karier militer sejak lulus Akabri tahun 1974. Ia pernah menjabat Pangdam V/Brawijaya, Pangdam Jaya, Panglima Kostrad, hingga menjadi KSAD periode 2002–2005.",
        "source": "tribun"
    },
    {
        "title": "Jelang Kesiapan Operasional PT Danantara Sumberdaya Indonesia",
        "summary": "",
        "source": "tribun"
    },
    {
        "title": "DPR Awasi Ketat PT DSI Agar Tak Menimbulkan Praktik Monopolistik",
        "summary": "DPR akan mengawal secara ketat implementasi PT Danantara Sumber Daya Indonesia (DSI) agar tidak menimbulkan praktik monopolistik maupun hambatan baru bagi dunia usaha. DPR akan mengawal pelaksanaan kebijakan tersebut agar tetap transparan, akuntabel, menjaga persaingan usaha yang sehat. Pelaksanaannya harus tetap menjaga persaingan usaha yang sehat serta memberikan ruang yang adil bagi pelaku usaha nasional.",
        "source": "tribun"
    },
    {
        "title": "DPR Ingatkan Risiko Praktik Monopolistik Danantara di Ekspor SDA",
        "summary": "DPR menyoroti pembentukan PT Danantara Sumber Daya Indonesia (PT DSI) sebagai eksportir tunggal komoditas strategis nasional mulai 2027. Pemerintah berencana mengonsolidasikan seluruh proses ekspor melalui PT DSI dengan skema single-window. Tanpa tata kelola profesional serta pengawasan independen, PT DSI justru berpotensi menjadi sumber inefisiensi baru yang menghambat ekspor.",
        "source": "tribun"
    },
    {
        "title": "IRGC: Iran Menang Konfrontasi, AS Masuk Fase Kemunduran Strategis",
        "summary": "IRGC menyebut Iran berhasil menggagalkan target strategis musuh, termasuk pelemahan program nuklir dan pertahanan udara. Iran mengklaim memperkuat kendali atas Selat Hormuz dan kini bernegosiasi dari posisi yang lebih kuat. Teheran memperingatkan respons militer yang lebih tegas jika terjadi serangan atau kesalahan perhitungan baru dari lawan.",
        "source": "tribun"
    },
    {
        "title": "Menangis di Final, Arsenal Justru Pecahkan Rekor Pendapatan Liga Champions",
        "summary": "Meski kalah dari PSG di final Liga Champions 2025/2026, Arsenal mencatat rekor baru dengan pendapatan tertinggi klub Inggris sebesar 145 juta poundsterling. Arsenal meraih pemasukan besar berkat performa konsisten sepanjang turnamen, bonus hasil pertandingan, pencapaian fase gugur, serta distribusi koefisien dan nilai komersial UEFA. Dana fantastis tersebut berpotensi menjadi modal penting bagi pelatih Mikel Arteta dan manajemen Arsenal untuk memperkuat skuad pada bursa transfer musim panas 2026.",
        "source": "tribun"
    },
    {
        "title": "DAIKIN Helat Program Apresiasi Bagi Teknisi",
        "summary": "",
        "source": "tribun"
    },
    {
        "title": "RUPST Agung Podomoro Land",
        "summary": "",
        "source": "tribun"
    },
    {
        "title": "Jelang Kesiapan Operasional PT Danantara Sumberdaya Indonesia",
        "summary": "",
        "source": "tribun"
    },
    {
        "title": "PKS Dorong Audit Menyeluruh Dugaan Kecurangan Ekspor Sawit",
        "summary": "Ketua MPP PKS Mulyanto, mendorong pemerintah melakukan audit menyeluruh terhadap dugaan manipulasi laporan ekspor sawit yang disebut melibatkan sejumlah perusahaan besar. Langkah tersebut penting untuk memastikan kebenaran data sekaligus menjaga kepastian hukum bagi seluruh pelaku usaha. Ia menegaskan dugaan praktik under invoicing maupun transfer pricing tidak boleh dianggap sepele.",
        "source": "tribun"
    },
    {
        "title": "Eks Menhan Ryamizard Ryacudu Meninggal Dunia, Sejumlah Pelayat Mulai Berdatangan ke Rumah Duka",
        "summary": "Mantan Menteri Pertahanan Jenderal TNI (Purn) Ryamizard Ryacudu meninggal dunia di RSPAD Gatot Soebroto, Jakarta, Minggu (31/5/2026) pukul 14.03 WIB Jenazah kemudian dibawa ke rumah duka di Perumahan Puri Wira Bhakti, Cikeas, Bogor, dan tiba sekitar pukul 16.56 WIB Sejumlah pelayat mulai berdatangan untuk memberikan penghormatan terakhir dan mendoakan almarhum",
        "source": "tribun"
    },
    {
        "title": "TNI AD Berduka, Ryamizard Ryacudu Dikenang sebagai Prajurit dan Pemimpin Teladan",
        "summary": "TNI Angkatan Darat menyampaikan duka mendalam atas wafatnya Jenderal TNI (Purn) Ryamizard Ryacudu pada Minggu (31/5/2026) Almarhum dikenang sebagai pemimpin yang tegas, berani, sederhana, dan memiliki dedikasi tinggi bagi bangsa serta negara TNI AD menilai jejak pengabdian Ryamizard, baik sebagai KSAD maupun Menteri Pertahanan, akan terus menjadi inspirasi bagi generasi penerus prajurit",
        "source": "tribun"
    },
    {
        "title": "Perusahaan Sawit di Mandailing Natal Bersedia Naikkan Harga Beli TBS",
        "summary": "Perusahaan kelapa sawit mulai menaikkan harga beli tandan buah segar (TBS) kelapa sawit pasca munculnya ancaman sanksi Kementerian Pertanian. Selama ini banyak petani yang mengeluhkan harga beli TBS oleh pabrik sementara harga kebutuhan seperti pupuk hingga BBM terus naik. Kepala daerah diminta mengidentifikasi perusahaan kelapa sawit yang melanggar Permentan, termasuk status dan jaringan afiliasinya, untuk kemudian dilaporkan ke pemerintah pusat.",
        "source": "tribun"
    }
];

dataBerita2 = [
    {
        "title": "Hasil Polytron Indonesia Open 2026: Jojo Melenggang ke Babak 16 Besar",
        "summary": "KOMPAS.com - Jonatan Christie memulai perjalanan di Polytron Indonesia Open 2026 dengan kemenangan atas Jia Heng Jason Teh asal Singapura. Babak pertama Polytron Indonesia Open 2026 bergulir di Istora Senayan pada Selasa (2/6/2026). Jonatan Christie berlaga dan menang dua gim langsung atas Jia Heng Jason Teh (21-18, 21-15). Awal gim pertama ditandai dengan dominasi Jonatan Christie atas Jason. Dia memberikan bola-bola sulit yang menghasilkan keunggulan 4-1.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/kt0Vsm0Z3tWqQoklhDloxniMSXk=/27x62:859x617/1200x800/data/photo/2026/03/04/69a8546ecf87e.jpeg",
        "link": "https://www.kompas.com/badminton/read/2026/06/02/14005088/hasil-polytron-indonesia-open-2026-jojo-melenggang-ke-babak-16-besar"
    },
    {
        "title": "Jakarta Hapus Sanksi Administrasi PKB dan BBNKB hingga 31 Agustus 2026",
        "summary": "JAKARTA, KOMPAS.com - Badan Pendapatan Daerah Provinsi DKI Jakarta memberikan kemudahan kepada masyarakat untuk menyelesaikan kewajiban pajak kendaraan bermotor melalui kebijakan relaksasi. Relaksasi pajak yang dimaksud berupa pembebasan sanksi administratif untuk Pajak Kendaraan Bermotor (PKB) dan Bea Balik Nama Kendaraan Bermotor (BBNKB), yang tertuang dalam Keputusan Kepala Badan Pendapatan Daerah Provinsi DKI Jakarta Nomor e-0018 Tahun 2026. Kepala Badan Pendapatan Daerah Provinsi DKI Jakarta, Lusiana Herawati, menyampaikan Pemerintah Provinsi DKI Jakarta akan terus berupaya menghadirkan kebijakan yang memberikan manfaat bagi masyarakat dan mendukung peningkatan kualitas hidup warga Jakarta.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/EcLlvO9nQ8a6RfUE5u_CpQkqGPQ=/0x0:780x520/1200x800/data/photo/2025/12/06/6933ea57ebcb7.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/143100215/jakarta-hapus-sanksi-administrasi-pkb-dan-bbnkb-hingga-31-agustus-2026"
    },
    {
        "title": "Sudah Terungkap, Ini Masalah Motor Ducati di MotoGP 2026",
        "summary": "JAKARTA, KOMPAS.com - Ducati yang selama beberapa musim dikenal unggul saat berakselerasi di posisi start kini menghadapi tantangan baru di MotoGP 2026. Sejumlah pebalap mengungkapkan bahwa motor terbaru pabrikan asal Italia tersebut lebih mudah mengalami wheelie saat meluncur dari garis awal. Keluhan ini muncul dari beberapa pebalap Ducati, baik di tim pabrikan maupun satelit, saat seri MotoGP Italia 2026 di Sirkuit Mugello.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/uBXYG6iHwmOVt_dgcX7loma3nd4=/10x521:1278x1366/1200x800/data/photo/2025/10/26/68fe16b7a0728.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/142100715/sudah-terungkap-ini-masalah-motor-ducati-di-motogp-2026"
    },
    {
        "title": "Suzuki Luncurkan Saudara Kembar Toyota Voxy, Pakai Mesin Hybrid",
        "summary": "JAKARTA, KOMPAS.com – Suzuki Landy yang merupakan saudara kembar Toyota Voxy dan Toyota Noah mendapatkan penyegaran di Jepang. MPV boxy tersebut kini hadir dengan sejumlah pembaruan, mulai dari tampilan yang lebih sporty, pilihan konfigurasi delapan penumpang, hingga mesin yang kini hanya tersedia dalam versi hybrid. Seperti diketahui, Suzuki Landy bukan model yang dikembangkan sendiri oleh Suzuki. Mobil ini berbagi platform dan sebagian besar komponen dengan Toyota Noah dan Voxy yang dipasarkan di Jepang. Pada model terbaru, Suzuki memberikan sentuhan baru pada eksterior. Landy kini mengadopsi bumper depan dan body kit yang sebelumnya digunakan pada varian Toyota Noah dengan spesifikasi lebih tinggi.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/JWx_UTYrgEO6l5DuPzPldOLhaKg=/220x0:2329x1406/1200x800/data/photo/2026/06/02/6a1e4a0cc9b7d.webp",
        "link": "https://otomotif.kompas.com/read/2026/06/02/110200115/suzuki-luncurkan-saudara-kembar-toyota-voxy-pakai-mesin-hybrid"
    },
    {
        "title": "Jalur Lenteng Agung Arah Depok Ditutup, Rute Transjakarta UI Berubah",
        "summary": "JAKARTA, KOMPAS.com - Jalan Raya Lenteng Agung, Jakarta Selatan, arah Depok, Jawa Barat, masih ditutup pada Selasa (2/6/2026) pagi. Kini spanduk pengumuman tentang penutupan dipasang mulai dari depan Universitas Indonesia Maju. Kemudian akses jalan yang melewati SMAN 38 Jakarta juga ditutup.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/jyeBHKq6Gb14FXiFGi23g_19lyM=/0x0:0x0/1200x800/data/photo/2026/05/31/6a1c1ffc13e93.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/114200715/jalur-lenteng-agung-arah-depok-ditutup-rute-transjakarta-ui-berubah"
    },
    {
        "title": "Prabowo Sering ke Luar Negeri, Seskab Teddy: Investasi Masuk Rp 2.430 Triliun ke RI",
        "summary": "JAKARTA, KOMPAS.com - Sekretaris Kabinet (Seskab) Letkol Teddy Indra Wijaya mengungkapkan, Presiden RI Prabowo Subianto berhasil membawa masuk investasi senilai Rp 2.430 triliun. Teddy menyebut, jumlah investasi tersebut merupakan hasil daripada Prabowo yang sering ke luar negeri dalam 1,5 tahun ini. \"Total investasi yang masuk dalam 1,5 tahun ini adalah sekitar Rp 2.430 triliun, itu data dari BKPM. Kemudian contoh konkret lagi nih, bulan lalu Presiden Prabowo ke Jepang dan Korea, kembali langsung ada investasi sekitar Rp 575 triliun,\" kata Teddy, dalam keterangan videonya, Senin (1/6/2026) malam.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/o4pB5BjhWrp2DDAFDeM1HJY1w-U=/0x0:1200x800/1200x800/data/photo/2026/06/01/6a1d47d41aadd.jpg",
        "link": "https://nasional.kompas.com/read/2026/06/02/05075131/prabowo-sering-ke-luar-negeri-seskab-teddy-investasi-masuk-rp-2430-triliun"
    },
    {
        "title": "Mobil Listrik Naik Kapal Feri, Baterai Mobil Tidak Boleh Penuh",
        "summary": "JAKARTA, KOMPAS.com – Meningkatnya populasi kendaraan listrik di Indonesia membuat aspek keselamatan transportasi penyeberangan turut menjadi perhatian. Mungkin belum banyak yang mengetahui bahwa kendaraan listrik yang akan menyeberang menggunakan kapal feri dianjurkan memiliki tingkat pengisian baterai atau state of charge (SoC) tertentu sebagai bagian dari langkah mitigasi risiko selama pelayaran. Corporate Secretary PT ASDP Indonesia Ferry (Persero), Windy Andale, menjelaskan bahwa pihaknya mengacu pada pedoman keselamatan yang diterbitkan Direktorat Jenderal Perhubungan Laut.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/NDSTU5w30EWvW3_Z3yowjzftQVM=/0x0:1040x693/1200x800/data/photo/2025/10/07/68e4fa44ec694.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/130100215/mobil-listrik-naik-kapal-feri-baterai-mobil-tidak-boleh-penuh"
    },
    {
        "title": "BGN Ingin Beri MBG untuk Anak Sekolah Indonesia Jeddah, Arab Saudi",
        "summary": "JEDDAH, KOMPAS.com - Kepala Badan Gizi Nasional (BGN) Dadan Hindayana menjajaki kemungkinan pemberian Makan Bergizi Gratis (MBG) di Sekolah Indonesia Jeddah, Arab Saudi. \"Jika disetujui oleh Presiden, ini akan menjadi percontohan pertama (MBG di luar negeri),\" kata dia saat ditemui di Bandara King Abdul Aziz Jeddah, Arab Saudi, Minggu (31/5/2026) malam. Dadan menyambangi Sekolah Indonesia Jeddah yang mendidik anak-anak Pekerja Migran Indonesia (PMI) di Jeddah pada Minggu (31/5/2026) waktu setempat.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/WoLlTmWLniS27jbR-LZ_WCgYGLc=/1x52:1271x899/1200x800/data/photo/2026/06/01/6a1d1f09639fa.jpeg",
        "link": "https://nasional.kompas.com/read/2026/06/01/12582481/bgn-ingin-beri-mbg-untuk-anak-sekolah-indonesia-jeddah-arab-saudi"
    },
    {
        "title": "Polytron Indonesia Open 2026: Adnan/Indah Tantang “Monster” China",
        "summary": "KOMPAS.com - Ganda campuran Adnan Maulana/Indah Cahya Sari Jamil membuka laga Polytron Indonesia Open 2026 dengan kemenangan. Adnan Maulana/Indah Cahya Sari Jamil atas wakil Prancis, Julien Maio/Lea Palermo, dengan skor 14-21, 21-19, 21-11 di Istora Senayan, Jakarta, Selasa (2/7/2026). Adnan/Indah belum bisa mengeluarkan permainan ternaik di gim pertama. Mereka terus tertinggal dalam perolehan angka.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/7r72xh_UUrXdKAkdzh_h9VHZ5M0=/162x23:995x579/1200x800/data/photo/2026/06/02/6a1e7027bf6e9.jpeg",
        "link": "https://www.kompas.com/badminton/read/2026/06/02/13225388/polytron-indonesia-open-2026-adnan-indah-tantang-monster-china"
    },
    {
        "title": "Fenomena Lane Hogger Menyebabkan Budaya Menyalip dari Sisi Kiri di Jalan Tol",
        "summary": "JAKARTA, KOMPAS.com - Fenomena lane hogger atau pengemudi yang terus di lajur paling kanan jalan tol masih menjadi rapor merah bagi dunia keselamatan jalan raya di Indonesia. Kebiasaan buruk ini seolah sudah mengakar. Banyak pengemudi yang merasa tidak bersalah bertahan di lajur kanan dengan alasan kecepatan kendaraannya sudah menyentuh batas maksimal 100 kpj. Melihat hal ini, Founder Jakarta Defensive Driving Consulting (JDDC) Jusri Pulubuhu angkat bicara. Menurutnya, masalah lane hogger bukan sekadar pelanggaran rambu lalu lintas belaka, melainkan cerminan dari rendahnya budaya tertib lalu lintas masyarakat kita secara keseluruhan.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/qSEhdvLE78YAZPLlpl8TypGj2vA=/0x98:833x653/1200x800/data/photo/2023/05/20/64681daaa0fc8.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/091200715/fenomena-lane-hogger-menyebabkan-budaya-menyalip-dari-sisi-kiri-di-jalan"
    },
    {
        "title": "Melaju 100 Kpj di Lajur Kanan Tol Tetap Salah? Ini Penjelasannya",
        "summary": "JAKARTA, KOMPAS.com - Mengemudi di jalan tol tidak hanya sekadar menjaga laju kendaraan sesuai dengan rambu batas kecepatan, tetapi juga memahami fungsi dan manajemen lajur yang benar. Salah satu kekeliruan fatal yang masih sering ditemui di lapangan adalah anggapan bahwa berjalan statis di lajur paling kanan diperbolehkan asalkan kecepatan mobil sudah mencapai batas tertinggi, seperti 80 kpj atau 100 kpj. Fenomena lane hogger ini kerap dipicu oleh ego pengemudi yang merasa tidak melanggar aturan karena angka di speedometer mereka sudah mentok di batas kecepatan maksimal. Mereka mengira lajur kanan adalah hak mereka selama tidak melebihi speed limit.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/nj5H-3oHWbyWu6A8hjuI94dyyCc=/46x36:1991x1333/1200x800/data/photo/2026/05/21/6a0f086723a57.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/141200215/melaju-100-kpj-di-lajur-kanan-tol-tetap-salah-ini-penjelasannya"
    },
    {
        "title": "Kemenhub Mulai Uji Coba Penanganan Truk ODOL, Ini Fokusnya",
        "summary": "JAKARTA, KOMPAS.com - Kementerian Perhubungan (Kemenhub) mulai menjalankan uji coba penanganan kendaraan over dimension dan over loading (ODOL) secara lebih luas pada 1 Juni 2026. Langkah tersebut menjadi bagian dari upaya percepatan menuju target Zero ODOL yang dicanangkan tercapai pada 2027. Direktur Jenderal Perhubungan Darat Kemenhub Aan Suhanan menyampaikan, penanganan truk ODOL tak lagi cukup dilakukan melalui pengawasan konvensional melainkan diperlukan suatu sistem yang lebih modern agar pengawasan berjalan lebih efektif dan transparan.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/WLUPICURWBtXWUe6a5K9uUACPvo=/101x12:1125x694/1200x800/data/photo/2026/04/08/69d569904bf2f.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/140100015/kemenhub-mulai-uji-coba-penanganan-truk-odol-ini-fokusnya"
    },
    {
        "title": "Libur Panjang Pekan Lalu, Trafik Tol Trans Sumatera Naik 27 Persen",
        "summary": "JAKARTA, KOMPAS.com - Volume kendaraan di jalan Tol Trans Sumatera (JTTS) mengalami peningkatan hingga 27,30 persen selama libur panjang yang bertepatan dengan Hari Raya Idul Adha, Hari Raya Waisak, serta Hari Lahir Pancasila. PT Hutama Karya (Persero) mencatat rata-rata trafik harian di seluruh ruas tol operasional mencapai 139.061 kendaraan pada 30 Mei 2026. Jumlah tersebut meningkat 27,30 persen dibandingkan kondisi lalu lintas normal. Sebagai upaya menjaga keamanan dan kenyamanan, Hutama Karya melakukan pemantauan operasional secara berkelanjutan mencakup kondisi lalu lintas di lapangan, kesiapan petugas, dan optimalisasi fasilitas pendukung.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/ryaN92AFPytcbFkmTYGVnkc1rZQ=/0x0:0x0/1200x800/data/photo/2026/03/23/69c1145be68b7.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/132100815/libur-panjang-pekan-lalu-trafik-tol-trans-sumatera-naik-27-persen"
    },
    {
        "title": "Update Perbaikan Jalan Lenteng Agung, Sudah Dibuka Sebagian",
        "summary": "JAKARTA, KOMPAS.com – Pengendara yang melintas di Jalan Raya Lenteng Agung arah Depok, Jawa Barat, harus bersabar lebih lama setelah pembukaan jalan yang sempat ambles mengalami keterlambatan dari jadwal semula. Ruas jalan tersebut sebelumnya direncanakan kembali dibuka pada Selasa (2/6/2026) pukul 05.00 WIB. Namun, hingga pagi hari akses jalan belum sepenuhnya dapat digunakan. Petugas baru membuka satu sisi jalan sekitar pukul 08.00 WIB atau terlambat beberapa jam dari jadwal yang telah ditetapkan.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/NERp1z8yWxzZuugcVibQdaCBbk0=/0x89:1600x1156/1200x800/data/photo/2026/06/02/6a1e66d578a1c.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/122442815/update-perbaikan-jalan-lenteng-agung-sudah-dibuka-sebagian"
    },
    {
        "title": "Cek Harga Skutik Murah pada Juni 2026, Yamaha dan Suzuki Naik",
        "summary": "JAKARTA, KOMPAS.com – Pasar skutik entry level kembali mengalami penyesuaian harga pada Juni 2026. Kini giliran Yamaha dan Suzuki yang melakukan revisi banderol pada beberapa skutik andalannya. Kenaikan harga memang tidak terlalu besar, namun cukup terasa bagi konsumen yang sedang berburu motor matik murah. Dilansir dari situs resmi masing-masing merek, Selasa (2/6/2026), harga skutik murah terpantau kembali mengalami penyesuian pada bulan ini.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/qhmNARzIMr0YgYSzq0sWYwWorjQ=/2x68:1280x920/1200x800/data/photo/2025/12/02/692e67b146da6.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/112200415/cek-harga-skutik-murah-pada-juni-2026-yamaha-dan-suzuki-naik"
    },
    {
        "title": "Promo Alfamart Paling Murah 1-7 Juni 2026, Diskon Silver Queen Chunky",
        "summary": "KOMPAS.com - Promo Alfamart paling murah sejagat hadir kembali pada 1-7 Juni 2026. Ada diskon cokelat Silver Queen Chunky dan item lainnya. \"Masuk Alfamart niat lihat-lihat, keluarnya malah bawa lebih banyak karena ada Promo 'Paling Murah Sejagat' jelas akun resmi Instagram @alfamart.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/kfAj9a-I8tSmMwhcKg5QXWa4wEo=/0x22:1200x822/1200x800/data/photo/2026/06/02/6a1e572b34d16.jpg",
        "link": "https://money.kompas.com/read/2026/06/02/120000726/promo-alfamart-paling-murah-1-7-juni-2026-diskon-silver-queen-chunky-"
    },
    {
        "title": "Kapan Pengemudi Boleh Menggunakan Bahu Jalan Tol? Ini Aturannya",
        "summary": "SOLO, KOMPAS.com - Penggunaan bahu jalan tol masih sering disalahgunakan oleh sebagian pengemudi, terutama saat terjadi kepadatan lalu lintas. Padahal, bahu jalan bukan jalur tambahan yang bisa digunakan untuk menyalip kendaraan atau menghindari kemacetan. Selain berpotensi membahayakan pengguna jalan lain, penggunaan bahu jalan yang tidak sesuai aturan juga dapat menghambat kendaraan darurat yang sedang menjalankan tugas.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/9mMjLOpUA2ZL3MDEmM4OYDEIwos=/0x0:1200x800/1200x800/data/photo/2025/04/04/67ef7cccd8064.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/101200015/kapan-pengemudi-boleh-menggunakan-bahu-jalan-tol-ini-aturannya"
    },
    {
        "title": "Usai Liburan, Jangan Lupa Cek Cairan pada Mobil",
        "summary": "JAKARTA, KOMPAS.com - Setelah digunakan untuk perjalanan jauh saat liburan, kondisi berbagai cairan kendaraan sebaiknya tidak luput dari pemeriksaan. Sebab, komponen seperti coolant, cairan rem, air aki, hingga cairan pendukung lainnya bisa mengalami penurunan volume maupun kualitas akibat bekerja lebih berat selama perjalanan. Lung Lung, pemilik Dokter Mobil, mengatakan pemeriksaan cairan kendaraan perlu dilakukan sesegera mungkin setelah mobil kembali digunakan dari perjalanan jarak jauh untuk memastikan seluruh sistem kendaraan tetap bekerja optimal.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/bLt_YstBl4ZkyyN6zaWUukEYy64=/73x67:873x600/1200x800/data/photo/2025/01/13/6784529bf2a6a.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/094200415/usai-liburan-jangan-lupa-cek-cairan-pada-mobil"
    },
    {
        "title": "Kementan Ajak Warga Bangun Dapur Susu untuk Pasok MBG, Modal Rp 5 M Kurang",
        "summary": "JAKARTA, KOMPAS.com - Kementerian Pertanian (Kementan) mendorong masyarakat membangun Dapur Susu Indonesia (Dasi) untuk menyuplai kebutuhan susu bagi dapur program Makan Bergizi Gratis (MBG). Direktur Hilirisasi Hasil Peternakan Kementan Makmun mengatakan, masyarakat yang berminat membangun Dasi hanya membutuhkan modal kurang dari Rp 5 miliar. Informasi tersebut disampaikan Makmun dalam konferensi pers di Kementerian Koordinator Bidang Pangan, Jakarta, Selasa (2/6/2026).",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/pcXKEUHjFI5LChSGGHd-ZnyGN44=/0x0:0x0/1200x800/data/photo/2026/06/02/6a1e671885d93.jpeg",
        "link": "https://money.kompas.com/read/2026/06/02/125556526/kementan-ajak-warga-bangun-dapur-susu-untuk-pasok-mbg-modal-rp-5-m-kurang"
    },
    {
        "title": "Jadi Hybrid, Apa Menariknya Toyota Vios Sekarang? (Video)",
        "summary": "JAKARTA, KOMPAS.com - Sempat menjadi sedan termurah Toyota, Vios kini naik kelas dengan bertransformasi menjadi pilihan mobil elektrifikasi berteknologi hybrid untuk pasar Indonesia. Langkah signifikan ini tak sekadar membuat harganya terkerek, namun turut membawa beberapa perubahan total pada karakteristik teknisnya. Paling utama dari segi sensasi berkendara. Tak sekadar easy driving, tapi dari pengalaman berkendara beberapa waktu lalu, impresinya jauh lebih fun to drive dengan pengendalian yang lincah ketika diajak bermanuver.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/qlKZXDchk1zbZQgRtlnqhELxEXA=/48x213:902x782/1200x800/data/photo/2026/02/05/6984495420fc5.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/103100515/jadi-hybrid-apa-menariknya-toyota-vios-sekarang-video-"
    },
    {
        "title": "Promo Alfamart 1-7 Juni 2026, Frisian Flag UHT Rp 9.900 dapat 2",
        "summary": "KOMPAS.com - Promo Alfamart produk spesial mingguan (PSM) periode 1-7 Juni 2026 menghadirkan diskon menarik. Ada susu Frisian Flag UHT cuma Rp 9.900 dapat dua pcs. \"PSM Alfamart lagi penuh promo spesial! Mulai dari kebutuhan rumah sampai camilan favorit, banyak harga hemat yang siap bikin belanja makin puas. Jangan sampai kelewatan, ya,\" jelas akun resmi Instagram @alfamart.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/yRxLlKICtL3LtVhDzCv9TL-HCsw=/0x0:1200x800/1200x800/data/photo/2026/06/02/6a1e4f56e8f3b.jpg",
        "link": "https://money.kompas.com/read/2026/06/02/111100326/promo-alfamart-1-7-juni-2026-frisian-flag-uht-rp-9900-dapat-2"
    },
    {
        "title": "CELIOS Dorong Pemerintah Perluas Basis Pajak kepada Perusahaan OTT Global",
        "summary": "JAKARTA, KOMPAS.com - Center of Economic and Law Studies (CELIOS) mengungkapkan Indonesia masih menghadapi kesenjangan fiskal yang besar di sektor ekonomi digital. Meski nilai transaksi ekonomi digital atau gross merchandise value (GMV) telah mencapai Rp 1.350 triliun, penerimaan pajak digital yang berhasil dikumpulkan negara baru sebesar Rp 32,32 triliun. Dalam kajian bertajuk Tata Kelola Industri Over-The-Top (OTT) di Indonesia, CELIOS mencatat digital tax coefficient Indonesia hanya sebesar 0,27. Angka ini jauh lebih rendah dibandingkan sektor konvensional seperti manufaktur dan jasa keuangan yang memiliki koefisien pajak dua hingga tiga kali lebih tinggi.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/iyYMTs9vmxtao4o7B1KCOFgoBSA=/0x50:1274x899/1200x800/data/photo/2026/06/02/6a1e6c493f408.jpeg",
        "link": "https://money.kompas.com/read/2026/06/02/134825626/celios-dorong-pemerintah-perluas-basis-pajak-kepada-perusahaan-ott-global"
    },
    {
        "title": "Promo Lawson Station Hari Ini 2 Juni 2026, Diskon hingga 50 Persen",
        "summary": "KOMPAS.com - Akhir bulan ini, Lawson Station Indonesia menghadirkan berbagai promo. Dengan periode promosi dari 1 hingga 15 Juni 2026, saatnya Anda berbelanja cerdas dan menghemat lebih banyak saat membeli makanan dan minuman favorit Anda. Lawson menyediakan berbagai pilihan promo yang sesuai dengan kebutuhan Anda. Jangan lewatkan kesempatan untuk mendapatkan produk berkualitas dengan harga lebih terjangkau. Dikutip dari akun Instagram resmi Lawson, berikut adalah informasi lengkap mengenai promo yang bisa Anda nikmati!",
        "source": "kompas",
        "thumbnails": "https://storage.googleapis.com/kgdata-aiml-public/chrono/promo/images/2026-06-01_lawson_indonesia_349578_1.jpg",
        "link": "https://money.kompas.com/read/2026/06/02/141701526/promo-lawson-station-hari-ini-2-juni-2026-diskon-hingga-50-persen"
    },
    {
        "title": "Produksi Beras Naik, Tapi Panen Padi April 2026 Turun 15 Persen",
        "summary": "JAKARTA, KOMPAS.com - Badan Pusat Statistik (BPS) melaporkan produksi beras nasional selama Januari-April 2026 mencapai 14,03 juta ton. Angka tersebut naik tipis 0,12 persen dibandingkan periode yang sama tahun lalu. Deputi Bidang Metodologi dan Informasi Statistik BPS Pudji Ismartini mengatakan, kenaikan produksi beras sejalan dengan peningkatan produksi padi yang mencapai 24,36 juta ton gabah kering giling (GKG) atau tumbuh 0,12 persen secara tahunan.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/dfQGteuvnX_6Fmxkcwq30bRmFYc=/0x43:1859x1282/1200x800/data/photo/2025/01/07/677cc7f73f188.jpg",
        "link": "https://money.kompas.com/read/2026/06/02/134110626/produksi-beras-naik-tapi-panen-padi-april-2026-turun-15-persen"
    },
    {
        "title": "Peminat EV Bertambah, Studi Ungkap Pemilik Mobil Bensin Mulai Beralih",
        "summary": "JAKARTA, KOMPAS.com – Minat terhadap kendaraan listrik (electric vehicle/EV) terus meningkat, seiring semakin banyak pemilik mobil berbahan bakar bensin yang mulai beralih ke teknologi tanpa emisi. Data transaksi dari perusahaan riset otomotif Edmunds di Amerika Serikat (AS), menunjukkan, sebanyak 67,1 persen pembeli mobil listrik baru pada Januari 2026 menukarkan kendaraan berbahan bakar bensin yang sebelumnya mereka gunakan. Lalu meningkat menjadi 72,1 persen pada April 2026. Kondisi ini menunjukkan bahwa kendaraan listrik semakin dipandang sebagai pilihan utama saat konsumen memutuskan mengganti mobil lamanya.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/kmdn3QqS308oUqQnp5j8jDJnVR4=/0x0:1719x1146/1200x800/data/photo/2024/06/12/6669bdf1e29b0.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/02/084200215/peminat-ev-bertambah-studi-ungkap-pemilik-mobil-bensin-mulai-beralih"
    },
    {
        "title": "Iran Ingatkan Israel Tak Serang Lebanon Lagi: Kesabaran Ada Batas!",
        "summary": "Jakarta -\n\t\t\tKomando militer utama Iran mengingatkan bahwa jika Israel melakukan serangan terhadap ibu kota Lebanon, Beirut, maka penduduk Israel utara harus meninggalkan daerah tersebut, jika mereka tidak ingin terluka.Dilansir Al Arabiya, Selasa (2/6/2026), peringatan itu muncul ketika Mohsen Rezaei, penasihat pemimpin tertinggi Iran, mengatakan bahwa eskalasi lebih lanjut di Lebanon \"tidak akan ditoleransi.\" Dia menambahkan dalam sebuah unggahan di media sosial X, bahwa \"kesabaran angkatan bersenjata Republik Islam Iran memiliki batas.\"Sebelumnya, Perdana Menteri (PM) Israel Benjamin Netanyahu memerintahkan serangan terhadap pinggiran selatan Beirut yang dikuasai kelompok milisi Hizbullah pada hari Senin (1/6) waktu setempat. Ini memicu gelombang pengungsian baru dalam konflik yang telah menyebabkan lebih dari satu juta orang mengungsi di Lebanon. Kementerian Luar Negeri Iran mengatakan dalam sebuah pernyataan, bahwa AS bertanggung jawab atas pelanggaran gencatan senjata dengan Iran dan pelanggaran gencatan senjata yang dilakukan oleh Israel di Lebanon. Dikatakan bahwa pelanggaran gencatan senjata di satu front sama dengan pelanggaran di semua front.Ketegangan terbaru ini mengancam gencatan senjata yang rapuh antara Iran dan Amerika Serikat yang mulai berlaku pada 8 April setelah 39 hari perang. Sejak itu, kedua pihak telah melakukan kontak yang bertujuan untuk mengubah gencatan senjata menjadi kesepakatan yang lebih luas. Namun, hingga kini belum ada kesepakatan akhir yang tercapai. Iran berulang kali menegaskan bahwa gencatan senjata harus berlaku di semua front, khususnya Lebanon, di mana Hizbullah yang didukung Iran, berperang melawan Israel. Pejabat-pejabat Iran telah memperingatkan bahwa serangan Israel yang berkelanjutan di Lebanon dapat membahayakan gencatan senjata dan upaya diplomatik yang lebih luas.Sebelumnya pada hari Senin, televisi pemerintah Iran melaporkan bahwa kemungkinan gagalnya gencatan senjata antara Teheran dan Washington sangat besar, jika serangan Israel terhadap Lebanon terus berlanjut.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/21/serangan-israel-rusak-kawasan-bersejarah-di-lebanon-selatan-1779353774043_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8514313/iran-ingatkan-israel-tak-serang-lebanon-lagi-kesabaran-ada-batas"
    },
    {
        "title": "Media Singapura Soroti Rupiah Anjlok Bikin Jakarta Diserbu Turis",
        "summary": "Jakarta -\n\t\t\tMedia Singapura menyoroti melemahnya nilai tukar rupiah dan serangkaian kejahatan jalanan baru-baru ini di Jakarta, dan video viral tentang perampokan yang menargetkan wisatawan. Namun, para turis Singapura dilaporkan tak terpengaruh dengan hal itu, karena mereka punya tujuan lain.Dalam artikelnya bertajuk \"Jakarta crime fears rise, but rupiah slide keeps Singaporeans coming for shopping and food\", media Singapura, The Straits Times menuliskan bahwa bagi banyak orang, nilai tukar rupiah yang lemah telah meningkatkan daya tarik Jakarta sebagai tujuan belanja dan kuliner.\"Tidak ada waktu untuk takut -- terlalu banyak belanja yang harus dilakukan,\" canda Noraini Rahmat saat diwawancarai The Straits Times, Senin (1/6/2026). Perempuan berumur 52 tahun itu berada di Jakarta bersama dua saudara perempuannya untuk apa yang ia sebut sebagai \"maraton belanja besar-besaran\" dari tanggal 22 hingga 25 Mei. \"Tentu saja, ketika video seperti itu menjadi viral, orang-orang akan membicarakannya. Tapi jujur saja, kami hanya mencoba berhati-hati seperti yang kami lakukan di Singapura atau kota besar lainnya,\" kata Noraini, yang bekerja di industri kesehatan. \"Jangan berdiri terlalu dekat dengan jalan dengan ponsel Anda terpampang, jangan biarkan tas Anda terbuka. Anda tahu, hal-hal dasar seperti itu,\" imbuh warga Singapura itu.Rencana perjalanan Noraini termasuk berburu barang murah untuk busana muslimah di pusat perbelanjaan Thamrin City di Jakarta Pusat, melihat-lihat merek lokal populer seperti Buttonscarves di mal-mal besar, dan menikmati kuliner di Blok M. Mereka juga memaksimalkan jatah bagasi penerbangan 30 kg mereka dengan membawa kue lapis dan camilan lokal lainnya.Noraini mengatakan nilai tukar yang menguntungkan membuat perjalanan belanja terasa lebih berarti tahun ini.Sentimen tersebut juga diungkapkan oleh Marcus Tan, 38 tahun, yang singgah di Jakarta selama tiga hari setelah berlibur di Nusa Tenggara Timur bersama teman-temannya karena ingin berbelanja sebelum pulang.\"Seratus dolar Singapura benar-benar cukup di sini. Saya bisa membeli lebih banyak, makan lebih banyak, dan tetap merasa menghabiskan lebih sedikit daripada di tanah air,\" katanya. Dolar Singapura baru-baru ini diperdagangkan sekitar 13.800 rupiah, mendekati rekor tertinggi terhadap mata uang Indonesia.Tan mengatakan: \"Bahkan untuk merek yang sudah kita miliki di Singapura, terkadang harganya masih lebih murah di sini setelah dikonversi.\"Sementara itu, Nur Syarifah, 29 tahun, yang berada di Jakarta bersama lima temannya dan putri salah satu temannya yang berusia tiga tahun, mengatakan mereka merasa cukup nyaman mengunjungi Jakarta, meskipun ada laporan kejahatan baru-baru ini.\"Anda tetap perlu waspada, tentu saja,\" kata Syarifah. \"Tapi kami tidak merasa tidak aman berjalan-jalan di mal atau area kafe di sini. Sejujurnya, lalu lintas masih lebih menegangkan daripada kejahatan,\" cetusnya.Singapura adalah sumber pengunjung terbesar kedua Indonesia, setelah Malaysia. Negara kota itu mencatat lebih dari 320.000 kedatangan pada kuartal pertama tahun 2026, menurut data dari Badan Pusat Statistik (BPS) Indonesia.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2025/11/05/kota-jakarta-1762323778734_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8514454/media-singapura-soroti-rupiah-anjlok-bikin-jakarta-diserbu-turis"
    },
    {
        "title": "Trump Perkirakan Gencatan Senjata Iran Disepakati Pekan Depan",
        "summary": "Washington DC -\n\t\t\tPresiden Amerika Serikat (AS) Donald Trump memperkirakan bahwa kesepakatan dengan Iran untuk memperpanjang gencatan senjata dan membuka kembali Selat Hormuz akan bisa dicapai \"pekan depan\".\"Terlihat bagus, terlihat bagus,\" kata Trump dalam wawancara telepon dengan media ABC News, seperti dilansir Anadolu Agency, Selasa (2/6/2026).\"Ada sedikit glitch (kesalahan-red) hari ini, tetapi saya segera mengatasinya, seperti yang mungkin Anda perhatikan sebelumnya,\" ujarnya dalam wawancara pada Senin (1/6) waktu setempat. Trump menyebut \"glitch\" yang dimaksudnya adalah Iran marah atas serangan Israel yang meluas terhadap Lebanon, yang menjadi markas kelompok Hizbullah yang didukung Teheran. \"Jadi saya berbicara dengan Hizbullah, dan saya mengatakan tidak ada tembakan, dan saya berbicara dengan Bibi (nama panggilan Perdana Menteri Israel Benjamin Netanyahu-red) dan mengatakan tidak ada tembakan, dan mereka berhenti saling menembak,\" ucapnya.Lebih lanjut, Trump mengatakan bahwa kesepakatan damai dengan Iran bisa saja \"bahkan lebih baik dari kemenangan militer\".\"Itu bukan hal yang sederhana. Anda berbicara tentang negara yang sangat besar -- mereka -- negara yang sangat besar yang membuat kesepakatan. Permusuhan yang luar biasa, sungguh,\" ujarnya. \"Jadi ini bukan hal yang mudah bagi mereka. Sebenarnya ini juga tidak mudah dari sudut pandang kita. Tetapi kita mendapatkan apa yang perlu kita dapatkan,\" kata Presiden AS itu.Ketika ditanya soal kapan kesepakatan mengenai perpanjangan gencatan senjata dan nota kesepahaman (MoU) untuk membuka kembali Selat Hormuz akan diselesaikan dan disetujui, Trump menjawab: \"Saya pikir Anda berbicara tentang pekan depan.\"Dia mengatakan bahwa dirinya belum menyetujuinya karena \"saya masih harus mendapatkan beberapa poin lagi\".",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2025/09/26/presiden-as-donald-trump-1758863482390_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8514088/trump-perkirakan-gencatan-senjata-iran-disepakati-pekan-depan"
    },
    {
        "title": "Dunia Hari Ini: Malaysia Larang Medsos Bagi Anak di Bawah 16 Tahun",
        "summary": "Anda sedang membaca laporan Dunia Hari Ini edisi Selasa, 2 Juni 2026 yang menyajikan laporan selama 24 jam terakhir.Berita utama kami hadirkan dari Malaysia.Malaysia larang medsos untuk anak di bawah 16 tahunMalaysia melarang anak-anak di bawah 16 tahun untuk mendaftarkan akun di platform media sosial, sebagai upaya untuk melindungi anak di bawah umur dari paparan konten berbahaya secara online. Sejak Senin kemarin, platform media sosial termasuk Facebook dan Instagram milik Meta Platforms, TikTok, dan YouTube milik Alphabet, harus melakukan verifikasi usia menurut Komisi Komunikasi dan Multimedia Malaysia.Denda hingga 10 juta ringgit, atau lebih dari Rp45 juta, dapat dikenakan pada perusahaan media sosial yang gagal mematuhi peraturan tersebut. \"Langkah ini tidak dimaksudkan untuk melarang pengguna anak-anak mengakses internet atau menutup akses mereka ke teknologi,\" bunyi pernyataan pemerintah.Pemerintah mengatakan langkah ini diambil untuk menuntut tanggung jawab platform media sosial, orang tua, dan wali dalam melindungi anak di bawah umur di dunia daring.Unjuk rasa menentang fasilitas karantina Ebola di KenyaSenin kemarin, ratusan orang turun ke jalan di kota Nanyuki, Kenya tengah, untuk memprotes langkah Amerika Serikat mendirikan fasilitas karantina Ebola di kawasan pangkalan militer.Pengadilan memerintahkan penangguhan sementara pada hari Jumat (29/05) setelah gugatan diajukan dengan alasan lokasi tersebut dapat membahayakan kesehatan masyarakat.Pejabat senior AS mengatakan unit berkapasitas 50 tempat tidur di pangkalan angkatan udara di wilayah Laikipia akan melayani warga Amerika yang sudah terpapar virus tetapi masih tanpa gejala.Pemerintah Kenya juga sudah mengkonfirmasi rencana untuk mendirikan fasilitas tersebut.Menteri Kesehatan Kenya Aden Duale mengatakan ini merupakan bagian dari upaya yang lebih luas untuk memperkuat sistem tanggap darurat.Serena Williams akan kembali berlagaSerena Williams kembali ke laga tenis profesional pada usia 44 tahun setelah hampir empat tahun absen dari olahraga ini.Juara tunggal Grand Slam 23 kali sudah menerima undangan 'wildcard' untuk bermain ganda di turnamen lapangan rumput Queen's Club mendatang di London, demikian diumumkan oleh WTA Tour.Williams juga membuat unggahan bersponsor dengan Nike di media sosial dengan keterangan: \"Sepertinya semua orang sudah mendengar beritanya.\"Unggahan tersebut disertai video teleponnya berdering, di mana ia berkata: \"Saya harus mengganti nomor saya.\"Turnamen Queen's Club dimulai Senin depan dan WTA mengatakan Williams akan bermain \"dengan pasangan yang akan diumumkan kemudian.\"Penggemar BTS doa agar dapat tempat duduk di konserPara penggemar band K-pop BTS di Taiwan berdoa kepada Yue Lao, dewa Taois cinta dan pernikahan, dengan harapan mereka bisa mendapatkan tempat duduk untuk konser di kota Kaohsiung, Taiwan selatan.\"Sangat sulit mendapatkan tiket konser BTS, jadi orang-orang bilang berdoa kepada Dewa Cinta adalah cara yang paling efisien,\" ujar Jessie Chuang, seorang penggemar, 26 tahun.Akhir pekan lalu, sekelompok penggemar K-pop, yang sebagian besar penggemar BTS, meletakkan camilan dalam kemasan ungu, 'merchandise' grup, peta tempat duduk konser, dan daftar keinginan mereka di atas meja altar di Kuil Bangka Longshan, Taipei.Tren ini dimulai di media sosial beberapa tahun yang lalu.Penggemar K-pop Taiwan percaya Yue Lao akan menggunakan benang merah takdirnya untuk menghubungkan mereka yang ditakdirkan untuk bertemu, dalam hal ini, menghubungkan penggemar dengan tempat duduk konser.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/02/abc-1780377308513_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/abc-australia/d-8514261/dunia-hari-ini-malaysia-larang-medsos-bagi-anak-di-bawah-16-tahun"
    },
    {
        "title": "Badai Tropis Jangmi Terjang Jepang, 9 Orang Luka-Listrik Padam",
        "summary": "Tokyo -\n\t\t\tBadai tropis dahsyat Jangmi menerjang wilayah Jepang bagian barat daya pada Selasa (2/6) waktu setempat. Terjangan badai tropis Jangmi itu memicu berbagai insiden yang melukai sedikitnya sembilan orang.Pemadaman listrik juga terjadi pada puluhan ribu rumah dan ratusan penerbangan dibatalkan akibat badai tropis tersebut.Badan Meteorologi Jepang (JMA), seperti dilansir AFP, Selasa (2/6/2026), memperingatkan akan adanya gelombang tinggi di lautan, tanah longsor, dan banjir saat badai tropis Jangmi -- diturunkan statusnya dari topan menjadi badai tropis -- bergerak ke utara setelah menerjang pulau subtropis Okinawa pada Senin (1/6). Lebih dari 30.000 rumah tangga di wilayah Kagoshima, Jepang barat daya, dan sebanyak 17.000 rumah tangga lainnya di Okinawa mengalami pemadaman listrik pada Selasa (2/6) pagi waktu setempat. Juru bicara pemerintah Jepang, Minoru Kihara, mengatakan bahwa badai tropis Jangmi melukai sedikitnya sembilan orang dalam berbagai insiden di Okinawa.Menurut lembaga penyiaran publik NHK, cedera-cedera tersebut disebabkan oleh badai tropis Jangmi yang menerbangkan benda-benda hingga menghantam sejumlah mobil dan angin kencang yang membuat orang-orang kehilangan keseimbangan. Kihara memperingatkan bahwa transportasi umum di Tokyo dan kota-kota terdekat dapat mengalami gangguan pada Rabu (3/6) seiring mendekatnya badai.\"Bagi Anda yang tinggal di area-area yang kemungkinan akan terdampak badai, harap perhatikan informasi evakuasi yang dirilis oleh pemerintah daerah Anda, dan tetap waspada terhadap evakuasi dini,\" kata Kihara dalam konferensi pers.\"Tolong tetap waspada dan pastikan Anda mengambil tindakan untuk melindungi nyawa Anda,\" ucapnya.Imbas badai tropis Jangmi, dua maskapai penerbangan terbesar Jepang, All Nippon Airways dan Japan Airlines, membatalkan total 600 penerbangan yang dijadwalkan untuk hari Senin (1/6) hingga Rabu (3/6) waktu setempat.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/02/dua-maskapai-penerbangan-terbesar-jepang-all-nippon-airways-dan-japan-airlines-membatalkan-total-600-penerbangan-untuk-hari-se-1780377451084_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8514284/badai-tropis-jangmi-terjang-jepang-9-orang-luka-listrik-padam"
    },
    {
        "title": "Tanpa China, Bisakah Ekonomi Korut Bertahan?",
        "summary": "Ekonomi Korea Utara menjalankan salah satu sistem ekonomi paling aneh di dunia. Meskipun menjadi salah satu dari sedikit negara yang memiliki senjata nuklir, produk domestik bruto (PDB) negara itu pada 2024 hanya sebesar 26,6 miliar dolar AS (sekitar Rp434 triliun). Angka ini sekitar 70 kali lebih kecil dibandingkan dengan ekonomi Korea Selatan yang mencapai 1,86 triliun dolar AS dan hanya sekitar seperlima dari pendapatan tahunan perusahaan dengan nilai perdagangan terbesar di dunia, NVIDIA. Berkat ekonomi terpusat yang memprioritaskan produksi domestik, Korea Utara tidak terlalu bergantung pada perdagangan dibandingkan dengan ekonomi pasar bebas pada umumnya, sebagian karena sanksi Perserikatan Bangsa-Bangsa yang diberlakukan pada 2017 atas program senjata nuklir dan rudal balistiknya.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/02/tanpa-cina-bisakah-ekonomi-korea-utara-bertahan-1780371627185.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/dw/d-8514091/tanpa-china-bisakah-ekonomi-korut-bertahan"
    },
    {
        "title": "Serangan Israel Tewaskan 14 Orang di Lebanon Saat Gencatan Senjata",
        "summary": "Jakarta -\n\t\t\tSetidaknya 14 orang tewas dan puluhan lainnya luka-luka dalam serangkaian serangan udara Israel di Lebanon selatan. Belasan orang tersebut tewas dalam pelanggaran mematikan terbaru terhadap perjanjian gencatan senjata yang sedang berlangsung.Dilansir Anadolu Agency, Selasa (2/6/2026), serangan Israel menghantam sebuah bangunan dan tempat parkir di persimpangan Maarka dekat Rumah Sakit Jabal Amel di Tyre, menewaskan dua orang dan melukai 23 lainnya, kata kantor berita negara NNA. Serangan itu menyebabkan kerusakan besar pada rumah sakit, menurut seorang reporter Anadolu. Satu orang tewas dan satu lainnya luka-luka dalam serangan Israel di kota Chehabiyeh di distrik Tyre, kata NNA.Serangan drone menghantam sebuah kendaraan di jalan Zefta-Nabatieh, menewaskan pengemudi dan melukai seorang petugas medis yang berada di dekatnya, kata media tersebut. Dua orang lagi tewas ketika sebuah drone Israel menghantam kendaraan mereka di kota Braiqaa di selatan, sementara seorang warga negara Suriah tewas dalam serangan terpisah di dekat Rumah Sakit Sheikh Ragheb Harb di kota Toul. Lima orang juga tewas dalam serangan udara Israel semalam di kota Kfar Sir di Lebanon selatan, kata NNA. Serangan Israel lainnya menewaskan dua orang di kota Zebdine, kata sumber yang sama.Israel terus melanjutkan serangannya terhadap Lebanon meskipun gencatan senjata yang mulai berlaku pada 17 April dan diperpanjang selama 45 hari setelah pembicaraan tidak langsung yang dimediasi oleh AS.Menurut Kementerian Kesehatan Lebanon, serangan Israel sejak 2 Maret telah menewaskan lebih dari 3.400 orang di seluruh negeri.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/13/lebanon-israel-iran-us-war-1778623969102_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513851/serangan-israel-tewaskan-14-orang-di-lebanon-saat-gencatan-senjata"
    },
    {
        "title": "Demo Ricuh Warnai Pidato Kenegaraan Perdana Presiden Chile Jose Antonio Kast",
        "summary": "Chile - Bentrokan antara demonstran dan polisi antihuru-hara mewarnai pidato kenegaraan perdana Presiden Chile Jose Antonio Kast di Valparaiso.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/02/demo-ricuh-warnai-pidato-kenegaraan-perdana-presiden-chile-jose-antonio-kast-1780373370844_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/foto-news/d-8514163/demo-ricuh-warnai-pidato-kenegaraan-perdana-presiden-chile-jose-antonio-kast"
    },
    {
        "title": "Rudal-Drone Rusia Hantam Ukraina, 4 Orang Tewas-Puluhan Luka",
        "summary": "Kyiv -\n\t\t\tRentetan serangan rudal dan drone Rusia menghujani sebagian wilayah Ukraina, termasuk ibu kota Kyiv, dalam semalam. Sedikitnya empat orang tewas dan puluhan orang lainnya mengalami luka-luka di berbagai wilayah Ukraina akibat serangan tersebut.Serangan Rusia ini, seperti dilansir AFP, Selasa (2/6/2026), menjadi yang terbaru dalam perang yang berkecamuk selama empat tahun terakhir, dan belum terlihat akhirnya.Sejumlah jurnalis AFP melaporkan mereka mendengar suara rentetan ledakan di area ibu kota Kyiv, sementara otoritas setempat melaporkan Rusia menggunakan rudal balistik dalam serangan-serangannya. Moskow, yang menginvasi Ukraina lebih dari empat tahun lalu, telah membombardir negara tetangganya hampir setiap hari. Kyiv secara teratur membalas serangan-serangan itu. Sementara itu, pembicaraan untuk mengakhiri konflik paling mematikan di Eropa sejak Perang Dunia II itu tetap buntu.Serangan itu terjadi beberapa hari setelah Presiden Ukraina Volodymyr Zelensky memperingatkan bahwa Rusia sedang mempersiapkan \"serangan baru secara besar-besaran\" terhadap negaranya.\"Ledakan-ledakan di kota. Pasukan pertahanan udara sedang bekerja! Tetaplah berada di tempat perlindungan!\" kata Wali Kota Kyiv, Vitali Klitschko, dalam pernyataan via Telegram.Warga setempat, menurut laporan jurnalis AFP di lapangan, bergegas ke tempat-tempat perlindungan sembari membawa tas dan selimut, sementara kepulan asap membubung dari area pusat kota Kyiv.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/02/gedung-permukiman-di-kyiv-ibu-kota-ukraina-mengalami-kerusakan-akibat-serangan-rudal-dan-drone-rusia-1780375179767_43.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8514216/rudal-drone-rusia-hantam-ukraina-4-orang-tewas-puluhan-luka"
    },
    {
        "title": "Usai Kebakaran Hebat, Warga Kembali Cari Harta yang Tersisa di Tengah Puing",
        "summary": "Jakarta - Warga Kebon Kosong menyisir puing bangunan pascakebakaran untuk menemukan harta benda yang masih bisa diselamatkan.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/02/usai-kebakaran-hebat-warga-kembali-cari-harta-yang-tersisa-di-tengah-puing-1780369062485_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/foto-news/d-8514018/usai-kebakaran-hebat-warga-kembali-cari-harta-yang-tersisa-di-tengah-puing"
    },
    {
        "title": "Trump: Netanyahu-Hizbullah Sepakat Setop Serangan, Negosiasi Iran Berlanjut",
        "summary": "Jakarta -\n\t\t\tPresiden Amerika Serikat (AS) Donald Trump mengatakan bahwa Israel dan Hizbullah telah sepakat untuk menghentikan pertempuran. Trump juga mengatakan pembicaraan dengan Iran berlanjut setelah mengalami kebuntuan terkait serangan Israel di Lebanon.Dilansir AFP dan Anadolu Agency, Selasa (2/6/2026), Trump mengatakan di media sosial bahwa Perdana Menteri (PM) Israel Benjamin Netanyahu telah berjanji untuk tidak mengirim pasukan ke pinggiran selatan Beirut seperti yang diancamkan, sementara Hizbullah telah setuju bahwa \"semua penembakan akan dihentikan.\"Komentarnya muncul setelah kantor berita Iran Tasnim melaporkan bahwa Teheran telah menangguhkan dialog dengan mediator sebagai protes atas perluasan serangan Israel di Lebanon terhadap sekutu Iran, Hizbullah. \"Saya melakukan panggilan yang sangat produktif dengan Perdana Menteri Bibi Netanyahu, dari Israel, dan tidak akan ada pasukan yang pergi ke Beirut, dan pasukan mana pun yang sedang dalam perjalanan telah dipulangkan,\" tulis Trump. \"Demikian pula, melalui perwakilan yang berkedudukan tinggi, saya melakukan panggilan yang sangat baik dengan Hizbullah, dan mereka setuju bahwa semua penembakan akan dihentikan--bahwa Israel tidak akan menyerang mereka, dan mereka tidak akan menyerang Israel.\"Dalam unggahan terpisah beberapa menit kemudian, Trump mengatakan bahwa \"perundingan terus berlanjut, dengan cepat, dengan Republik Islam Iran. Terima kasih atas perhatian Anda terhadap masalah ini!\" Namun sebelumnya pada Senin (1/6), pemimpin AS tersebut telah memberikan sinyal yang sangat beragam tentang antusiasmenya terhadap perundingan untuk mengakhiri perang Iran, yang dilancarkan Amerika Serikat dan Israel pada 28 Februari.Trump mengatakan kepada stasiun televisi AS CNBC dalam sebuah wawancara telepon sesaat sebelum unggahannya di Truth Social bahwa \"Saya tidak peduli\" jika perundingan Iran gagal.\"Jika sudah berakhir, ya sudah,\" kata Trump kepada CNBC. \"Terus terang, saya pikir perundingan itu mulai sangat membosankan.\"Secara terpisah, Trump mengatakan kepada NBC News pada Senin (1/6), dia belum diberitahu bahwa Iran menangguhkan negosiasi, tetapi, \"Saya pikir kita sudah terlalu banyak bicara jika Anda ingin tahu yang sebenarnya.\"\"Saya pikir diam akan sangat baik, dan itu bisa berlangsung lama,\" katanya kepada NBC.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2025/09/30/trump-dan-netanyahu-menyepakati-rencana-perdamaian-di-gaza-1759203803908_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513840/trump-netanyahu-hizbullah-sepakat-setop-serangan-negosiasi-iran-berlanjut"
    },
    {
        "title": "Israel Serang Lebanon, Iran Tangguhkan Negosiasi dengan AS",
        "summary": "Jakarta -\n\t\t\tIran menangguhkan semua pertukaran mediator dalam pembicaraan damai dengan Amerika Serikat (AS). Alasan Iran, karena invasi Israel yang sedang berlangsung ke Lebanon.Dilansir AFP dan Anadolu Agency, Senin (1/6/2026), kantor berita Iran, Tasnim, mengatakan Teheran menangguhkan semua pembicaraan damai dengan Amerika Serikat dengan alasan invasi Israel yang sedang berlangsung ke Lebanon.\"Mengingat kejahatan berkelanjutan rezim Zionis (Israel) di Lebanon dan mengingat bahwa Lebanon adalah salah satu prasyarat untuk gencatan senjata dan bahwa gencatan senjata ini sekarang telah dilanggar di semua lini, termasuk Lebanon, tim negosiasi Iran menangguhkan dialog dan pertukaran teks melalui mediator,\" lapor Tasnim. Dikatakan bahwa Iran menuntut \"penghentian segera\" operasi militer Israel di Gaza dan Lebanon dan penarikan pasukannya dari wilayah yang didudukinya di negara tetangga utaranya sebagai prasyarat untuk melanjutkan pembicaraan. Militer Israel telah bergerak lebih jauh ke Lebanon selatan daripada kapan pun sejak mengakhiri pendudukan wilayah tersebut pada tahun 2000. Mereka memperingatkan penduduk pinggiran selatan ibu kota Beirut untuk mengungsi menjelang serangan.Tasnim juga melaporkan bahwa Iran dan sekutunya telah \"menetapkan tekad mereka untuk sepenuhnya memblokir Selat Hormuz dan mengaktifkan front lain, termasuk Selat Bab al-Mandab\", di pintu masuk Laut Merah. Sekutu Iran dari Yaman, Houthi, sebelumnya telah menyerang kapal-kapal di selat tersebut dan perairan sekitarnya, memaksa kapal-kapal untuk mengambil jalan memutar yang panjang di sekitar Afrika daripada berlayar melalui Laut Merah dan Terusan Suez.Pakistan telah menjadi mediator utama dalam pembicaraan antara Washington dan Teheran untuk mengakhiri perang yang dilancarkan oleh Amerika Serikat dan Israel yang dengan cepat menyebar ke seluruh wilayah.Gencatan senjata telah berlaku sejak 8 April dan telah bertahan meskipun terjadi insiden sesekali, tetapi pembicaraan tentang kesepakatan untuk mengakhiri perang sejauh ini gagal.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/19/seorang-wanita-melambaikan-bendera-irandi-depan-billboard-anti-as-di-alun-alun-valiasr-teheran-1779178472111_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513815/israel-serang-lebanon-iran-tangguhkan-negosiasi-dengan-as"
    },
    {
        "title": "5 Berita Terpopuler Internasional Hari Ini",
        "summary": "Jakarta -\n\t\t\tPerunding utama Iran, Mohammad Bagher Ghalibaf, menyebut Amerika Serikat (AS) tidak dapat dipercaya. AS menyerang lokasi radar dan pusat komando drone Iran yang ada di area Goruk dan Pulau Qeshm.Ghalibaf memperingatkan bahwa Teheran tidak akan menyetujui kesepakatan apa pun dengan Washington sampai hak-hak rakyat Iran sepenuhnya dijamin.Sementara itu, Washington mengklaim bahwa serangan terbarunya terhadap Teheran merupakan \"serangan pertahanan diri\". Selain berita tersebut, berikut ini berita-berita internasional yang menarik perhatian pembaca detikcom, hari ini, Senin (1/6/2026):- Iran Bilang Tak Ada Deal dengan AS Sampai Hak-haknya Dijamin Perunding utama Iran, Mohammad Bagher Ghalibaf, memperingatkan bahwa Amerika Serikat (AS) tidak dapat dipercaya. Ghalibaf mengatakan bahwa Teheran tidak akan menyetujui kesepakatan apa pun dengan Washington sampai hak-hak rakyat Iran sepenuhnya dijamin.\"Kami tidak akan menyetujui perjanjian apa pun sampai kami yakin bahwa hak-hak rakyat Iran telah ditegakkan,\" tegas Ghalibaf dalam sebuah video yang disiarkan oleh televisi pemerintah Iran, seperti dilansir AFP, Senin (1/6/2026).Ghalibaf, yang juga menjabat ketua parlemen Iran ini, menambahkan bahwa para negosiator Iran \"tidak mempercayai kata-kata musuh maupun janji-janjinya\".- AS Serang Radar-Pusat Komando Drone Iran, Klaim Membela DiriAmerika Serikat (AS) mengumumkan pasukannya telah menyerang lokasi radar dan pusat komando drone Iran yang ada di area Goruk dan Pulau Qeshm. Diklaim oleh Washington bahwa serangan terbarunya itu merupakan \"serangan pertahanan diri\".Serangan terbaru AS itu, seperti dilansir AFP dan Anadolu Agency, Senin (1/6/2026), diumumkan oleh Komando Pusat AS, atau CENTCOM, yang mengawasi operasi militer AS di kawasan Timur Tengah.\"Komando Pusat AS melancarkan serangan pertahanan diri terhadap lokasi radar dan komando serta kendali drone Iran di Goruk, Iran, dan Pulau Qeshm pada akhir pekan ini,\" kata CENTCOM dalam pernyataannya via media sosial X pada Minggu (31/5) malam. - Iran Targetkan Pangkalan Udara AS Usai Wilayahnya DiserangKorps Garda Revolusi Islam Iran (IRGC) mengatakan pasukannya, pada Senin (1/6) pagi, telah menargetkan sebuah pangkalan udara Amerika Serikat (AS) yang digunakan untuk menyerang wilayah Iran. IRGC mengklaim semua target yang ditetapkan telah dihancurkan dalam serangan pembalasan tersebut.Lokasi pangkalan udara AS yang menjadi target serangan, seperti dilansir AFP dan Anadolu Agency, Senin (1/6/2026), tidak disebutkan secara spesifik oleh IRGC dalam pernyataannya, yang disiarkan televisi IRIB dan media pemerintah Iran lainnya.Namun pernyataan IRGC ini dirilis setelah militer Kuwait mengumumkan sistem pertahanan udara mereka berhasil mencegat \"serangan rudal dan drone musuh\". AS diketahui memiliki pangkalan militer di berbagai negara Teluk, termasuk Kuwait.- Netanyahu Perintahkan Penyerbuan Lebih Dalam ke Lebanon Targetkan HizbullahPerdana Menteri (PM) Israel Benjamin Netanyahu mengatakan bahwa dirinya telah memerintahkan pasukan militer Israel untuk bergerak lebih jauh ke dalam wilayah Lebanon, dalam pertempuran darat melawan kelompok Hizbullah yang didukung Iran.Pertempuran kembali pecah di Lebanon meskipun gencatan senjata telah diumumkan lebih dari enam pekan yang lalu.Lebanon terseret ke dalam perang Timur Tengah, setelah kelompok Hizbullah melancarkan serangan roket dan drone terhadap wilayah Israel, untuk mendukung Teheran. Lebih dari 1,2 juta warga Lebanon terpaksa mengungsi akibat rentetan serangan Israel dan perintah evakuasi sejak 2 Maret lalu.- Jenderal Iran: Trump Harus Pilih Antara Opsi 'Buruk' atau 'Lebih Buruk'Seorang jenderal militer Iran memperingatkan bahwa Presiden Amerika Serikat (AS) Donald Trump sama sekali tidak memiliki pilihan yang baik terkait Iran. Dia mengatakan bahwa Trump harus memilih antara pilihan yang \"buruk\" atau \"lebih buruk\".Peringatan tersebut, seperti dilansir Press TV, Senin (1/6/2026), disampaikan oleh Brigadir Jenderal Yadollah Javani yang menjabat sebagai Wakil Bidang Urusan Politik pada Korps Garda Revolusi Islam Iran (IRGC).\"Trump, yang kekalahannya dalam perang telah menjadi jelas bagi siapa pun, sekarang menghadapi dua jalan ke depan: jalan yang buruk atau jalan yang lebih buruk,\" cetus Javani dalam pernyataan pada Sabtu (30/5) malam waktu setempat.Tonton juga Video Terpopuler Sepekan: Sapi Kurban Prabowo-Israel Masuk Daftar Hitam PBB",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/04/06/ketua-parlemen-iran-mohammad-bagher-ghalibaf-1775462233696_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513525/5-berita-terpopuler-internasional-hari-ini"
    },
    {
        "title": "Kapolda Riau: Hari Lahir Pancasila Momentum Perkuat Persatuan Bangsa",
        "summary": "Kapolda Riau Irjen Pol Herry Heryawan mengajak seluruh lapisan masyarakat untuk menjadikan momentum Hari Lahir Pancasila sebagai pengingat fondasi bangsa. Menurutnya, Pancasila adalah kompas moral dan penjaga persatuan bangsa. \"Hari Lahir Pancasila menjadi pengingat bahwa bangsa ini dibangun di atas nilai persatuan, gotong royong, keadilan, dan penghormatan terhadap keberagaman,\" kata Irjen Herry Heryawan, Senin (1/6/2026).",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/01/upacara-peringatan-hari-lahir-pancasila-di-mapolda-riau-1780323261658_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8513736/kapolda-riau-hari-lahir-pancasila-momentum-perkuat-persatuan-bangsa"
    },
    {
        "title": "Macron Serukan Kesepakatan Segera AS-Iran, Selat Hormuz Dibuka Lagi",
        "summary": "Paris -\n\t\t\tPresiden Prancis Emmanuel Macron menyerukan kesepakatan segera antara Amerika Serikat (AS) dan Iran untuk mengakhiri perang yang berkecamuk sejak akhir Februari. Macron menegaskan bahwa kesempatan untuk deeskalasi saat ini harus segera dimanfaatkan.Seruan Macron itu, seperti dilansir Press TV dan AFP, Senin (1/6/2026), disampaikan via unggahan media sosial X pada Minggu (31/5), setelah Presiden Prancis itu melakukan percakapan telepon dengan Putra Mahkota Arab Saudi Pangeran Mohammed bin Salman (MBS), Sultan Oman Haitham bin Tariq, Presiden Uni Emirat Arab Mohammed bin Zayed, dan Presiden Mesir Abdel Fattah al-Sisi.\"Sangat penting agar kesepakatan antara Amerika Serikat dan Iran tercapai dengan cepat. Kesempatan ini harrus dimanfaatkan sekarang,\" kata Macron dalam pesan kepada para pemimpin Timur Tengah itu, seperti disampaikan dalam pernyataannya. \"Prioritas utama haruslah penyelesaian gencatan senjata dan pembukaan kembali Selat Hormuz segera, tanpa prasyarat apa pun dan sesuai dengan hukum internasional,\" cetusnya. Macron menambahkan bahwa setelah gencatan senjata dan pembukaan kembali Selat Hormuz disepakati, maka diskusi harus dilanjutkan demi mencapai \"kesepakatan komprehensif dan kuat\" tentang isu-isu lainnya, termasuk program nuklir dan rudal balistik serta stabilitas regional.Presiden Prancis ini juga menyatakan kesediaan negaranya berkontribusi secara aktif, termasuk melalui misi maritim multinasional independen untuk menjamin perlintasan aman di Selat Hormuz, kemudian juga memberikan kepakaran dalam negosiasi nuklir serta membantu membangun kerangka keamanan regional.Sementara untuk situasi di Lebanon, Macron menegaskan bahwa \"tidak ada alasan yang dapat membenarkan eskalasi besar-besaran yang saat ini terjadi di Lebanon selatan\". Dia menyerukan agar semua pertempuran dihentikan \"untuk selamanya\".\"Prancis akan terus mendukung pemerintah Lebanon dalam upaya mereka untuk memulihkan kedaulatan negara dan integritas wilayah negara tersebut,\" tegasnya. Macron Dorong Trump Wujudkan Gencatan Senjata dengan IranDalam pernyataan terbaru via media sosial X pada Senin (1/6), Macron mengatakan dirinya telah mendorong Presiden AS Donald Trump untuk melanjutkan \"upaya-upaya teguh\" untuk mewujudkan kesepakatan gencatan senjata dengan Iran, demi mengakhiri perang di Timur Tengah.\"Saya menyambut baik upaya-upaya teguh yang dilakukannya untuk segera mencapai kesepakatan antara Amerika Serikat dan Iran, yang merupakan kesempatan unik untuk membangun kerangka keamanan baru yang menyatukan semua pihak yang berkepentingan, guna memungkinkan stabilisasi kawasan yang berkelanjutan,\" kata Macron merujuk pada isi percakapan teleponnya dengan Trump pada Minggu (31/5) malam.Iran mengatakan bahwa gencatan senjata di Lebanon tetap menjadi syarat utama untuk kesepakatan apa pun dengan AS, terutama setelah militer Israel merebut benteng bersejarah di Lebanon selatan dalam operasi darat melawan kelompok Hizbullah.\"Saya juga menyambut baik komitmen Presiden Trump terhadap kedaulatan dan integritas teritorial Lebanon, dan menggarisbawahi pentingnya gencatan senjata yang kuat dan dukungan kolektif kita untuk otoritas Lebanon,\" ucap Macron.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2024/06/26/presiden-prancis-emmanuel-macron_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513497/macron-serukan-kesepakatan-segera-as-iran-selat-hormuz-dibuka-lagi"
    },
    {
        "title": "Skywalk Tegar Beriman Jadi Ikon Baru Cibinong",
        "summary": "Kabupaten Bogor - Skywalk Tegar Beriman hadir sebagai ikon baru Cibinong, Kabupaten Bogor. JPO modern ini menggabungkan fungsi, aksesibilitas, dan ruang publik.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/01/skywalk-tegar-beriman-jadi-ikon-baru-cibinong-1780286017360_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/foto-news/d-8512922/skywalk-tegar-beriman-jadi-ikon-baru-cibinong"
    },
    {
        "title": "Pelayat Silih Berganti Datangi Rumah Duka Ryamizard Ryacudu",
        "summary": "Bogor - Keluarga, sahabat, dan kerabat berdatangan ke rumah duka Ryamizard Ryacudu di Cikeas. Mantan KSAD dan Menteri Pertahanan itu wafat pada usia 76 tahun.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/31/pelayat-silih-berganti-datangi-rumah-duka-ryamizard-ryacudu-1780240981914_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/foto-news/d-8512558/pelayat-silih-berganti-datangi-rumah-duka-ryamizard-ryacudu"
    },
    {
        "title": "Trump Klaim Iran Ingin Capai Deal dengan AS, Yakin Akan Terwujud",
        "summary": "Washington DC -\n\t\t\tPresiden Amerika Serikat (AS) Donald Trump mengklaim bahwa Iran sedang berupaya mencapai kesepakatan dengan AS. Trump menyatakan keyakinannya bahwa negosiasi yang sedang berlangsung akan membuahkan hasil yang menguntungkan.Dalam pernyataan terbarunya, seperti dilansir Anadolu Agency, Senin (1/6/2026), Trump mengklaim bahwa Teheran \"benar-benar ingin membuat kesepakatan\" dengan Washington.Dia menggambarkan potensi kesepakatan antara kedua negara sebagai kesepakatan yang akan \"baik untuk AS\" dan mitra-mitranya. \"Iran benar-benar ingin membuat kesepakatan, dan itu akan menjadi kesepakatan yang baik bagi AS dan mereka yang bersama kita,\" kata Trump dalam pernyataannya via Truth Social pada Senin (1/6) dini hari waktu AS. Trump kemudian mengkritik para lawan politiknya dan beberapa anggota partainya sendiri, Partai Republik, yang disebutnya \"tidak patriotik\".Dia mengatakan bahwa negosiasi menjadi \"jauh lebih sulit\" ketika \"para politisi oportunis terus menerus 'berceloteh' secara negatif\", termasuk menyerukan pendekatan yang berbeda, menuntut untuk bergerak lebih cepat atau lebih lambat, melakukan tindakan militer atau menghindarinya.Trump menyebut kritikan terhadap dirinya kini terjadi pada tingkat \"yang belum pernah terjadi sebelumnya\".Dia lantas menyerukan agar para pengkritiknya tetap bersabar saat negosiasi terus berlanjut. \"Tenang saja, semuanya akan berjalan dengan dengan baik pada akhirnya -- Selalu begitu!\" ucap Presiden AS itu. Ketegangan di kawasan Timur Tengah meningkat sejak AS dan Israel melancarkan serangan skala besar terhadap Iran pada akhir Februari lalu. Teheran merespons dengan gelombang serangan rudal dan drone terhadap target-target di Israel dan negara-negara Teluk yang menampung aset militer AS.Sebagian besar serangan terhenti sejak gencatan senjata diberlakukan pada awal April lalu, yang kemudian diperpanjang tanpa batas waktu oleh Trump. Sementara itu, upaya perdamaian untuk mengakhiri perang terus dilakukan para mediator, terutama Pakistan, namun sejauh ini belum membuahkan hasil konkret.Perkembangan terbaru, berdasarkan laporan media-media Barat, seperti New York Times (NYT) dan Axios, menyebutkan bahwa Trump telah mengirimkan versi revisi dari kerangka kerja perdamaian yang diusulkan, yang berisi persyaratan yang \"lebih keras\", untuk dipertimbangkan oleh Iran.Detail mengenai perubahan yang dilakukan Trump pada draf kesepakatan yang diusulkan itu tidak diketahui secara jelas. Namun setiap perubahan pada draf yang diusulkan dapat semakin menunda kesepakatan untuk secara resmi mengakhiri perang.Trump telah mengatakan bahwa prioritasnya termasuk menghentikan Iran dari pengembangan senjata nuklir dan membuka kembali jalur pelayaran strategis di Selat Hormuz, yang secara efektif ditutup oleh Iran sejak perang dimulai pada akhir Februari.Namun perunding utama Iran, Mohammad Bagher Ghalibaf, memperingatkan bahwa Teheran tidak akan menyetujui kesepakatan apa pun dengan Washington sampai hak-hak rakyat Iran sepenuhnya dijamin.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/03/28/presiden-as-donald-trump-1774691700575_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513388/trump-klaim-iran-ingin-capai-deal-dengan-as-yakin-akan-terwujud"
    },
    {
        "title": "Dunia Hari Ini: Ledakan di Myanmar Tewaskan Lebih dari 45 Orang",
        "summary": "",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/01/ledakan-di-desa-kaungtup-meratakan-rumah-rumah-dan-menewaskan-puluhan-orang-1780312828027_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/abc-australia/d-8513538/dunia-hari-ini-ledakan-di-myanmar-tewaskan-lebih-dari-45-orang"
    },
    {
        "title": "Jenderal Iran: Trump Harus Pilih Antara Opsi 'Buruk' atau 'Lebih Buruk'",
        "summary": "Teheran -\n\t\t\tSeorang jenderal militer Iran memperingatkan bahwa Presiden Amerika Serikat (AS) Donald Trump sama sekali tidak memiliki pilihan yang baik terkait Iran. Dia mengatakan bahwa Trump harus memilih antara pilihan yang \"buruk\" atau \"lebih buruk\".Peringatan tersebut, seperti dilansir Press TV, Senin (1/6/2026), disampaikan oleh Brigadir Jenderal Yadollah Javani yang menjabat sebagai Wakil Bidang Urusan Politik pada Korps Garda Revolusi Islam Iran (IRGC).\"Trump, yang kekalahannya dalam perang telah menjadi jelas bagi siapa pun, sekarang menghadapi dua jalan ke depan: jalan yang buruk atau jalan yang lebih buruk,\" cetus Javani dalam pernyataan pada Sabtu (30/5) malam waktu setempat. Javani mengatakan bahwa Trump harus memilih antara mengakui kondisi dan hak-hak rakyat Iran, atau melanjutkan perang terhadap Teheran. Dia menekankan bahwa \"musuh\" telah melakukan kesalahan strategis dalam perhitungannya dengan melancarkan agresi terhadap Iran. \"Iran telah memenangkan pertempuran ini, dan Amerika Serikat sedang menuju spiral kekalahan dan kemunduran,\" sebutnya.Diklaim oleh Javani bahwa terjadi pergeseran di kawasan yang menguntungkan Iran, yang disebutnya saat ini memegang posisi dominan atas Selat Hormuz, jalur perairan strategis yang terdampak perang. Dia menegaskan status dan hak sah bangsa Iran atas jalur perairan vital tersebut.\"Iran sekarang berada dalam posisi kemenangan dan superioritas. Republik Islam (Iran) telah menyatakan syarat-syaratnya untuk memecah kebuntuan saat ini, dan sekarang giliran Amerika Serikat untuk mengambil keputusan mengenai masalah ini,\" kata Javani dalam pernyataannya. Lebih lanjut, jenderal senior IRGC itu memperingatkan agar musuh-musuh Iran tidak melakukan kesalahan perhitungan lebih lanjut. Dia menegaskan bahwa militer Iran sepenuhnya siap dan akan memberikan respons yang jauh lebih kuat, lebih tegas, dan lebih tidak terduga jika musuh melakukan kesalahan lagi.Negosiasi antara AS dan Iran dilaporkan terus berlangsung, dengan laporan media-media Barat, seperti New York Times (NYT) dan Axios, menyebut Trump telah mengirimkan versi revisi dari kerangka kerja perdamaian yang diusulkan, yang berisi persyaratan yang \"lebih keras\", untuk dipertimbangkan oleh Iran.Detail mengenai perubahan yang dilakukan Trump pada draf kesepakatan yang diusulkan itu tidak diketahui secara jelas. Namun setiap perubahan pada draf yang diusulkan dapat semakin menunda kesepakatan untuk secara resmi mengakhiri perang.Trump telah mengatakan bahwa prioritasnya termasuk menghentikan Iran dari pengembangan senjata nuklir dan membuka kembali jalur pelayaran strategis di Selat Hormuz, yang secara efektif ditutup oleh Iran sejak perang dimulai pada akhir Februari.Dalam pernyataan terbaru, perunding utama Iran, Mohammad Bagher Ghalibaf, memperingatkan bahwa Teheran tidak akan menyetujui kesepakatan apa pun dengan Washington sampai hak-hak rakyat Iran sepenuhnya dijamin.\"Kami tidak akan menyetujui perjanjian apa pun sampai kami yakin bahwa hak-hak rakyat Iran telah ditegakkan,\" tegas Ghalibaf dalam sebuah video yang disiarkan oleh televisi pemerintah Iran.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2024/04/05/ilustrasi-pasukan-garda-revolusi-iran_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513235/jenderal-iran-trump-harus-pilih-antara-opsi-buruk-atau-lebih-buruk"
    },
    {
        "title": "AS Serang Situs Radar Iran, Kuwait Hadapi Serangan Rudal-Drone",
        "summary": "Amerika Serikat (AS) mengklaim telah menyerang sejumlah situs militer Iran pada akhir pekan, sementara Teheran mengatakan pihaknya membalas dengan menargetkan sebuah pangkalan AS. Ini menandai eskalasi besar ketiga dalam sepekan di sekitar Selat Hormuz. Komando Pusat AS (CENTCOM) menyebut serangan itu sebagai \"serangan untuk membela diri\" sebagai respons atas \"tindakan agresif Iran\", yang menurut mereka termasuk penembakan jatuh sebuah drone AS di atas perairan internasional. Korps Garda Revolusi Islam Iran (IRGC) mengatakan mereka menargetkan sebuah pangkalan udara yang digunakan oleh pasukan AS untuk melancarkan serangan ke wilayah selatan Iran, tanpa merinci lokasi spesifiknya.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/01/as-serang-situs-radar-iran-kuwait-hadapi-serangan-rudal-dan-drone-1780312476310.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/bbc-world/d-8513541/as-serang-situs-radar-iran-kuwait-hadapi-serangan-rudal-drone"
    },
    {
        "title": "Ancaman Terbaru AS untuk Iran",
        "summary": "Jakarta -\n\t\t\tAmerika Serikat (AS) memberikan ancaman baru kepada Iran. Menteri Pertahanan Amerika Serikat (Menhan AS), Pete Hegseth, menyebut pihaknya siap melanjutkan pertempuran dengan Iran.\"Kami fokus pada kesiapan dan persiapan untuk kembali terlibat jika perlu,\" kata Hegseth selama kunjungan ke Singapura, dilansir CNN Internasional pada Minggu, (31/5/2026).Namun, Presiden AS Donald Trump lebih memilih untuk tidak melakukannya. Adapun, kata Hegseth, tujuan Trump adalah agar Iran tidak mampu memiliki senjata nuklir. \"Target tersebut sama sekali tidak berubah,\" kata dia. Hegseth mengatakan bahwa pembicaraan produktif telah digelar.\"Saya pikir mereka tahu ke mana arahnya,\" ujarnya. \"Mereka ingin mengatakan bahwa mereka mengendalikan Selat Hormuz, tetapi kitalah yang mengendalikannya,\" tambah Hegseth.Sebelumnya, saat menghadiri Dialog Shangri-La di Singapura, Hegseth mengatakan bahwa Trump bersabar untuk memastikan bahwa setiap pakta perdamaian dengan Iran menjamin bahwa Iran tidak akan memperoleh senjata nuklir.\"Jika Iran tidak ingin membuat kesepakatan besar yang memastikan mereka tidak mendapatkan senjata nuklir, mereka dapat berurusan dengan militer AS,\" kata Hegseth.Ia juga menambahkan bahwa persediaan senjata AS sudah cukup untuk menyelesaikan pekerjaan tersebut.Gedung Putih Beri SinyalSementara itu, dilansir AFP, Gedung Putih telah memberi sinyal bahwa Trump hampir mengambil keputusan tentang potensi kesepakatan, meskipun Teheran membantah adanya kesepakatan akhir untuk mengakhiri konflik.Sumber-sumber AS mengatakan kepada AFP bahwa kesepakatan itu menunggu persetujuan Trump, tetapi dia tidak membuat keputusan setelah pertemuan Ruang Situasi Gedung Putih pada hari Jumat. Sementara itu, Komando Pusat AS (CENTCOM) memposting di X bahwa pasukan Amerika \"tetap hadir dan waspada di seluruh wilayah.\"Meskipun gencatan senjata sebagian besar telah berlangsung sejak April, terjadi peningkatan ketegangan sesekali.Kantor berita negara Iran, IRNA, mengatakan pertahanan udara menembak jatuh sebuah drone \"milik musuh agresor Zionis-AS\" pada hari Sabtu, mengutip militer.Meskipun demikian, diplomasi terus berlanjut, termasuk untuk menghentikan pertempuran paralel di Lebanon, yang menurut Iran harus menjadi bagian dari kesepakatan apa pun untuk mengakhiri perang dan di mana pasukan Israel telah maju lebih jauh bahkan ketika delegasi militer dari kedua negara bertemu di Pentagon pada hari Jumat.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/04/28/bendera-iran-dan-amerika-1777367923048_169.png?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8512479/ancaman-terbaru-as-untuk-iran"
    },
    {
        "title": "Trump Tegaskan Usulan Kesepakatan Larang Iran Peroleh Senjata Nuklir",
        "summary": "Washington DC -\n\t\t\tPresiden Amerika Serikat (AS) Donald Trump menegaskan bahwa kesepakatan yang diusulkan dengan Iran secara eksplisit melarang Teheran untuk memperoleh senjata nuklir. Penegasan Trump ini menolak klaim yang menyebut kerangka kerja kesepakatan yang diusulkan itu tidak membahas isu-isu nuklir.Trump, seperti dilansir Anadolu Agency, Senin (1/6/2026), menyampaikan penegasan itu dalam pernyataan terbaru via akun media sosial Truth Social miliknya pada Minggu (31/5) waktu setempat.Ditegaskan Trump bahwa kesepakatan yang diusulkan \"menyatakan, dengan sangat jelas, bahwa Iran tidak akan memiliki Senjata Nuklir\". Presiden AS itu menegaskan bahwa usulan kesepakatan tersebut berisi ketentuan yang luas terkait program nuklir Iran. Pernyataan Trump ini tampaknya merespons laporan media terkemuka AS, CNN, yang menyebut kerangka kerja dalam kesepakatan yang diusulkan tidak membahas isu-isu nuklir secara memadai -- karakterisasi yang sangat dia tolak.\"Kemudian dilanjutkan, dengan sangat detail dan panjang lebar, untuk membahas berbagai aspek-aspek lainnya dari nuklir. Bahkan, itulah sebagian besar isi perjanjian tersebut,\" sebut Trump dalam pernyataannya.Dia juga mengkritik beberapa media, yang dituduhnya telah salah mengartikan isi perjanjian yang diusulkan.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/19/presiden-as-donald-trump-1779158530400_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8512812/trump-tegaskan-usulan-kesepakatan-larang-iran-peroleh-senjata-nuklir"
    },
    {
        "title": "Negosiasi Damai Meruncing: Trump Perketat Syarat, Iran Tegas Menolak",
        "summary": "berupaya mengubah beberapa persyaratan dalam usulan proposal untuk mengakhiri perang di Timur Tengah. Namun Kepala Negosiator Iran, Mohammad Bagher Ghalibaf menyebut Iran tak akan menyetujui kesepakatan apapun dengan AS jika gagal menjamin hak rakyat Iran. Dilansir AFP, Minggu (31/5/2026), Trump dilaporkan berupaya mengubah beberapa syarat dalam usulan proposal untuk mengakhiri perang di Timur Tengah. The New York Times melaporkan perubahan yang dilakukan Trump melibatkan penguatan persyaratan kesepakatan. AS juga telah mengirimkan kerangka kerja baru tersebut kembali untuk dipertimbangkan oleh Iran. Hal itu disampaikan para pejabat yang mengetahui proses tersebut.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/08/donald-trump-1778201687848_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8512308/negosiasi-damai-meruncing-trump-perketat-syarat-iran-tegas-menolak"
    },
    {
        "title": "Iran Targetkan Pangkalan Udara AS Usai Wilayahnya Diserang",
        "summary": "Teheran -\n\t\t\tKorps Garda Revolusi Islam Iran (IRGC) mengatakan pasukannya, pada Senin (1/6) pagi, telah menargetkan sebuah pangkalan udara Amerika Serikat (AS) yang digunakan untuk menyerang wilayah Iran. IRGC mengklaim semua target yang ditetapkan telah dihancurkan dalam serangan pembalasan tersebut.Lokasi pangkalan udara AS yang menjadi target serangan, seperti dilansir AFP dan Anadolu Agency, Senin (1/6/2026), tidak disebutkan secara spesifik oleh IRGC dalam pernyataannya, yang disiarkan televisi IRIB dan media pemerintah Iran lainnya.Namun pernyataan IRGC ini dirilis setelah militer Kuwait mengumumkan sistem pertahanan udara mereka berhasil mencegat \"serangan rudal dan drone musuh\". AS diketahui memiliki pangkalan militer di berbagai negara Teluk, termasuk Kuwait. IRGC, dalam pernyataannya yang dikutip kantor berita Mehr News Agency, mengatakan bahwa Angkatan Udara mereka telah menargetkan dan menghancurkan pangkalan yang menjadi tempat pasukan AS melancarkan operasi terhadap fasilitas komunikasi di Pulau Sirik, Provinsi Hormozgan bagian selatan. Pulau Sirik terletak di dekat Selat Hormuz yang strategis, yang terdampak perang yang berkecamuk antara Iran melawan AS dan Israel sejak akhir Februari.Disebutkan IRGC dalam pernyataannya bahwa serangannya dilancarkan beberapa jam setelah serangan AS tersebut.IRGC mengklaim bahwa semua target yang telah ditetapkan berhasil dihancurkan dalam serangan tersebut. IRGC juga memperingatkan bahwa serangan lebih lanjut akan memicu respons \"yang berbeda dalam skala dan bentuknya\", dan bahwa tanggung jawab atas setiap eskalasi akan berada di tangan AS.Belum ada komentar langsung dari pemerintah atau militer AS terhadap klaim IRGC tersebut.Sebelumnya, Komando Pusat AS atau CENTCOM mengumumkan pasukannya telah menyerang lokasi radar dan pusat komando drone Iran yang ada di area Goruk dan Pulau Qeshm pada Sabtu (30/5) dan Minggu (31/5) waktu setempat.CENTCOM mengklaim serangan yang melibatkan jet tempur AS itu sebagai \"serangan pertahanan diri\", untuk merespons \"tindakan agresif Iran yang mencakup menembak jatuh drone MQ-1 AS yang beroperasi di atas perairan internasional\".",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2024/11/23/iran-pamerkan-rudal-di-tengah-konflik-timur-tengah_43.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/internasional/d-8513067/iran-targetkan-pangkalan-udara-as-usai-wilayahnya-diserang"
    },
    {
        "title": "Kata Rayhan Hannan Usai Dipanggil John Herdman Perkuat Timnas Indonesia",
        "summary": "Rayhan Hannan, gelandang muda Persija, kembali dipanggil Timnas Indonesia untuk laga FIFA Matchday melawan Oman (5/6) dan Mozambik (9/6) di GBK. Pemain 22 tahun ini bersyukur mendapat kesempatan, terutama bisa belajar dari pemain diaspora. Ia mengaku termotivasi oleh semangat pelatih John Herdman",
        "thumbnails": "https://img.youtube.com/vi/kutjA9tkcFM/hqdefault.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/superskor/7836879/kata-rayhan-hannan-usai-dipanggil-john-herdman-perkuat-timnas-indonesia"
    },
    {
        "title": "Diaspora Muda Indonesia Tanggapi Pernyataan Seskab Teddy",
        "summary": "Diaspora Muda Indonesia menegaskan, diplomasi internasional tidak dapat diukur hanya dari frekuensi perjalanan atau intensitas pertemuan. Pemerintah telah menjelaskan adanya sejumlah hasil nyata, mulai dari penguatan hubungan strategis dengan berbagai negara. Kritik dan masukan dari berbagai pihak merupakan bagian penting dalam demokrasi.",
        "thumbnails": "https://asset.tribunnews.com/0AQkHZtfDPIIowImjZNw06LDKTs=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Seskab-Teddy-Indra-Wijaya-OK.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836896/diaspora-muda-indonesia-tanggapi-pernyataan-seskab-teddy"
    },
    {
        "title": "Seskab Teddy Jawab soal Prabowo Sering Keluar Negeri: Salah Besar Kalau Dibilang Gagah-gagahan",
        "summary": "Seskab Teddy klarifikasi terkait kritik publik mengenai frekuensi kunjungan luar negeri Presiden Prabowo Subianto dalam 1,5 tahun terakhir. Perjalanan itu bukan sekadar seremoni atau kunjungan formalitas. Melainkan langkah agar memperkuat posisi Indonesia di tengah krisis global.",
        "thumbnails": "https://asset.tribunnews.com/CouFc-y8S8ytFTUz0Ow1El7kG8Q=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Prabowo-Subianto-melambaikan-tangan-pesawat-kepresidenan-lepas-landas-Bandara-Prancis.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836697/seskab-teddy-jawab-soal-prabowo-sering-keluar-negeri-salah-besar-kalau-dibilang-gagah-gagahan"
    },
    {
        "title": "Komisi III DPR: Polisi Juga Harus Bisa Mengoreksi Komnas HAM",
        "summary": "",
        "thumbnails": "",
        "source": "tribun",
        "link": "https://m.tribunnews.com/nasional/7836863/komisi-iii-dpr-polisi-juga-harus-bisa-mengoreksi-komnas-ham"
    },
    {
        "title": "Emrus Kritik Gaya Komunikasi Teddy saat Menanggapi Dino Patti Djalal",
        "summary": "Emrus Sihombing menilai pernyataan Seskab Teddy Indra Wijaya kepada Dino Patti Djalal mengandung unsur sarkastis. Penyebutan masa jabatan Dino sebagai Wakil Menteri Luar Negeri dinilai tidak perlu disampaikan ke ruang publik. Emrus juga menegaskan respons terhadap kritik publik semestinya menjadi tugas Badan Komunikasi Pemerintah (Bakom), bukan Seskab.",
        "thumbnails": "https://img.youtube.com/vi/JKoys_iCSH0/hqdefault.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836877/emrus-kritik-gaya-komunikasi-teddy-saat-menanggapi-dino-patti-djalal"
    },
    {
        "title": "Refleksi Ekonomi Politik Hari Kelahiran Pancasila",
        "summary": "TRIBUNNERS - Selebrasi atas ketahanan ekonomi nasional kerap terdengar nyaring di berbagai forum resmi. Data Badan Pusat Statistik merekam pertumbuhan ekonomi nasional yang bertengger kokoh pada angka 5,11 persen sepanjang tahun 2025 , bahkan berakselerasi menjadi 5,61 persen pada triwulan pertama tahun 2026. Inflasi tahunan pun terjaga jinak pada level 2,42 persen per April 2026, dengan rasio utang pemerintah terhadap produk domestik bruto yang aman di kisaran 38,6 persen.",
        "thumbnails": "https://asset.tribunnews.com/jLiQAvcLm55UgMnNdNqkMU1EGoI=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/jannus-th-siahaan-1779163422692.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/tribunners/7836917/refleksi-ekonomi-politik-hari-kelahiran-pancasila"
    },
    {
        "title": "Gerindra Anggap Kritik dari PDIP Jadi Vitamin bagi Pemerintah",
        "summary": "Partai Gerindra menilai kritik yang disampaikan PDIP terhadap pemerintah merupakan bagian penting dari proses demokrasi dan dapat menjadi masukan bagi pemerintah dalam menjalankan programnya. Juru Bicara Partai Gerindra, Bahtra Banong, mengatakan pemerintah menghargai berbagai kritik dan pandangan yang berkembang di masyarakat maupun dari partai politik. Menurutnya, kritik justru menjadi \"vitamin\" yang membantu pemerintah mengambil kebijakan.",
        "thumbnails": "https://asset.tribunnews.com/0KM08pfIK4q6bx9bdrP4LjRHqnY=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/gerindra-sebut-kritik-PDIP-vitamin.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836893/gerindra-anggap-kritik-dari-pdip-jadi-vitamin-bagi-pemerintah"
    },
    {
        "title": "Mendikdasmen: Bullying di Sekolah Kerap Berawal dari Candaan Sesama Siswa",
        "summary": "Menteri Abdul Mu'ti mengingatkan bahwa perundungan (bullying) di sekolah sering bermula dari candaan yang dianggap lucu oleh pelaku, namun justru menyakiti dan melestarikan korban. Ejekkan terkait kondisi fisik atau kemampuan seseorang termasuk bentuk terbuka dan perundungan yang tidak dapat dianggap sebagai lelucon biasa. Untuk mencegah perundungan, Kemendikdasmen mendorong terciptanya lingkungan sekolah yang aman, nyaman, dan lebih humanis.",
        "thumbnails": "https://asset.tribunnews.com/q7xxbW7D-k878DcPKFp4NUz51yU=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/uncuran-Budaya-Sekolah-Aman-d-n-Jakarta-Selasa-262026.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836852/mendikdasmen-bullying-di-sekolah-kerap-berawal-dari-candaan-sesama-siswa"
    },
    {
        "title": "Badan Gizi Nasional Validasi Data Penerima MBG, Libatkan 6 Kementerian",
        "summary": "Badan Gizi Nasional (BGN) melakukan validasi data penerima manfaat Program Makan Bergizi Gratis (MBG). Validasi data melibatkan 6 kementerian hingga pemerintah daerah agar layanan tepat sasaran dan merata. Langkah tersebut juga mendapat dukungan penuh dari Kantor Staf Presiden (KSP).",
        "thumbnails": "https://asset.tribunnews.com/3VWWzd7yzpDl0DK9CKovUJHJMxk=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Nurworo-Danang-dan-sony-sonjaya-1.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836821/badan-gizi-nasional-validasi-data-penerima-mbg-libatkan-6-kementerian"
    },
    {
        "title": "Pentagon Perketat Kontrol Informasi, Wartawan Kini Dilarang Masuk Kantor Pers",
        "summary": "Departemen Pertahanan AS melarang jurnalis memasuki kantor pers Pentagon setelah area tersebut ditetapkan sebagai fasilitas informasi sensitif. kebijakan itu menjadi bagian dari serangkaian pembatasan akses media sejak Donald Trump kembali menjabat. Organisasi kebebasan pers menilai langkah tersebut mengancam transparansi dan pengawasan independen terhadap militer AS.",
        "thumbnails": "https://asset.tribunnews.com/PikwUXg2vfV5A54W1e-I-ERoU-k=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/TANGGAPAN-DONALD-TRUMP-SOAL-PROPOSAL-IRAN-11052026.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/internasional/7836841/pentagon-perketat-kontrol-informasi-wartawan-kini-dilarang-masuk-kantor-pers"
    },
    {
        "title": "Ketagihan Produk Akademi Real Madrid, Como Incar Cesar Palacios",
        "summary": "Como dikabarkan tertarik merekrut talenta akademi Real Madrid, yakni Cesar Palacios, pada bursa transfer musim panas 2026. Transfer Palacios disebut berkaitan dengan hubungan baik antara Real Madrid dan Como yang sebelumnya telah bekerja sama dalam kepindahan Nico Paz ke Como. Real Madrid berencana mempertahankan 50 persen hak kepemilikan Palacios, sehingga tetap memiliki kendali atas masa depannya dan peluang untuk mendapatkan keuntungan atau membawanya kembali di kemudian hari.",
        "thumbnails": "https://asset.tribunnews.com/fhCsfqFOPI4AaJe0k7MvJnKu9cE=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Pemain-akademi-Real-Madrid-Cesar-Palacios.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/superskor/7836805/ketagihan-produk-akademi-real-madrid-como-incar-cesar-palacios"
    },
    {
        "title": "Profil Savero, Pemain Mobile Legends Indonesia yang Gegerkan MPL Filipina",
        "summary": "Profil singkat dari Savero salah satu pemain Mobile Legends asal Indonesia yang curi perhatian di MPL Filipina. Penampilannya mendapat banyak pujian di Filipina, dengan beberapa kali meraih MVP dan dianggap sebagai salah satu gold laner paling fleksibel di MPL PH Season 17. Meski gagal lolos ke MSC/EWC 2026, Savero tetap mendapat apresiasi tinggi dari komunitas dan rekan setimnya, termasuk K1NGKONG yang menyebutnya sangat layak tampil di panggung internasional.",
        "thumbnails": "https://asset.tribunnews.com/kUKc2X-p0Gr2UczycoZbudpEN3g=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Gold-Lane-ONIC-PH-Savero.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/e-sport/7836870/profil-savero-pemain-mobile-legends-indonesia-yang-gegerkan-mpl-filipina"
    },
    {
        "title": "Kurban Sapi Bantuan Presiden Prabowo Subianto dalam Perspektif Fikih Islam",
        "summary": "PADA hari lebaran Idul Adha tahun ini, 1447 H/2026 M, muncul polemik yang viral. Presiden Prabowo Subianto menetapkan kebijakan pendistribusian 1.098 sapi untuk kurban dengan menggunakan APBN senilai Rp 100 miliar. Pro dan kontra terjadi. Kelompok yang pro menganggapnya sudah tepat dan sah, dan kelompok yang kontra menganggapnya tidak tepat dan mempertanyakan keabsahan secara fikih.",
        "thumbnails": "https://asset.tribunnews.com/8lgA9t6XJtOJ25ipoLWhSKBixoE=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/mukti-ali-qusyairi-1780385066349.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/tribunners/7836930/kurban-sapi-bantuan-presiden-prabowo-subianto-dalam-perspektif-fikih-islam"
    },
    {
        "title": "Gerindra Kritik Balik Dino Patti Djalal: Sok Paling Kemlu",
        "summary": "Waketum Partai Gerindra Habiburokhman mengkritik mantan Wamenlu Dino Patti Djalal yang menyoroti seringnya kunjungan ke luar negeri Presiden Prabowo Subianto. Habiburokhman menilai kritik itu kurang elegan dan meminta Dino memberi kesempatan kerja kepada pemerintah. Dino menyarankan agar Prabowo mengurangi perjalanan ke luar negeri, memanfaatkan pertemuan virtual guna menghemat anggaran dan meningkatkan akuntabilitas.",
        "thumbnails": "https://asset.tribunnews.com/zFOYL1pM5G4bWXlvy1D2E07jZFk=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/saat-ditemui-di-kompleks-pa.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836856/gerindra-kritik-balik-dino-patti-djalal-sok-paling-kemlu"
    },
    {
        "title": "Detik-detik Kebakaran di Kemayoran Meluas, Warga Berlarian Selamatkan Diri",
        "summary": "Kebakaran hebat di Kebon Kosong Kemayoran memaksa warga panik berlarian menyelamatkan diri. Seorang warga terdampak mengaku hanya sempat mengamankan dokumen berharga dari rumahnya. Api diduga cepat meluas karena pemilik warung makan sempat mencoba memadamkannya sendiri.",
        "thumbnails": "https://asset.tribunnews.com/vq1RcAlyD9VanIu7KxGqRCS9QpU=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/kebakaran-di-Jalan-Kemayoran-Gempol-Kebon-Kosong-Kemayoran.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/metropolitan/7836690/detik-detik-kebakaran-di-kemayoran-meluas-warga-berlarian-selamatkan-diri"
    },
    {
        "title": "Hizbullah Tolak Gencatan Senjata Sepihak, Desak Komitmen Jelas dari Israel",
        "summary": "Hezbollah menolak penerapan gencatan senjata yang bersifat sepihak di Lebanon. Kelompok itu menuntut penghentian serangan Israel melalui darat, udara, dan laut serta penarikan pasukan dari wilayah Lebanon. Pernyataan tersebut muncul setelah Presiden AS Donald Trump mengklaim Israel dan Hezbollah telah sepakat menghentikan serangan melalui jalur mediasi.",
        "thumbnails": "https://asset.tribunnews.com/NnH3QRR_iX2H0HL7W93ZfbfGOu0=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Pemakaman-Petinggi-Hizbullah-yang-Dibunuh-Israel_20251125_200702.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/internasional/7836800/hizbullah-tolak-gencatan-senjata-sepihak-desak-komitmen-jelas-dari-israel"
    },
    {
        "title": "Sidang Kasus Chromebook Hari Ini, Agenda Pembelaan Terdakwa Nadiem Makarim",
        "summary": "Sidang perkara dugaan korupsi pengadaan laptop Chromebook Terdakwa Nadiem Makarim berlanjut hari ini, Selasa (2/6/2026). Agenda persidangannya yakni pembelaan bagi Nadiem dan kuasa hukumnya. Nadiem Makarim dalam perkara ini telah dituntut 18 tahun penjara, denda Rp 1 miliar subsider 190 hari kurungan penjara, uang pengganti Rp809 miliar dan Rp 4,8 triliun subsider 9 tahun penjara.",
        "thumbnails": "https://img.youtube.com/vi/Wpa-GG9I3UI/hqdefault.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7836743/sidang-kasus-chromebook-hari-ini-agenda-pembelaan-terdakwa-nadiem-makarim"
    },
    {
        "title": "Arogansi Fabio Quartararo Menjadikannya sebagai Musuh Media di MotoGP 2026",
        "summary": "Fabio Quartararo menjadi musuh dari media di MotoGP 2026 karena sikap arogansinya Fabio Quartararo melewatkan sesi media pers setelah balapan MotoGP Italia 2026 Fabio Quartararo tidak memiliki gairah balapan di musimnya terakhirnya bersama Yamaha sebelum hengkang ke Honda HRC pada MotoGP 2027",
        "thumbnails": "https://asset.tribunnews.com/_6o6OK6MgVioqGtRkk7lhS0OF-k=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/fabio-quartararo-berpose-untuk-foto-di-valencia.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/sport/7836727/arogansi-fabio-quartararo-menjadikannya-sebagai-musuh-media-di-motogp-2026"
    },
    {
        "title": "Kebakaran di Kemayoran: Tiga Orang Terluka, 500 Kepala Keluarga Terdampak",
        "summary": "Kebakaran hebat melanda Pasar Jiung, Kemayoran, Senin (1/6) malam, melukai tiga warga yang dirawat di RS Hermina dan RSCM. Kapolres Reynold Tutagalung menyebut 400–500 KK terdampak. Damkar kerahkan 35 unit, 200 personel gabungan turun membantu evakuasi.",
        "thumbnails": "https://img.youtube.com/vi/Cx0lCVUTMXc/hqdefault.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/metropolitan/7836771/kebakaran-di-kemayoran-tiga-orang-terluka-500-kepala-keluarga-terdampak"
    },
    {
        "title": "3 Jalur Mandiri UNM 2026, Cek Syarat dan Jadwal Pendaftarannya",
        "summary": "Universitas Negeri Makassar (UNM) membuka tiga seleksi jalur mandiri tahun 2026, ada jalur prestasi, skor UTBK, dan ujian tulis. Jalur mandiri UNM 2026 dapat diikuti oleh lulusan SMA/MA/SMK/Sederajat tahun 2024, 2025, dan 2026. Pendaftaran dilakukan secara online melalui laman daftar-mandiri.unm.ac.id.",
        "thumbnails": "https://asset.tribunnews.com/Z0W7Szrwf7khPA46LddmNqedHI8=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/universitas-negeri-makassar-x.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/pendidikan/7836756/3-jalur-mandiri-unm-2026-cek-syarat-dan-jadwal-pendaftarannya"
    },
    {
        "title": "IHSG Pagi Ini Melesat 1,85 Persen ke Level 6.240",
        "summary": "IHSG dibuka menguat dan hingga pukul 09.10 WIB melonjak 1,85 persen atau 113,15 poin ke level 6.240,53. Sebanyak 330 saham menguat, sementara nilai transaksi mencapai Rp379 miliar dengan volume 3,66 miliar saham. Analis menilai pergerakan IHSG masih dibayangi pelemahan rupiah yang berpotensi memicu aksi jual investor asing, terutama pada saham perbankan besar.",
        "thumbnails": "https://asset.tribunnews.com/sPWqBQG_mTmKUt3V57w7ZXARxKw=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/IHSG-Kembali-Melemah-Pada-Penutupan-Perdagangan_20260202_211427.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/bisnis/7836769/ihsg-pagi-ini-melesat-185-persen-ke-level-6240"
    },
    {
        "title": "Acha Septriasa Tanggapi Santai Dijodohkan dengan Baim Wong",
        "summary": "Acha Septriasa santai saat netizen ramai menjodoh-jodohkan dirinya dengan Baim Wong buntut film Suamiku Lukaku. Acha Septriasa mengaku tidak terlalu memikirkan fenomena tersebut. Menurutnya, kedekatan yang terlihat antara dirinya dan Baim Wong berangkat dari hubungan pertemanan yang sudah terjalin sangat lama.",
        "thumbnails": "https://asset.tribunnews.com/RhVX2WmXPqcD9LSc-IBII4hkOHE=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/acha-septriasas.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/seleb/7836823/acha-septriasa-tanggapi-santai-dijodohkan-dengan-baim-wong"
    },
    {
        "title": "Pancasila dan Narasi Geopolitik Soekarno",
        "summary": "PERINGATAN Hari Lahir Pancasila pada 1 Juni 2026 ini terasa sangat filosofis dan fundamental. Di tengah situasi geopolitik dunia yang sedang bergejolak dan arah kebijakan luar negeri Indonesia yang terkesan gamang dalam merespons arus kekuatan global yang semakin bergerak liar, menengok kembali nilai-nilai budaya bangsa yang terkandung di dalam Pancasila seperti menemukan oase di padang gurun. Pancasila bukan saja berlaku sebagai dasar negara dan falsafah hidup kebangsaan. Pancasila hadir sebagai weltanschauung, yakni pola pikir dan pola sikap bangsa Indonesia terhadap dunia.",
        "thumbnails": "https://asset.tribunnews.com/dmZhbXc2A9E-fwEDnZ3uxU1A0R4=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/boy-anugerah-sip-msi-mpp-1777383439654.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/tribunners/7836836/pancasila-dan-narasi-geopolitik-soekarno"
    },
    {
        "title": "Transjabodetabek Terus Diperluas, Mobilitas Warga Kian Mudah",
        "summary": "TRIBUNNEWS.COM – Mobilitas masyarakat di kawasan Jabodetabek terus mengalami perubahan. Jika sebelumnya kendaraan pribadi menjadi pilihan utama untuk bepergian lintas kota, kini semakin banyak warga mulai beralih menggunakan transportasi publik yang dinilai lebih praktis, terjangkau, dan terintegrasi. Tren tersebut terlihat dari meningkatnya jumlah pengguna layanan Transjabodetabek dalam beberapa bulan terakhir. Data Transjakarta mencatat jumlah pelanggan Transjabodetabek pada April 2026 mencapai 2.467.493 penumpang atau meningkat sekitar 22 persen dibandingkan Maret 2026, yakni 2.021.547 pelanggan. Peningkatan tersebut menunjukkan antusiasme masyarakat terhadap layanan transportasi publik lintas wilayah yang semakin terkoneksi dengan Jakarta.",
        "thumbnails": "https://asset.tribunnews.com/HIAgXL55QnJAGLEgaXlCsk8spYU=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/RUTE-BARU-TRANSJABODETABEK-2026.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/metropolitan/7836774/transjabodetabek-terus-diperluas-mobilitas-warga-kian-mudah"
    },
    {
        "title": "Ruben Onsu Disebut Masih Sulit Bertemu Anak Sejak Desember 2025",
        "summary": "Pengacara Ruben Onsu, Minola Sebayang klaim kliennya kesulitan untuk bertemu dengan ketiga anaknya sejak bercerai dengan Sarwendah. Minola menyebut Ruben sudah tidak bertemu langsung dengan anak-anaknya sejak Desember 2025. Ruben Onsu telah berupaya menjalin komunikasi dengan anak-anaknya, baik melalui pesan singkat maupun melalui Sarwendah. Namun, upaya tersebut disebut tidak berjalan mudah.",
        "thumbnails": "https://asset.tribunnews.com/V1uOVS005RFgSftxbBI4AJkxxTU=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Ruben-Onsu-akhirnya-ungkap-penyebab-cerai-dengan-Sarwendah.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/seleb/7836832/ruben-onsu-disebut-masih-sulit-bertemu-anak-sejak-desember-2025"
    },
    {
        "title": "Buku Malraux di Kertanegara 4",
        "source": "tempo",
        "summary": "RUANG tamu di Jalan Kertanegara 4, Kebayoran Baru, itu tertata rapi. Kursi-kursi disusun dengan jarak yang pas, seolah memberi ruang bagi percakapan untuk bernapas. Saya tiba di rumah itu sebelum pukul sembilan pagi.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/05/28/913903/913903_1200.jpg",
        "link": "https://www.tempo.co/ekonomi/pemikiran-ekonomi-sumitro-malraux-2139091"
    },
    {
        "title": "Pertemuan Bilateral Indonesia–Qatar di Kementerian Pertahanan",
        "source": "tempo",
        "summary": "Menteri Pertahanan Sjafrie Sjamsoeddin (kanan) mendampingi Wakil Perdana Menteri sekaligus Menteri Negara Urusan Pertahanan Qatar Sheikh Saoud bin Abdulrahman bin Hassan bin Ali Al Thani dalam upacara penyambutan militer di Kementerian Pertahanan, Jakarta, 2 Juni 2026. Pertemuan bilateral yang dilakukan di Aula Bhinneka Tunggal Kemenhan ini membahas beragam isu strategis, diantaranya penguatan kerja sama di bidang militer, pendidikan, dan industri pertahanan. Tempo/Ilham Balindra Menteri Pertahanan Sjafrie Sjamsoeddin menyambut Wakil Perdana Menteri sekaligus Menteri Negara Urusan Pertahanan Qatar Sheikh Saoud bin Abdulrahman bin Hassan bin Ali Al Thani di Kementerian Pertahanan, Jakarta, 2 Juni 2026. Tempo/Ilham Balindra Menteri Pertahanan Sjafrie Sjamsoeddin mendampingi Wakil Perdana Menteri sekaligus Menteri Negara Urusan Pertahanan Qatar Sheikh Saoud bin Abdulrahman bin Hassan bin Ali Al Thani dalam upacara penyambutan militer di Kementerian Pertahanan, Jakarta, 2 Juni 2026. Tempo/Ilham Balindra",
        "thumbnails": "https://statik.tempo.co/data/2026/06/02/id_1475792/1475792_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/pertemuan-bilateral-indonesia-qatar-di-kementerian-pertahanan-2139505"
    },
    {
        "title": "Puing Bangunan Pascakebakaran di Kemayoran",
        "source": "tempo",
        "summary": "Lokasi kebakaran di kawasan Kebon Kosong, Kemayoran, Jakarta, 2 Juni 2026. Sedikitnya 250 bangunan semi permanen hangus terbakar, sementara sekitar 300 kepala keluarga atau kurang lebih 500 jiwa terdampak akibat peristiwa tersebut. Tempo/Tony Hartawan Lokasi kebakaran kawasan Kebon Kosong, Kemayoran, Jakarta, 2 Juni 2026. Tempo/Tony Hartawan Lokasi kebakaran kawasan Kebon Kosong, Kemayoran, Jakarta, 2 Juni 2026. Tempo/Tony Hartawan",
        "thumbnails": "https://statik.tempo.co/data/2026/06/02/id_1475786/1475786_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/puing-bangunan-pascakebakaran-di-kemayoran-2139497"
    },
    {
        "title": "Hasto: Indonesia Jadi Negara Otoriter Populis Sejak Era Jokowi",
        "source": "tempo",
        "summary": "SEKRETARIS Jenderal PDI Perjuangan Hasto Kristiyanto mengatakan periode kedua Presiden Joko Widodo atau Jokowi mengubah Indonesia menjadi negara otoriter populis. Hal ini disampaikan Hasto saat pidato di acara peringatan Hari Lahir Pancasila di Sekolah Partai PDIP, Jakarta Selatan, 1 Juni 2026. Awalnya, Hasto menyesalkan demokrasi politik dan ekonomi Indonesia kini berubah menjadi demokrasi yang sentralistik. Ia pun menyinggung pemerintahan Jokowi menyebabkan perubahan ini. \"Terlebih pada periode kedua Presiden Jokowi, Indonesia berubah menjadi negara otoriter yang populis,\" kata Hasto.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/01/id_1475645/1475645_720.jpg",
        "link": "https://www.tempo.co/politik/hasto-indonesia-jadi-negara-otoriter-populis-sejak-era-jokowi-2139286"
    },
    {
        "title": "Melihat Terumbu Karang dan Hutan Mangrove Berau",
        "source": "tempo",
        "summary": "Wisatawan melihat terumbu karang ketika  menyelam di perairan Pulau Balikukup, Berau, Kalimantan Timur, 1 Juni 2026. Kementerian Kelautan dan Perikanan menyatakan bahwa perairan Berau merupakan jantung segitiga terumbu karang global yang menghubungkan Indonesia dengan Malaysia dan Filipina serta menjadi jalur migrasi berbagai spesies laut yang bernilai tinggi. ANTARA/Angga Palguna Seekor penyu berenang di perairan Pulau Balikukup, Berau, Kalimantan Timur, 1 Juni 2026. ANTARA/Angga Palguna Wisatawan mengunjungi hutan mangrove Sigending, di Biduk-biduk, Berau, Kalimantan Timur, Senin . Berdasarkan data Kementerian Kelautan dan Perikanan  wilayah tersebut memiliki luas hutan mangrove seluas 17.704 hektar yang menjadi habitat sekitar 397 spesies seperti burung, mamalia, ikan, dan terumbu karang, serta berpotensi mereduksi emisi sebesar 72.505 ton CO2e per tahun. ANTARA/Angga Palguna",
        "thumbnails": "https://statik.tempo.co/data/2026/06/02/id_1475773/1475773_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/melihat-terumbu-karang-dan-hutan-mangrove-berau-2139447"
    },
    {
        "title": "PSI Beberkan Alasan Jokowi Pilih Kunjungi 3 Provinsi Ini",
        "source": "tempo",
        "summary": "PARTAI Solidaritas Indonesia (PSI) menjelaskan alasan mantan presiden Joko Widodo memilih Lampung, Nusa Tenggara Timur (NTT), dan Jawa Barat sebagai tujuan rangkaian kunjungannya pada bulan ini. Jokowi dijadwalkan mengunjungi tiga provinsi itu serta menemui dewan kader PSI dan relawan di masing-masing wilayah. Ketua Dewan Pimpinan Pusat (DPP) PSI Bestari Barus mengatakan pemilihan lokasi ditentukan oleh pengurus daerah yang paling cepat mengundang Jokowi. “Berbasis kepada siapa yang mengundang paling cepat,” kata Bestari dalam keterangannya pada Senin, 1 Juni 2026. Selain itu, Bestari menilai Jokowi punya hubungan historis dengan ketiga provinsi tersebut. Menurut dia, sejumlah infrastruktur di Lampung, NTT, dan Jawa Barat dibangun ketika Jokowi masih presiden.",
        "thumbnails": "https://statik.tempo.co/data/2026/05/21/id_1474159/1474159_720.jpg",
        "link": "https://www.tempo.co/politik/psi-beberkan-alasan-jokowi-pilih-kunjungi-3-provinsi-ini-2139326"
    },
    {
        "title": "Bisakah Lemigas Memenuhi Impor Minyak dan Gas",
        "source": "tempo",
        "summary": "KEMENTERIAN Energi dan Sumber Daya Mineral membuka peluang bagi Balai Besar Pengujian Minyak dan Gas Bumi atau Lemigas melaksanakan impor minyak dan gas. Hal ini seiring dengan terbitnya Peraturan Presiden Nomor 26 Tahun 2026 tentang Pengadaan Minyak Bumi, Bahan Bakar Minyak, dan/atau Liquefied Petroleum Gas untuk Ketahanan Energi Nasional.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/01/914151/914151_1200.jpg",
        "link": "https://www.tempo.co/ekonomi/lemigas-impor-minyak-dan-gas-2139235"
    },
    {
        "title": "Konferensi Republik di UGM Bahas Remiliterisasi Prabowo",
        "source": "tempo",
        "summary": "RATUSAN akademikus, aktivis, pegiat organisasi masyarakat sipil, dan komunitas berkonsolidasi di University Club Universitas Gadjah Mada Yogyakarta, Sabtu, 30 Mei 2026. Forum tersebut berlangsung untuk merespons menguatnya militer sebagai bagian dari kemunduran demokrasi pemerintahan Presiden Prabowo Subianto-Gibran Rakabuming Raka. Remiliterisasi menjadi salah satu topik yang dibahas dalam konsolidasi bertajuk Konferensi Republik Meneguhkan Civil Society Pilar Republik. Selain menguatnya militerisme, mereka membicarakan berbagai isu krusial di antaranya ketimpangan ekonomi, krisis representasi dan demokrasi, pelemahan basis sosial, dan krisis hukum dan institusi. Konsolidasi yang berlangsung selama sehari itu melibatkan sejumlah pembicara, di antaranya Jaleswari Pramodhawardani, Yanuar Nugroho, Zainal Arifin Mochtar, Arie Sujito, Alissa Wahid, Bhima Yudistira, Candra Hamzah, Titi Anggraini, Andi Wijayanto, Leo Kleden, Baiquni, Gita Wirjawan, Komaruddin Hidayat, Komaruddin Hidayat. Dalam pertemuan itu juga terlihat pendiri Saiful Mujani Research and Consulting (SMRC) Saiful Mujani.",
        "thumbnails": "https://statik.tempo.co/data/2026/05/30/id_1475427/1475427_720.jpg",
        "link": "https://www.tempo.co/politik/konferensi-republik-di-ugm-bahas-remiliterisasi-prabowo-2139054"
    },
    {
        "title": "Prabowo Bicara Ekonomi Religius hingga Berperikemanusiaan",
        "source": "tempo",
        "summary": "PRESIDEN Prabowo Subianto menginginkan transformasi perekonomian bangsa menuju sistem yang sepenuhnya berlandaskan nilai-nilai Pancasila. Bagi Prabowo, ekonomi Pancasila ini berpegangan pada setidaknya empat prinsip: religius, perikemanusiaan, persatuan nasional, dan keadilan sosial. Dalam amanat pada upacara peringatan Hari Lahir Pancasila 2026, Kepala Negara menegaskan bahwa kekayaan alam bukan komoditas yang bebas diperjualbelikan. “Kekayaan alam adalah amanah Tuhan Yang Maha Esa yang harus dikelola secara bertanggung jawab untuk sebesar-besarnya kemakmuran rakyat,” ucap Prabowo ketika bertindak sebagai inspektur upacara di Lapangan Gedung Pancasila, Jalan Taman Pejambon, Jakarta, pada Senin, 1 Juni 2026. Ketua Umum Partai Gerindra ini mengatakan pembangunan ekonomi tidak boleh semata-mata berorientasi pada angka statistik. Menurut Prabowo, keberhasilan pembangunan bangsa semestinya diukur dari peningkatan kualitas hidup rakyat, terutama kelompok yang paling rentan.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/01/id_1475674/1475674_720.jpg",
        "link": "https://www.tempo.co/politik/prabowo-bicara-ekonomi-religius-hingga-berperikemanusiaan-2139330"
    },
    {
        "title": "Jemaah Haji Kloter Pertama Jakarta Tiba di Tanah Air",
        "source": "tempo",
        "summary": "Jemaah haji disambut keluarganya ketika tiba  di Asrama Haji, Pondok Gede, Jakarta, 2 Juni 2026. 391 Jemaah haji 2026 kloter pertama asal Jakarta tiba di Tanah Air dengan selamat setelah menjalankan ibadah Haji. Tempo/Fardi Bestari Jemaah haji  setibanya di Asrama Haji, Pondok Gede, Jakarta, 2 Juni 2026. Tempo/Fardi Bestari Jemaah haji disambut keluarganya ketika tiba di Asrama Haji, Pondok Gede, Jakarta, 2 Juni 2026.Tempo/Fardi Bestari",
        "thumbnails": "https://statik.tempo.co/data/2026/06/02/id_1475760/1475760_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/jemaah-haji-kloter-pertama-jakarta-tiba-di-tanah-air-2139422"
    },
    {
        "title": "Warga Boyolali Tewas Setelah Santap Sate Kiriman Orang Asing",
        "source": "tempo",
        "summary": "KEPOLISIAN Resor (Polres) Boyolali menyelidiki kematian seorang perempuan, warga Dukuh Jantir, Desa Sindon, Kecamatan Ngemplak, Kabupaten Boyolali, Jawa Tengah, berinisial A, 57 tahun. Pihak keluarga merasa kematian A janggal karena sebelumnya menyantap sate ayam yang dikirim orang tak dikenal melalui jasa ojek online. Tim gabungan dari Satuan Reserse Kriminal Polres Boyolali, Bidang Kedokteran dan Kesehatan, dan Disaster Victim Identification (DVI) Polda Jawa Tengah telah melakukan ekshumasi makam korban pada Sabtu, 30 Mei 2026. Kapolres Boyolali Ajun Komisaris Besar Indra Maulana Saputra menjelaskan ekshumasi dilakukan setelah pihak keluarga melaporkan kejanggalan kematian korban pada 25 Mei 2026. \"Ekshumasi kami lakukan untuk menindaklanjuti laporan dari anak korban,\" kata Indra saat memberikan keterangan kepada wartawan di Boyolali, Senin, 1 Juni 2026.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/01/id_1475716/1475716_720.jpg",
        "link": "https://www.tempo.co/hukum/warga-boyolali-tewas-setelah-santap-sate-kiriman-orang-asing-2139443"
    },
    {
        "title": "Apa yang Memicu Super El Niño Godzilla",
        "source": "tempo",
        "summary": "FENOMENA El Niño bukan hanya soal prediksi kekeringan. Pemanasan suhu permukaan Samudra Pasifik tropis yang kerap mengacaukan pola cuaca global itu menunjukkan anomali pada tahun ini.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/01/914192/914192_1200.jpg",
        "link": "https://www.tempo.co/sains/pemicu-el-nino-kenaikan-suhu-bumi-2139517"
    },
    {
        "title": "Problem Registrasi Akun Media Sosial Memakai Nomor Telepon",
        "source": "tempo",
        "summary": "KEMENTERIAN Komunikasi dan Digital berencana mewajibkan registrasi ulang akun media sosial dengan mencantumkan nomor telepon. Menteri Komunikasi Meutya Hafid menyatakan pencantuman nomor telepon bertujuan mempermudah identifikasi pemilik akun. “Sehingga mereka bertanggung jawab terhadap tulisan-tulisan yang ditayangkan,” katanya dalam rapat kerja dengan Komisi I Dewan Perwakilan Rakyat, Senin, 18 Mei 2026.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/04/03/910002/910002_1200.jpg",
        "link": "https://www.tempo.co/politik/nomor-telepon-akun-media-sosial-2139476"
    },
    {
        "title": "Penumpang Kereta Yogyakarta Melonjak saat Libur Panjang",
        "source": "tempo",
        "summary": "PT KERETA Api Indonesia (KAI) Daerah Operasi 6 Yogyakarta mencatat jumlah penumpang kereta api jarak jauh mencapai 342.195 orang selama libur panjang. Periode itu berlangsung saat Hari Raya Iduladha hingga Hari Lahir Pancasila yaitu pada 26 Mei hingga 1 Juni 2026. Manajer Humas KAI Daerah Operasi (Daop) 6 Yogyakarta Feni Novida Saragih menyatakan total angka tersebut terdiri atas 164.737 penumpang yang berangkat dan 177.458 penumpang yang tiba di wilayah Daop 6. \"Jumlah penumpang pada periode long weekend ini meningkat 45 persen dibandingkan dengan periode yang sama pada pekan sebelumnya yang tercatat sebanyak 235.697 penumpang,\" kata Feni, seperti dikutip dari Antara, Selasa, 2 Juni 2026.",
        "thumbnails": "https://statik.tempo.co/data/2026/02/24/id_1460550/1460550_720.jpg",
        "link": "https://www.tempo.co/ekonomi/penumpang-kereta-yogyakarta-melonjak-saat-libur-panjang-2139506"
    },
    {
        "title": "Mendikti Siapkan Langkah Hukum untuk Kasus Riset Palsu",
        "source": "tempo",
        "summary": "MENTERI Pendidikan Tinggi, Sains, dan Teknologi (Mendiktisaintek) Brian Yuliarto menyatakan pemerintah tengah mengkaji langkah hukum terhadap pihak-pihak yang diduga terlibat dalam pemalsuan identitas dan riset dalam ajang International Symposium on Pneumococci and Pneumococcal Diseases (ISPPD) di Kompenhagen, Denmark pada 17-21 Mei 2026. Kasus ini mencuat setelah terungkap dugaan praktik manipulasi publikasi ilmiah yang melibatkan warga negara Indonesia yang juga alumni Universitas Negeri Yogyakarta (UNY), yakni Prihantini dan Rifaldy Fajar. Diduga mereka melakukan pemalsuan saat presentasi hingga menggunakan aplikasi akal imitasi (AI). Padahal, riset itu tak pernah ada. Tindakan manipulatif ini ditengarai dilakukan demi mendapatkan sokongan dana perjalanan atau travel grant ke luar negeri.",
        "thumbnails": "https://statik.tempo.co/data/2026/04/06/id_1467555/1467555_720.jpg",
        "link": "https://www.tempo.co/politik/mendikti-siapkan-langkah-hukum-untuk-kasus-riset-palsu-2139515"
    },
    {
        "title": "Prabowo Hobi ke LN, Teddy: Investasi Masuk Rp 2.430 Triliun",
        "source": "tempo",
        "summary": "SEKRETARIS Kabinet Teddy Indra Wijaya mengklaim perjalanan luar negeri yang kerap dilakukan Presiden Prabowo Subianto tidak sia-sia. Selama satu setengah tahun Prabowo menjabat, kata Teddy, ada investasi asing hingga Rp 2.430 triliun masuk ke Indonesia. Menurut Teddy, investasi itu tidak terlepas dari hasil kunjungan-kunjungan Prabowo ke luar negeri selama menjabat. \"Total investasi yang masuk dalam 1,5 tahun ini adalah sekitar Rp 2.430 triliun, itu data dari BKPM (Badan Koordinasi Penanaman Modal),\" kata dia lewat keterangan video, Senin, 1 Juni 2026. Teddy mencotohkan ketika Presiden melawat ke Jepang dan Korea pada akhir Maret 2026, ada investasi yang masuk setelah kunjungan itu. \"Contoh konkret lagi nih, bulan lalu Presiden Prabowo ke Jepang dan Korea, langsung ada investasi sekitar Rp 575 triliun,\" ucap perwira militer berpangkat letnan kolonel ini.",
        "thumbnails": "https://statik.tempo.co/data/2026/05/27/id_1475028/1475028_720.jpg",
        "link": "https://www.tempo.co/politik/prabowo-hobi-ke-ln-teddy-investasi-masuk-rp-2-430-triliun-2139485"
    },
    {
        "title": "Konsolidasi Kampus Melawan Pelemahan Demokrasi",
        "source": "tempo",
        "summary": "GERAKAN akademikus dan masyarakat sipil melawan kemunduran demokrasi di bawah pemerintahan Presiden Prabowo Subianto dan Wakil Presiden Gibran Rakabuming Raka kian menguat di sejumlah kampus.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/01/914227/914227_1200.jpg",
        "link": "https://www.tempo.co/politik/gerakan-kampus-yogya-pelemahan-demokrasi-prabowo-gibran-2139470"
    },
    {
        "title": "Surplus Neraca Perdagangan April 2026 Terendah dalam 6 Tahun",
        "source": "tempo",
        "summary": "BADAN Pusat Statistik (BPS) mencatat neraca perdagangan pada April 2026 surplus US$ 89,1 juta. Angka ini menyusut dibanding bulan sebelumnya yang tercatat US$ 3,32 miliar dan menjadi yang terendah selama neraca mengalami surplus beruntun dalam 72 bulan terakhir. Surplus ditopang transaksi perdagangan sektor di luar di kategori minyak bumi dan gas alam (nonmigas) senilai US$ 3,53 miliar, sementara sektor migas mencatatkan defisit US$ 3,44 miliar.“Jadi surplus April 2026 ini merupakan surplus terkecil sejak Mei 2020 atau selama surplus 72 bulan berturut-turut,” ucap Deputi Bidang Statistik Distribusi dan Jasa BPS Pudji Ismartini dalam konferensi pers di Jakarta, Kamis, 2 Juni 2026.Pudji menjelaskan bahwa komunitas penyumbang surplus dari sektor nonmigas utamanya adalah lemak dan minyak hewani atau nabati dengan kode komoditas HS15. Kemudian bahan bakar mineral HS27 serta besi dan baja HS72. Pada saat yang sama, neraca perdagangan komunitas migas tercatat defisit US$ 3,44 miliar. Komunitas penyumbang defisit terbesar sektor ini adalah minyak mentah, hasil minyak dan gas alam.Data BPS mencatat nilai ekspor Indonesia pada April 2026 mencapai US$ 25,30 miliar atau naik 21,98 persen dibanding ekspor April 2025. Sedangkan nilai impor Indonesia April 2026 mencapai US$ 25,21 miliar, naik 22,49 persen dibandingkan April 2025. Bila diakumulasikan, sejak awal tahun atau periode Januari sampai April 2026, neraca perdagangan Indonesia mengalami surplus US$ 5,64 miliar. Dipicu oleh surplus pada sektor nonmigas US$ 14,16 miliar dan sektor migas mengalami defisit US$ 8,52 miliar.  Nilai ekspor Indonesia periode Januari–April 2026 naik 5,48 persen menjadi menjadi US$ 92.152,0 juta dibanding periode yang sama tahun 2025 yang tercatat US$ 87.363,6 juta.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/02/id_1475784/1475784_720.jpg",
        "link": "https://www.tempo.co/ekonomi/surplus-neraca-perdagangan-april-2026-terendah-dalam-6-tahun-2139516"
    },
    {
        "title": "Harga Emas Antam Anjlok Rp 25 Ribu per Gram",
        "source": "tempo",
        "summary": "HARGA emas dari PT Aneka Tambang Tbk atau emas Antam kembali merosot pada Selasa, 2 Juni 2026. Harga emas Antam hari ini anjlok Rp 25.000 per gram dibanding hari sebelumnya. Berdasarkan data di laman Logam Mulia, harga emas hari ini tercatat Rp 2.774.000 per gram, turun dibandingkan dengan Senin kemarin, 1 Juni 2026, yang tercatat Rp 2.799.000 per gram. Harga emas bertahan di level tersebut setelah mengalami kenaikan berturut-turut pada 29 dan 30 Mei 2026. Harga emas mencapai level tertinggi sepanjang masa yakni Rp 3.168.000 pada 29 Januari 2025. Sedangkan sepanjang Mei, harga tertinggi tercatat Rp 2.859.000 per gram, yakni pada 12 Mei 2026. Adapun harga jual kembali atau buyback emas batangan Antam hari ini juga ambruk Rp 25 ribu menjadi Rp 2.584.000 per gram.",
        "thumbnails": "https://statik.tempo.co/data/2026/03/24/id_1465591/1465591_720.jpg",
        "link": "https://www.tempo.co/ekonomi/harga-emas-antam-anjlok-rp-25-ribu-per-gram-2139456"
    },
    {
        "title": "Pentingnya JKN untuk Perjalanan Ibadah Haji yang Tenang",
        "source": "tempo",
        "summary": "INFO NASIONAL – Warga Desa Saringembat, Kecamatan Singgahan, Kabupaten Tuban, Karmijah, 65 tahun, menyambut panggilan ke Tanah Suci dengan penuh syukur. Karmijah menjadi salah satu Calon Jemaah Haji (CJH) yang tengah mempersiapkan keberangkatan ibadah haji dengan sebaik-baiknya. Menurut Karmijah, persiapan menuju Tanah Suci tidak hanya menyangkut perlengkapan ibadah dan kesiapan batin. Kesehatan juga menjadi hal penting yang harus dipastikan sejak awal, termasuk memastikan kepesertaan Program Jaminan Kesehatan Nasional (JKN) tetap aktif. \"Sehingga saat membutuhkan layanan kesehatan, sudah tidak perlu bingung lagi. Kita juga tidak bisa memprediksi, kapan datangnya sakit. Bagi saya, kedatangan dan kepulangan wajib diupayakan sehat,” kata dia.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/02/id_1475778/1475778_720.jpg",
        "link": "https://www.tempo.co/info-tempo/pentingnya-jkn-untuk-perjalanan-ibadah-haji-yang-tenang-2139482"
    },
    {
        "title": "Gunung Lewotobi Erupsi Dua Kali Pagi Ini",
        "source": "tempo",
        "summary": "DALAM selang waktu hampir 2,5 jam Gunung Lewotobi Laki-laki erupsi dua kali pada Selasa pagi, 2 Juni 2026. Gunung api yang belokasi di Flores Timur, Nusa Tenggara Timur (NTT), itu meletus pada pukul 05.20 WITA saat letusan pertama. Dalam letusan itu, Gunung Lewotobi Laki-laki memuntahkan abu vulkanikj setinggi 600 meter di atas puncak. Vibrasi yang dihasilkan beramplitudo maksimum 4.4 milimeter dengan durasi mencapai 157 detik. \"Kolom abu teramati berwarna kelabu dengan intensitas tebal ke arah utara dan timur laut,\" kata salah satu petugas Pos Pengamatan Gunung Lewotobi Laki-laki, Herman Yosef, dalam laporannya untuk Badan Geologi.",
        "thumbnails": "https://statik.tempo.co/data/2025/10/19/id_1435752/1435752_720.jpg",
        "link": "https://www.tempo.co/lingkungan/gunung-lewotobi-erupsi-dua-kali-pagi-ini-2139455"
    },
    {
        "title": "Awas, Skema Ponzi Penyelenggara Pernikahan",
        "source": "tempo",
        "summary": "POLISI Resor Metro Jakarta Timur menetapkan RM dan ER sebagai tersangka penipuan puluhan calon pengantin. Pasangan suami-istri pemilik wedding organizer Marwah Catering Service itu membawa kabur duit puluhan klien mereka.",
        "thumbnails": "https://images-tm.tempo.co/all/2025/12/10/901669/901669_1200.jpg",
        "link": "https://www.tempo.co/hukum/penipuan-wedding-organizer-skema-ponzi-2139464"
    },
    {
        "title": "Potensi Bisnis Reaktivasi Bandara Husein Sastranegara",
        "source": "tempo",
        "summary": "PENGUSAHA hotel dan restoran melirik potensi dari perluasan kembali skala penerbangan komersial di Bandar Udara Husein Sastranegara, Kota Bandung, Jawa Barat. Ketua Umum Perhimpunan Hotel dan Restoran Indonesia Hariyadi Sukamdani menilai realisasi rencana itu akan menambah jumlah wisatawan mancanegara.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/01/914203/914203_1200.jpg",
        "link": "https://www.tempo.co/ekonomi/reaktivasi-bandara-husein-sastranegara-2139414"
    },
    {
        "title": "Kinerja Manufaktur RI Kembali Masuk Zona Ekspansi",
        "source": "tempo",
        "summary": "LEMBAGA pemeringkat dunia, Standard & Poor's Global Ratings (S&P), melaporkan Purchasing Managers’ Index atau PMI manufaktur Indonesia pada Mei 2026 naik secara bulanan menjadi 50,0 alias kembali ke zona ekspansi. PMI Manufaktur pada April tercatat 49,1. Pada bulan kelima ini, panelis mencatat perusahaan mengalami kenaikan pesanan, tetapi di saat yang bersamaan kekurangan bahan baku produksi. “Perekonomian manufaktur Indonesia masih mengalami tekanan selama Mei, karena produksi terhambat oleh kenaikan harga bahan baku dan keterbatasan ketersediaan input,” kata ekonom S&P Global Market Intelligence, Usamah Bhatti, dalam laporan tertulis, Selasa, 2 Juni 2026. Penerimaan pesanan baru tercatat meningkat selama dua bulan berturut-turut, dengan tingkat pertumbuhan tertinggi sejak Februari.",
        "thumbnails": "https://statik.tempo.co/data/2025/06/02/id_1402774/1402774_720.jpg",
        "link": "https://www.tempo.co/ekonomi/kinerja-manufaktur-ri-kembali-masuk-zona-ekspansi-2139450"
    },
    {
        "title": "Mungkinkah Partai Punya 30 Persen Calon Legislator Perempuan",
        "source": "tempo",
        "summary": "DELAPAN fraksi partai politik di Dewan Perwakilan Rakyat sepakat mematuhi putusan Mahkamah Konstitusi tentang keterwakilan perempuan minimal 30 persen sebagai calon legislator dalam pemilihan umum di setiap daerah pemilihan (dapil).",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/01/914235/914235_1200.jpg",
        "link": "https://www.tempo.co/politik/kuota-caleg-perempuan-partai-politik-2139448"
    }
];

const dataBerita3 = [
    {
        "title": "Kebijakan Baru BGN Tak Selesaikan Masalah Tata Kelola MBG",
        "source": "tempo",
        "summary": "AHLI gizi dan pegiat kesehatan masyarakat, Tan Shot Yen, menilai sejumlah kebijakan baru yang akan diterapkan Badan Gizi Nasional belum menjawab persoalan mendasar dalam pelaksanaan program makan bergizi gratis atau MBG. Menurut dia, berbagai perubahan yang akan dilakukan justru belum menyentuh akar masalah berupa lemahnya perencanaan, tata kelola, dan pengawasan program. \"Saya amat menyayangkan suatu program unggulan nasional disusun, dikelola, dan dievaluasi dengan amat buruk. Jelas kebijakan baru itu tidak menyelesaikan masalah,\" kata Tan pada Senin, 8 Juni 2026. Tan menilai pemerintah perlu melakukan perombakan menyeluruh terhadap desain program MBG. Langkah pertama yang harus dilakukan, kata dia, adalah merumuskan kembali tujuan program secara jelas, termasuk target yang ingin dicapai, indikator keberhasilan, serta tenggat waktu pelaksanaannya.",
        "thumbnails": "https://statik.tempo.co/data/2025/09/22/id_1429802/1429802_720.jpg",
        "link": "https://www.tempo.co/politik/kebijakan-baru-bgn-tak-selesaikan-masalah-tata-kelola-mbg-2253533"
    },
    {
        "title": "Pemerintah-DPR Sepakat Polisi Aktif Bisa Isi Jabatan Sipil",
        "source": "tempo",
        "summary": "PEMERINTAH dan Panitia Kerja (Panja) Revisi Undang-Undang (UU) Kepolisian RI di Komisi III DPR menyepakati bahwa anggota Polri aktif dapat menduduki jabatan di institusi sipil. Namun, penempatan itu hanya diperbolehkan jika berkaitan dengan fungsi kepolisian. Meski demikian, dalam revisi UU Polri tidak secara rinci menyebutkan kementerian atau lembaga mana saja yang dapat diisi oleh polisi aktif. Kesepakatan tersebut dicapai dalam rapat Panja RUU Polri bersama Kementerian Hukum untuk membahas Daftar Inventaris Masalah (DIM) revisi UU Polri usulan pemerintah. Rapat berlangsung di Gedung DPR/MPR, Jakarta, Senin, 8 Juni 2026. Wakil Menteri Hukum (Wamenkum) Edward Omar Sharif Hiariej menjelaskan, pemerintah mengusulkan penyisipan Pasal 28A di antara Pasal 28 dan Pasal 29. Pasal tersebut mengatur penempatan anggota Polri di luar institusi kepolisian.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/04/id_1476227/1476227_720.jpg",
        "link": "https://www.tempo.co/politik/pemerintah-dpr-sepakat-polisi-aktif-bisa-isi-jabatan-sipil-2253678"
    },
    {
        "title": "Situs Web Tempo Kembali Diserang Puluhan Juta DDoS",
        "source": "tempo",
        "summary": "SERVER portal berita Tempo kembali mendapatkan serangan siber berupa distributed denial of service (DDoS) sejak Jumat, 5 Juni 2026. Serangan tersebut membanjiri server situs web Tempo dengan lalu lintas internet palsu sehingga mengganggu akses publik ke laman utama situs web tempo.co. Chief Technology Officer Tempo Digital Heru Tjatur Tjahja mengatakan serangan yang diterima Tempo dalam beberapa hari terakhir tergolong masif. Hingga Senin, 8 Juni 2026, tim teknologi Tempo mencatat total 24,9 juta request yang mengarah ke server mereka. “Total serangan yang membanjir website kami per 8 Juni sebesar 24,9 juta request,” kata Tjatur pada Senin, 8 Juni 2026.",
        "thumbnails": "https://statik.tempo.co/data/2024/11/17/id_1354267/1354267_720.jpg",
        "link": "https://www.tempo.co/politik/situs-web-tempo-kembali-diserang-puluhan-juta-ddos-2253765"
    },
    {
        "title": "Akhirnya, Pembukaan Dapur MBG Disetop dan Penerima Diubah",
        "source": "tempo",
        "summary": "ASOSIASI Pengusaha dan Pengelola Dapur Makan Bergizi Gratis gusar atas moratorium pembukaan satuan pelayanan pemenuhan gizi (SPPG) atau dapur Makan Bergizi Gratis (MBG) yang baru. Organisasi pengusaha dapur itu berharap moratorium tidak berlangsung lama dan Badan Gizi Nasional (BGN) segera memastikan jadwal pembukaan dapur baru.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/07/914586/914586_1200.jpg",
        "link": "https://www.tempo.co/politik/moratorium-sppg-penerima-mbg-2253485"
    },
    {
        "title": "Mengapa BGN Terlambat Transfer Uang Masak ke Dapur MBG",
        "source": "tempo",
        "summary": "PARA pengelola satuan pelayanan pemenuhan gizi (SPPG) kalang kabut membaca informasi ihwal rencana Badan Gizi Nasional (BGN) menghentikan pencairan anggaran operasional ke dapur makan bergizi gratis (MBG) hingga satu bulan. Informasi itu beredar secara berantai lewat pesan WhatsApp pada Rabu, 3 Juni 2026, atau bersamaan dengan penangkapan tiga mantan petinggi BGN oleh Kejaksaan Agung.",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/07/914583/914583_1200.jpg",
        "link": "https://www.tempo.co/politik/bgn-transfer-dana-dapur-mbg-2253483"
    },
    {
        "title": "Munculnya Nama Raffi Ahmad di Sidang Suap Bea-Cukai",
        "source": "tempo",
        "summary": "NAMA Raffi Ahmad muncul dalam persidangan perkara dugaan suap di lingkungan Direktorat Jenderal Bea dan Cukai Kementerian Keuangan. Raffi dikatakan sempat menitipkan dua buah barang elektronik dari Amerika ke Indonesia melalui perusahaan Blueray Cargo. Dalam sidang yang digelar di Pengadilan Tindak Pidana Korupsi Jakarta pada Jumat, 5 Juni 2026, jaksa memeriksa pengusaha importir bernama Sri Pangestuti alias Tuti sebagai saksi. Jaksa ingin memastikan nama Raffi Ahmad yang disebut dalam berita acara pemeriksaan (BAP) Tuti. “Ini ada di komunikasi chat WA ibu, ibu pernah diminta bantuan untuk mengirimkan laptop sama iPhone dari Amerika Serikat?\" demikian pertanyaan jaksa dalam ruang sidang.",
        "thumbnails": "https://statik.tempo.co/data/2026/05/06/id_1472172/1472172_720.jpg",
        "link": "https://www.tempo.co/hukum/munculnya-nama-raffi-ahmad-di-sidang-suap-bea-cukai-2253839"
    },
    {
        "title": "Prabowo Minta Maaf Penerimaan Dubes Negara Sahabat Terlambat",
        "source": "tempo",
        "summary": "PRESIDEN Prabowo Subianto menerima delapan duta besar baru untuk prosesi penyerahan surat kredensial dari negara asal mereka. Dalam acara yang berlangsung tertutup, Prabowo disebut sempat meminta maaf kepada para perwakilan negara sahabat karena terlambat menerima mereka secara resmi. Wakil Menteri Luar Negeri Anis Matta, yang mengikuti acara penyerahan kredensial, menceritakan momen tersebut. \"Tadi Presiden sudah menyampaikan, pertama beliau meminta maaf atas keterlambatan ini kepada seluruh dubes,\" kata Anis setelah prosesi di Istana Kepresidenan Jakarta, Senin, 8 Juni 2026. Menurut Anis, keterlambatan ini terjadi karena faktor jadwal Presiden Prabowo yang sangat padat. Ia menyebut tidak ada niat sama sekali dari pemerintah untuk menunda-nunda penyerahan kredensial itu.",
        "thumbnails": "https://statik.tempo.co/data/2025/12/19/id_1448716/1448716_720.jpg",
        "link": "https://www.tempo.co/politik/prabowo-minta-maaf-penerimaan-dubes-negara-sahabat-terlambat-2253671"
    },
    {
        "title": "Kunjungan Sutradara dan Pemeran Film Tanah Runtuh ke Kantor Tempo",
        "source": "tempo",
        "summary": "(Ki-kai) Sutradara film Rudi Soedjarwo, Sigi Wimala, dan Vino G. Bastian, di kantor Tempo, Jakarta, 8 Juni 2026. Rudi Soedjarwo menyutradarai film \"Tanah Runtuh\" dan dibintangi oleh Sigi Wimala dan Vino G. Bastian yang akan tayang akhir Juni 2026 di bioskop. Tempo/Ratih Purnama Aktris Sigi Wimala ketika media visit film \"Tanah Runtuh\" di kantor Tempo, Jakarta, 8 Juni 2026. Tempo/Ratih Purnama Aktor Vino G. Bastian ketika media visit film \"Tanah Runtuh\" di kantor Tempo, Jakarta, 8 Juni 2026. Tempo/Ratih Purnama",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1477011/1477011_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/kunjungan-sutradara-dan-pemeran-film-tanah-runtuh-ke-kantor-tempo-2253957"
    },
    {
        "title": "Menengok Pengolahan Limbah Ikan Hiu yang Diekspor ke Luar Negeri",
        "source": "tempo",
        "summary": "Pekerja menunjukan kepala ikan hiu di sentra Pengolahan Hasil Perikanan Tradisional (PHPT), Penjaringan, Jakarta, 9 Juni 2026. Limbah ikan berupa kulit dan tulang ikan hiu diolah untuk kebutuhan ekspor ke Cina, Jepang dan Korea sebagai bahan baku makanan dan kosmetik dengan harga jual kulit ikan hiu Rp 60.000 per kilogram sedangkan tulang ikan hiu dijual seharga Rp 45.000 per kilogram. ANTARA/Ahmad Naufal Oktavian Pekerja mengolah ikan hiu di sentra Pengolahan Hasil Perikanan Tradisional (PHPT), Penjaringan, Jakarta, 9 Juni 2026. ANTARA/Ahmad Naufal Oktavian Pekerja memilah tulang ikan hiu di sentra Pengolahan Hasil Perikanan Tradisional (PHPT), Penjaringan, Jakarta, 9 Juni 2026. ANTARA/Ahmad Naufal Oktavian",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1477000/1477000_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/menengok-pengolahan-limbah-ikan-hiu-yang-diekspor-ke-luar-negeri-2253947"
    },
    {
        "title": "JPU Tolak Seluruh Pledoi Nadiem Makarim",
        "source": "tempo",
        "summary": "Terdakwa kasus korupsi Chromebook sekaligus eks Menteri Pendidikan Budaya Riset dan Teknologi, Nadiem Makarim menjalani sidang beragendakan pembacaan replik di Pengadilan Tipikor, Jakarta, 9 Juni 2026. Jaksa penuntut umum menolak seluruh dalil nota pembelaan penasihat hukum dan tetap pada surat tuntutan untuk seluruhnya. Tempo/Muhammad Zaki Fauzi Terdakwa kasus korupsi Chromebook sekaligus eks Menteri Pendidikan Budaya Riset dan Teknologi, Nadiem Makarim ketika akan menjalani sidang beragendakan pembacaan replik di Pengadilan Tipikor, Jakarta, 9 Juni 2026. Tempo/Muhammad Zaki Fauzi Terdakwa kasus korupsi Chromebook sekaligus eks Menteri Pendidikan Budaya Riset dan Teknologi, Nadiem Makarim ketika akan menjalani sidang beragendakan pembacaan replik di Pengadilan Tipikor, Jakarta, 9 Juni 2026. Tempo/Muhammad Zaki Fauzi",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476994/1476994_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/jpu-tolak-seluruh-pledoi-nadiem-makarim-2253949"
    },
    {
        "title": "Film Indonesia Solata Raih Penghargaan di Bulgaria",
        "source": "tempo",
        "summary": "Film panjang Solata meraih penghargaan dalam Golden FEMI Film Festival di Sofia, Bulgaria, pada Sabtu, 6 Juni 2026. Film yang mengangkat tema pendidikan, persahabatan, dan budaya Toraja ini menyabet Special Award for Cinema from the Emerald of the Equator: Cultural Contribution and Humanism. Penghargaan tersebut diterima langsung oleh sutradara sekaligus produser Ichwan Persada di Sofia. \"Ini adalah penghargaan yang sangat berarti buat kami dan sangat membangkitkan semangat,\" ungkap Ichwan kepada Tempo pada Selasa, 9 Juni 2026. Namun, ia menyayangkan belum adanya dukungan materiil dari pemerintah daerah hingga saat ini. \"Kami sangat senang karena film Solata ternyata bisa diapresiasi lebih baik di luar negeri dibanding di negerinya sendiri,\" ujarnya.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476993/1476993_720.jpg",
        "link": "https://www.tempo.co/teroka/film-indonesia-solata-raih-penghargaan-di-bulgaria-2253928"
    },
    {
        "title": "IHSG dan Rupiah Menguat Pada Perdagangan Selasa Sore",
        "source": "tempo",
        "summary": "INDEKS Harga Saham Gabungan (IHSG) ditutup menguat 7,57 persen ke level 5.746 pada perdagangan Selasa, 9 Juni 2026. Penguatan ini menandai tren yang berbalik arah usai IHSG tertekan selama satu pekan terakhir. Sebanyak 678 saham menguat, 89 melemah, dan 48 stagnan. Volume transaksi tercatat sebesar 45 miliar lembar saham dengan nilai sebesar Rp 28 triliun. Sedangkan frekuensi transaksi mencapai 2,71 juta kali. Adapun aksi jual bersih investor asing pada hari ini tercatat sebesar Rp 447 miliar. Sementara itu, nilai tukar rupiah ditutup menguat 129 poin ke posisi Rp 18.058 per dolar Amerika Serikat. Direktur PT Traze Andalan Futures Ibrahim Assuaibi mengatakan perkembangan tersebut salah satunya dipengaruhi oleh sentimen pasar yang membaik setelah Iran dan Israel menyatakan mereka telah menghentikan serangan satu sama lain.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/05/id_1476409/1476409_720.jpg",
        "link": "https://www.tempo.co/ekonomi/ihsg-dan-rupiah-menguat-pada-perdagangan-selasa-sore-2253903"
    },
    {
        "title": "Seberapa Panjang Rel Kereta Api Indonesia?",
        "source": "tempo",
        "summary": "PT Kereta Api Indonesia (KAI) berencana membangun rel Trans Sumatera yang menghubungkan seluruh provinsi di Pulau Sumatera, dari Aceh di bagian utara hingga Lampung di ujung selatan. Rencana itu disampaikan Direktur Utama KAI Bobby Rasyidin dalam rapat dengar pendapat di Komisi VI Dewan Perwakilan Rakyat. “Prioritas yang pertama saat ini menghubungkan Banda Aceh dengan Besitang. Total panjang relnya 478 kilometer,” kata Bobby pada Rabu, 3 Juni 2026. Rencana itu sudah pernah digagas pada 2011 oleh Kementerian Perhubungan melalui Rencana Induk Perkeretaapian Nasional hingga 2030. Kemudian diperbarui pada 2020 lewat Peraturan Menteri Perhubungan Nomor KM 296 Tahun 2020 tentang Rencana Induk Perkeretaapian Nasional.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476893/1476893_720.jpg",
        "link": "https://www.tempo.co/data/data/seberapa-panjang-rel-kereta-api-indonesia--2253918"
    },
    {
        "title": "Luhut dan Chatib Basri Temui Prabowo di Istana",
        "source": "tempo",
        "summary": "Ketua Dewan Ekonomi Nasional, Luhut Binsar Pandjaitan bersama anggota DEN Chatib Basri (kiri) dan Septian Hario Seto (kanan), memberikan keterangan kepada awak media seusai mengikuti rapat terbatas dengan Presiden Prabowo Subianto di Istana Merdeka, Jakarta, 9 Juni 2026. Ratas ini membahas mengenai rekomendasi kebijakan strategis pertumbuhan dan menjaga stabilitas pasar ekonomi domestik dan penyampaian hasil survei Program Makan Bergizi Gratis. Tempo/Imam Sukamto Ketua Dewan Ekonomi Nasional, Luhut Binsar Pandjaitan, akan mengikuti rapat terbatas dengan Presiden Prabowo Subianto di Istana Merdeka, Jakarta, 9 Juni 2026. Tempo/Imam Sukamto Anggota Dewan Ekonomi Nasional, Chatib Basri, akan mengikuti rapat terbatas dengan Presiden Prabowo Subianto di Istana Merdeka, Jakarta, 9 Juni 2026. Tempo/Imam Sukamto",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1477009/1477009_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/luhut-dan-chatib-basri-temui-prabowo-di-istana-2253956"
    },
    {
        "title": "KPK Tahan Bupati Muara Enim Edison",
        "source": "tempo",
        "summary": "Bupati Muara Enim Edison berjalan dengan mengenakan rompi tahanan setelah menjalani pemeriksaan di Gedung Merah Putih KPK, Jakarta, 9 Juni 2026. KPK menahan Edison setelah ditetapkan sebagai tersangka kasus dugaan korupsi pengadaan barang dan jasa di lingkungan Dinas Pendidikan dan Kebudayaan Kabupaten Muara Enim. Tempo/Ilham Balindra Bupati Muara Enim Edison (kiri) berjalan dengan mengenakan rompi tahanan setelah menjalani pemeriksaan di Gedung Merah Putih KPK, Jakarta, 9 Juni 2026. Tempo/Ilham Balindra Bupati Muara Enim Edison (tengah) berjalan dengan mengenakan rompi tahanan setelah menjalani pemeriksaan di Gedung Merah Putih KPK, Jakarta, 9 Juni 2026. Tempo/Ilham Balindra",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476987/1476987_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/kpk-tahan-bupati-muara-enim-edison-2253946"
    },
    {
        "title": "Produksi Tahu di Tengah Kenaikan Harga Kedelai",
        "source": "tempo",
        "summary": "Proses pembuatan tahu di Pejaten Timur, Jakarta, 9 Mei 2026. Menteri Perdagangan Budi Santoso memastikan pemerintah terus memantau kondisi para pedagang dan pengrajin tahu serta tempe yang terdampak kenaikan harga kedelai. Langkah utama yang ditempuh saat ini dengan menjaga ketersediaan pasokan kedelai impor agar kebutuhan dalam negeri tetap terpenuhi. Tempo/Tony Hartawan Pengrajin menyelesaikan proses pembuatan tahu di Pejaten Timur, Jakarta, 9 Mei 2026. Tempo/Tony Hartawan Pengrajin menyelesaikan proses pembuatan tahu di Pejaten Timur, Jakarta, 9 Mei 2026. Tempo/Tony Hartawan",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476968/1476968_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/produksi-tahu-di-tengah-kenaikan-harga-kedelai-2253911"
    },
    {
        "title": "Paguyuban Warga Gunung Tolak Proyek Geotermal di Jawa Barat",
        "source": "tempo",
        "summary": "PAGUYUBAN Warga Jaga Giri Warga di Kaki Gunung Jawa Bagian Barat Bandung sepakat menolak industri panas bumi atau geotermal di wilayahnya. Paguyuban itu terdiri dari warga sekitar Gunung Tampomas Kabupaten Sumedang, warga Gunung Gede Pangrango Kabupaten Cianjur, warga Gunung Ciremai Kabupaten Kuningan, dan warga Gunung Cisolok-Sukarame Kabupaten Sukabumi. Perwakilan warga dari Gunung Tampomas, Pepen, mengatakan, rencana proyek geotermal akan merenggut kehidupan warga yang selama ini ditopang tanah dan air. Dari lahan pertanian, warga bisa menghasilkan beras dan buah-buahan seperti durian, cengkeh, cokelat, dan alpukat yang dijual ke Cirebon, Bandung, dan Jakarta. Hasil budidaya jamur bisa menghasilkan 25 ton per musim panen. Gunung Tampomas juga disebutkannya merupakan penyangga air bagi 10 wilayah kecamatan dan lahan pertanian yang ada di dalamnya. “Semuanya terancam hilang dengan rencana proyek geothermal,” kata Pepen dalam keterangannya di Bandung, Senin 8 Juni 2026.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1477019/1477019_720.jpg",
        "link": "https://www.tempo.co/lingkungan/paguyuban-warga-gunung-tolak-proyek-geotermal-di-jawa-barat-2253951"
    },
    {
        "title": "Masalah Kesehatan yang Berawal dari Gusi",
        "source": "tempo",
        "summary": "GUSI sering kali menjadi bagian yang terlupakan dalam perawatan kesehatan mulut. Padahal, berbagai masalah gigi yang muncul di kemudian hari dapat berawal dari kondisi gusi yang tidak sehat dan tidak terdeteksi sejak dini. Dokter Gigi Spesialis Ines Augustina Sumbayak mengatakan, penyakit gusi umumnya berkembang secara perlahan sehingga banyak orang tidak menyadari gejala awalnya. Salah satu tanda yang paling sering muncul adalah gusi berdarah saat menyikat gigi. “Gejala paling awal biasanya berupa gusi berdarah saat menyikat gigi. Banyak orang menganggap kondisi itu normal, padahal sebenarnya tidak,” ujar Ines dalam acara konferensi pers Pepsodent Gum ExpertLab di Central Park Mall, Jakarta, Jumat 5 Juni 2026.",
        "thumbnails": "https://statik.tempo.co/data/2016/12/11/id_563467/563467_650.jpg",
        "link": "https://www.tempo.co/gaya-hidup/masalah-kesehatan-yang-berawal-dari-gusi-2253944"
    },
    {
        "title": "Serba-serbi Pelantikan Nanik Deyang dan Said Iqbal",
        "source": "tempo",
        "summary": "PRESIDEN Prabowo Subianto melantik sejumlah pejabat baru untuk membantu jalannya pemerintahan pada Senin, 8 Juni 2026 di Istana Negara, Jakarta. Salah satunya Prabowo melantik pimpinan Badan Gizi Nasional yang baru. Berikut rangkuman agenda pelantikan yang dilakukan Prabowo. 1. Nanik Deyang Dilantik Jadi Kepala BGN Nanik Sudaryati Deyang resmi dikukuhkan sebagai Kepala BGN menggantikan Dadan Hindayana. Anggota tim pemenangan Prabowo di Pilpres 2019 ini sebelumnya menjabat sebagai wakil kepala BGN yang bertanggung jawab pada proyek makan bergizi gratis itu.",
        "thumbnails": "https://statik.tempo.co/data/2026/06/08/id_1476849/1476849_720.jpg",
        "link": "https://www.tempo.co/politik/serba-serbi-pelantikan-nanik-deyang-dan-said-iqbal-2253748"
    },
    {
        "title": "Kemayoran Hangus",
        "source": "tempo",
        "summary": "Sisa kebakaran di Kebon Kosong, Kemayoran, Jakarta Pusat, pada 2 Juni 2026. Sedikitnya 250 bangunan semipermanen hangus terbakar. Sekitar 300 keluarga atau kurang-lebih 500 jiwa terkena dampak kebakaran tersebut. Tempo/Tony Hartawan",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/09/914694/914694_1200.jpg",
        "link": "https://www.tempo.co/foto/foto/kemayoran-hangus-2253855"
    },
    {
        "title": "Timnas Putri Indonesia Ditahan Imbang Kamboja 1-1",
        "source": "tempo",
        "summary": "Pemain timnas putri Indonesia Estella Loupattij (kiri) dibayangi pemain Kamboja  Hear Sreilas pada laga Intenational Women's Match Day di Stadion Arcamanik, Bandung, 9 Juni 2026.  Timnas putri Indonesia ditahan imbang Kamboja dengan skor 1-1. Tempo/Prima Mulia Pemain timnas putri Indonesia Marsela Awi (kiri) dibayangi pemain Kamboja  Vibol Serysitha pada laga Intenational Women's Match Day di Stadion Arcamanik, Bandung, 9 Juni 2026. Tempo/Prima Mulia Pemain timnas putri Indonesia Aulia Al Mabruroh (depan) Eberebut bola dengan pemain Kamboja  Vibol Serysitha pada laga Intenational Women's Match Day di Stadion Arcamanik, Bandung, 9 Juni 2026. Tempo/Prima Mulia",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476974/1476974_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/timnas-putri-indonesia-ditahan-imbang-kamboja-1-1-2253919"
    },
    {
        "title": "Sipil Militer",
        "source": "tempo",
        "summary": "Pasukan Komponen Cadangan Gelombang I Aparatur Sipil Negara mengikuti pelantikan dan pengambilan sumpah penetapan latihan dasar militer di Arta Hanggar Indonesia Wing Udara 1 Pangkalan Udara Halim Perdanakusuma, Jakarta Timur, pada 3 Juni 2026. Sebanyak 1.764 aparatur sipil negara mengikuti latihan militer. Tempo/Imam Sukamto",
        "thumbnails": "https://images-tm.tempo.co/all/2026/06/09/914695/914695_1200.jpg",
        "link": "https://www.tempo.co/foto/foto/sipil-militer-2253856"
    },
    {
        "title": "Tarif Pajak UMKM Tetap 0,5 Persen",
        "source": "tempo",
        "summary": "Proses reparasi gitar di bengkel kerja servis gitar Manto di Poltangan, Jakarta, 9 Mei 2026. Menteri UMKM Maman Abdurrahman menegaskan tarif Pajak Penghasilan Final bagi UMKM tetap sebesar 0,5 persen dan tidak mengalami kenaikan. Ketentuan tersebut diatur dalam Peraturan Pemerintah Nomor 20 Tahun 2026 yang diundangkan pada 22 April 2026 sebagai penyempurnaan atas Peraturan Pemerintah Nomor 55 Tahun 2022. Tempo/Tony Hartawan Proses reparasi gitar di bengkel kerja servis gitar Manto di Poltangan, Jakarta, 9 Mei 2026. Tempo/Tony Hartawan Proses reparasi gitar di bengkel kerja servis gitar Manto di Poltangan, Jakarta, 9 Mei 2026. Tempo/Tony Hartawan",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476945/1476945_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/tarif-pajak-umkm-tetap-0-5-persen-2253887"
    },
    {
        "title": "Normalisasi Kali Kanal Banjir Barat",
        "source": "tempo",
        "summary": "Pengerukan Kali Kanal Banjir Barat, Tanah Abang, Jakarta, 9 Juni 2026. Pemerintah Jakarta mempercepat normalisasi sungai selama periode penurunan curah hujan akibat fenomena El Nino yang diperkirakan berlangsung dari pertengahan April hingga September 2026. Tempo/Ilham Balindra Pengerukan Kali Kanal Banjir Barat, Tanah Abang, Jakarta, 9 Juni 2026. Tempo/Ilham Balindra Pengerukan Kali Kanal Banjir Barat, Tanah Abang, Jakarta, 9 Juni 2026. Tempo/Ilham Balindra",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476923/1476923_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/normalisasi-kali-kanal-banjir-barat-2253848"
    },
    {
        "title": "Purbaya Sampaikan Strategi Fiskal pada Rapat Paripurna DPR",
        "source": "tempo",
        "summary": "Wakil Ketua DPR Sari Yuliati (kanan) menerima berkas tangapan pemerintah dari Menteri Keuangan Purbaya Yudhi Sadewa (kiri) ketika Rapat Paripurna Ke-21 DPR RI Masa Persidangan V Tahun Sidang 2025-2026 di Kompleks Parlemen, Senayan, Jakarta, 9 Juni 2026. Rapat tersebut membahas tanggapan pemerintah terhadap pandangan fraksi-fraksi atas Kerangka Ekonomi Makro (KEM) dan Pokok-Pokok Kebijakan Fiskal (PPKF) RAPBN tahun anggaran 2027. Tempo/Amston Probel Menteri Keuangan Purbaya Yudhi Sadewa menyampaikan tangapan pemerintah ketika memimpin  Rapat Paripurna Ke-21 DPR RI Masa Persidangan V Tahun Sidang 2025-2026 di Kompleks Parlemen, Senayan, Jakarta, 9 Juni 2026. Tempo/Amston Probel Anggota DPR  ketika Rapat Paripurna Ke-21 DPR RI Masa Persidangan V Tahun Sidang 2025-2026 di Kompleks Parlemen, Senayan, Jakarta, 9 Juni 2026. Tempo/Amston Probel",
        "thumbnails": "https://statik.tempo.co/data/2026/06/09/id_1476957/1476957_720.jpg",
        "link": "https://www.tempo.co/foto/arsip/purbaya-sampaikan-strategi-fiskal-pada-rapat-paripurna-dpr-2253894"
    },
    {
        "title": "Gagasan Haji Ramah Konsumen Mengemuka, Upayakan Perlindungan Bagi Jemaah Rentan",
        "summary": "",
        "thumbnails": "",
        "source": "tribun",
        "link": "https://m.tribunnews.com/amp/haji/7840062/gagasan-haji-ramah-konsumen-mengemuka-upayakan-perlindungan-bagi-jemaah-rentan"
    },
    {
        "title": "Tasya Kamila Ajak Mahasiswa jadi Motor Penggerak Kebiasaan Memilah Sampah",
        "summary": "Tasya Kamila menegaskan bahwa kekuatan mahasiswa sebagai agen perubahan lingkungan akan sangat masif jika didukung oleh ekosistem dan kolaborasi lintas sektor yang tepat. Melalui kampanye ini, Tasya mengajak mahasiswa memulai perubahan besar dari tindakan sederhana, yaitu membangun kebiasaan memilah sampah sejak dari sumbernya. Gerakan ini didukung langsung oleh Green Movement Indonesia dan mitra industri lewat program nyata seperti Dropbox Sampah Kemasan.",
        "thumbnails": "https://asset.tribunnews.com/-cJTwpQJfrfe42MLGM3ANOb9m9Y=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Kolaborasi-Program-Dropbox-Sampah-Kemasan-DSK-dalam-acara-talkshow-edukatif.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/seleb/7840173/tasya-kamila-ajak-mahasiswa-jadi-motor-penggerak-kebiasaan-memilah-sampah"
    },
    {
        "title": "Pengedar Obat Keras di Cikarang Ditangkap, Polisi Buru Pemasok Utama",
        "summary": "Polisi menangkap pria berinisial DA yang diduga mengedarkan obat keras daftar G di Cikarang Utara, Bekasi. Puluhan butir Tramadol dan Hexymer serta uang tunai hasil penjualan turut diamankan dalam penggerebekan. Polisi kini memburu pemasok utama berinisial F alias A untuk mengungkap jaringan peredaran obat keras.",
        "thumbnails": "https://asset.tribunnews.com/QGIDcpdJLzREmIUFpmrECoZqHwk=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/obat-kerass-d.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/metropolitan/7840163/pengedar-obat-keras-di-cikarang-ditangkap-polisi-buru-pemasok-utama"
    },
    {
        "title": "Libatkan BRIN, Kementan Targetkan Produksi Kedelai 5 Ton Per Hektare",
        "summary": "Kementan menargetkan peningkatan produktivitas tanaman kedelai di Indonesia menjadi 5 ton per hektare dalam beberapa tahun ke depan. Kedelai saat ini menjadi salah satu komoditas yang sedang fokus digarap pemerintah untuk terus ditingkatkan produktivitasnya. Saat ini inovasi yang bisa ditawarkan BRIN untuk mendorong produktivitas kedelai adalah 4,6 ton per hektare.",
        "thumbnails": "https://asset.tribunnews.com/IkaMAdRcBTmoTpII2GhkYanO3gg=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Produksi-Tahu-Ditengah-Kenaikan-Harga-Kedelai_20260409_205550.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/bisnis/7839942/libatkan-brin-kementan-targetkan-produksi-kedelai-5-ton-per-hektare"
    },
    {
        "title": "Pencipta Lagu Tuntut Transparansi Tata Kelola Royalti, Ini Penjelasan LMKN",
        "summary": "Sejumlah pencipta lagu menggelar aksi unjuk rasa di kantor Lembaga Manajemen Kolektif Nasional (LMKN), Jakarta Selatan, Selasa (9/6/2026). Mereka menuntut komisioner LMKN mundur serta mendesak agar dana royalti segera dibagikan kepada para pencipta lagu dan pemilik hak terkait. Massa menilai sistem perhitungan royalti berdasarkan penggunaan lagu tidak sesuai harapan.",
        "thumbnails": "https://asset.tribunnews.com/bpNboTZ2QlD5lNDtCw8lqdbOHBc=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/demo-pencipta-lagu-asd.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7840072/pencipta-lagu-tuntut-transparansi-tata-kelola-royalti-ini-penjelasan-lmkn"
    },
    {
        "title": "Chatib Basri Bantah Isu Ditawari Prabowo Jadi Menteri Keuangan",
        "summary": "Chatib Basri membantah isu yang menyebutkan dirinya ditawari jabatan Menteri Keuangan oleh Presiden Prabowo Subianto Chatib Basri menegaskan pertemuannya dengan Presiden Prabowo sama sekali tidak membahas perombakan kabinet Dasco tepis isu pergantian Menteri Keuangan",
        "thumbnails": "https://asset.tribunnews.com/OrX4pbMPPFW_eMQw6b_76LFLkkM=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Chatib-Basri-di-Istana-09062026.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7840121/chatib-basri-bantah-isu-ditawari-prabowo-jadi-menteri-keuangan"
    },
    {
        "title": "INFOGRAFIS Bupati Muara Enim Edison Tersangka",
        "summary": "",
        "thumbnails": "https://asset-2.tribunnews.com/tribunnews/foto/images/preview/INFOGRAFIS-Bupati-Muara-Enim-Edison-Tersangka_20260609_221833.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/images/grafis/view/infografis-bupati-muara-enim-edison-tersangka/2037893"
    },
    {
        "title": "Grab Business Forum 2026",
        "summary": "",
        "thumbnails": "https://asset-2.tribunnews.com/tribunnews/foto/images/preview/Grab-Business-Forum-2026_20260609_221928.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/images/editorial/view/grab-business-forum-2026/2037898"
    },
    {
        "title": "Kerja Keras Tanpa Gengsi, Kunci Sukses Imam Tembus Ajang Dunia",
        "summary": "Imam Pesuwaryantoro meraih juara satu inovasi pemuda pada forum internasional JIYIS 2025 Jepang. Lulusan Universitas Terbuka itu menilai kerja keras tanpa gengsi menjadi kunci kesuksesan. Imam mendorong generasi muda adaptif, memperluas jejaring, serta membangun kecerdasan finansial sejak dini.",
        "thumbnails": "https://asset.tribunnews.com/d2gngXlxSYC7sMll8RfB3ucKQv8=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/JIYIS1111111.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/pendidikan/7839964/kerja-keras-tanpa-gengsi-kunci-sukses-imam-tembus-ajang-dunia"
    },
    {
        "title": "Komitmen MILO Optimalkan Tumbuh Kembang Anak",
        "summary": "",
        "thumbnails": "https://asset-2.tribunnews.com/tribunnews/foto/images/preview/Komitmen-MILO-Optimalkan-Tumbuh-Kembang-Anak_20260609_221811.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/images/regional/view/komitmen-milo-optimalkan-tumbuh-kembang-anak/2037891"
    },
    {
        "title": "UU Polri Disahkan, Koalisi Sipil Kritik Ruang Jabatan Polisi Aktif",
        "summary": "DPR resmi mengesahkan perubahan UU Polri dalam rapat paripurna. Koalisi sipil menyoroti pasal yang membuka ruang jabatan bagi polisi aktif. Ketentuan tersebut dinilai berpotensi memicu perdebatan soal reformasi kepolisian.",
        "thumbnails": "https://asset.tribunnews.com/c655Z_akf1mk_xBYJQ7JYFUApwY=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Rapat-Paripurna-DPR-RI-mengesahkan-perubahan-UU-Polri-menjadi-undang-undang.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7840012/uu-polri-disahkan-koalisi-sipil-kritik-ruang-jabatan-polisi-aktif"
    },
    {
        "title": "Israel Bombardir Beirut, Iran Balas Rudal ke Israel Utara",
        "summary": "",
        "thumbnails": "",
        "source": "tribun",
        "link": "https://m.tribunnews.com/amp/internasional/7840030/israel-bombardir-beirut-iran-balas-rudal-ke-israel-utara"
    },
    {
        "title": "Polri Wajibkan Seluruh Anggota Adaptasi dengan Rekan Kerja Penyandang Disabilitas",
        "summary": "Karo Dalpers SSDM Polri Brigjen Pol Erthel Stephan menegaskan seluruh personel kepolisian wajib menyesuaikan diri untuk bekerja berdampingan dengan rekan kerja dari kelompok penyandang disabilitas. Menurutnya, lingkungan kerja internal Polri harus disiapkan agar siap menerima keberagaman kompetensi dan kondisi fisik personelnya. Ia menekankan pentingnya bagi anggota Polri lama untuk mulai terbiasa dengan kehadiran rekan kerja yang memiliki kebutuhan khusus di lingkungan Korps Bhayangkara.",
        "thumbnails": "https://asset.tribunnews.com/5VsKE-ejRRNlJtsrfkLYr2XhcFk=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Brigjen-Pol-Erthel-Stephan-iniii.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7839899/polri-wajibkan-seluruh-anggota-adaptasi-dengan-rekan-kerja-penyandang-disabilitas"
    },
    {
        "title": "Nadiem Catat Poin Replik Jaksa di Laptop yang Dipangku",
        "summary": "Nadiem Makarim hadir dalam sidang replik kasus pengadaan laptop Chromebook di Tipikor Jakarta. Eks Mendikbudristek itu terlihat mencatat poin-poin replik jaksa menggunakan laptop yang dipangku. Sidang merupakan kelanjutan proses hukum setelah pembacaan tuntutan dan nota pembelaan.",
        "thumbnails": "https://asset.tribunnews.com/X1EGWg2SoyfC4ma5SXgrbpFicgE=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Sidang-kasus-dugaan-korupsi-pengadaan-laptop-Chromebook-Nadiem-Makarim.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7839954/nadiem-catat-poin-replik-jaksa-di-laptop-yang-dipangku"
    },
    {
        "title": "Abaikan Ronaldo dan Skuad Bertabur Prestasi, Pemain Kongo: Portugal Sepele",
        "summary": "",
        "thumbnails": "",
        "source": "tribun",
        "link": "https://m.tribunnews.com/amp/superskor/7839886/abaikan-ronaldo-dan-skuad-bertabur-prestasi-pemain-kongo-portugal-sepele"
    },
    {
        "title": "Renduk Pascabencana Terbit, Rehabilitasi dan Rekonstruksi Sumatra Masuki Fase Permanen",
        "summary": "TRIBUNNEWS.COM - Pemerintah menerbitkan Keputusan Menteri Koordinator Bidang Pembangunan Manusia dan Kebudayaan (Menko PMK) Nomor 25 Tahun 2026 tentang Rencana Induk Percepatan Rehabilitasi dan Rekonstruksi Pascabencana Alam di Provinsi Aceh, Provinsi Sumatera Utara, dan Provinsi Sumatera Barat. Kehadiran dokumen tersebut menandai dimulainya fase rehabilitasi dan rekonstruksi permanen sebagai bagian dari upaya pemulihan menyeluruh pascabencana hidrometeorologi yang melanda Sumatera pada akhir 2025. Rencana Induk Percepatan Rehabilitasi dan Rekonstruksi Pascabencana (Renduk PRRP) Sumatera menjadi pedoman bersama bagi kementerian, lembaga, pemerintah daerah, serta berbagai pemangku kepentingan dalam melaksanakan program pemulihan hingga tahun 2028. Dokumen ini disusun untuk memastikan seluruh proses rehabilitasi dan rekonstruksi berjalan secara terarah, terpadu, terkoordinasi, dan berkelanjutan.",
        "thumbnails": "https://asset.tribunnews.com/4QO2wXDYKURFAsKlnswDR8r7S28=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/09062026-Mendagri-Tito.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/kilas-kementerian/7840010/renduk-pascabencana-terbit-rehabilitasi-dan-rekonstruksi-sumatra-masuki-fase-permanen"
    },
    {
        "title": "Jerman dan Prancis Hentikan Program Jet Tempur Gabungan",
        "summary": "Setelah bertahun-tahun diwarnai konflik internal, proyek bersama Prancis dan Jerman untuk membangun jet tempur generasi baru akhirnya runtuh. Kanselir Jerman, Friedrich Merz dan Presiden Prancis, Emmanuel Macron pekan lalu sepakat bahwa perusahaan manufaktur Dassault Aviation dan Airbus gagal menyelesaikan perselisihan besar antarperusahaan, demikian dikonfirmasi otoritas di Berlin dan Paris pada Senin (08/06). Program Future Combat Air System (FCAS) yang diluncurkan pada 2017 ikut membidik pengembangan pesawat tempur generasi keenam sebagai pengganti pesawat Eurofighter dan Rafale yang akan beroperasi sekitar tahun 2040. Keputusan menghentikan salah satu proyek pertahanan terbesar di Eropa ini muncul di tengah meningkatnya kekhawatiran pejabat militer di sana terhadap ancaman dari Rusia, serta tekanan dari Amerika Serikat agar Eropa lebih mandiri dalam bidang pertahanan.",
        "thumbnails": "https://asset.tribunnews.com/G-d8FgTIXU71KysXxEWhUD_gJDk=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/BDeutsche-Welle77466804_403.jpg.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/internasional/2026/06/09/jerman-dan-prancis-hentikan-program-jet-tempur-gabungan"
    },
    {
        "title": "Sosialisasi Alat Belajar Seru di Purworejo",
        "summary": "",
        "thumbnails": "https://asset-2.tribunnews.com/tribunnews/foto/images/preview/Sosialisasi-Alat-Belajar-Seru-di-Purworejo_20260609_202836.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/images/regional/view/sosialisasi-alat-belajar-seru-di-purworejo/2037883"
    },
    {
        "title": "Timnas Indonesia Naik 4 Peringkat di Ranking FIFA, Raih Modal Berharga Tatap Piala AFF",
        "summary": "Timnas Indonesia Naik 4 Peringkat di Ranking FIFA, Raih Modal Berharga Tatap Piala AFF Laporan Wartawan Tribunnews,com, Abdul Majid TRIBUNNEWS.COM, JAKARTA – Timnas Indonesia menutup agenda FIFA Matchday Juni 2026 dengan hasil sempurna setelah mengalahkan Mozambik di Stadion Utama Gelora Bung Karno (SUGBK), Senayan, Jakarta, Selasa (9/6/2026).",
        "thumbnails": "https://asset.tribunnews.com/9VqNhnShFOqN4_RL6Aknl6NujbQ=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/TIMNAS-INDONESIA-MENANG-Timnas-Indonesia-sukses-menaklukkan-Mozambik.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/superskor/7840164/timnas-indonesia-naik-4-peringkat-di-ranking-fifa-raih-modal-berharga-tatap-piala-aff"
    },
    {
        "title": "Mengenal Jennifer dan Hayato, Orang Utan Kalimantan 'Menikah' di Jepang",
        "summary": "Orangutan Jennifer 'menikah' dengan Hayato Tobe Zoo, Prefektur Ehime, Jepang, pada Sabtu, 6 Juni 2026. Jennifer adalah orang utan Kalimantan betina dari Taman Safari Indonesia, Hayato merupakan orang utan Kalimantan jantan kelahiran Jepang. Kehadiran Jennifer dan Hayato ini, menjadi wujud nyata eratnya persahabatan Indonesia dan Jepang melalui kolaborasi konservasi satwa liar yang berstatus sangat terancam punah (Critically Endangered).",
        "thumbnails": "https://asset.tribunnews.com/pnXpzihGzMAzl0Watvg_rpw2N18=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Orangutan-Jennifer.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7839917/mengenal-jennifer-dan-hayato-orang-utan-kalimantan-menikah-di-jepang"
    },
    {
        "title": "Porsi Ekspor Produk Manufaktur Diproyeksikan Naik Jadi 30 Persen",
        "summary": "Penjualan ekspor produk manufaktur Indonesia ditargetkan naik dari saat ini sekitar 20 persen dan 80 persen untuk pasar domestik menjadi 30 persen ekspor dan 70 persen domestik. Target tersebut ditopang oleh kinerja sektor manufaktur yang masih menunjukkan pertumbuhan positif. Realisasi investasi sektor industri manufaktur pengolahan mencapai Rp 182,04 triliun atau setara 36,49 persen dari total investasi nasional.",
        "thumbnails": "https://asset.tribunnews.com/hZdax68SKm7GLF4PF_EXvigV6AY=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Suku-cadang-Tiga-Berlian-GIIAS.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/bisnis/7839834/porsi-ekspor-produk-manufaktur-diproyeksikan-naik-jadi-30-persen"
    },
    {
        "title": "DPR Sahkan UU Polri, Usia Pensiun Kapolri Sesuai Kebutuhan Presiden",
        "summary": "DPR mengesahkan revisi UU Polri yang memberi Presiden kewenangan memperpanjang masa dinas Kapolri melalui Keppres. Aturan baru mengubah ketentuan usia pensiun perwira tinggi bintang empat dari maksimal 61 tahun menjadi 60 tahun namun dapat diperpanjang 1 tahun atau lebih sesuai kebutuhan yang ditetapkan Presiden. emerintah menilai kebijakan ini sejalan dengan hak prerogatif Presiden sebagai pemegang kekuasaan tertinggi atas TNI dan Polri.",
        "thumbnails": "https://asset.tribunnews.com/FsIiKJT1fqi5cAo9X86OQp_pz6E=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/mpa-pers-di-Kompleks-Parlemen-Sen-s-Waku.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/nasional/7839851/dpr-sahkan-uu-polri-usia-pensiun-kapolri-sesuai-kebutuhan-presiden"
    },
    {
        "title": "Prakiraan Cuaca Yogyakarta, Rabu 10 Juni 2026, BMKG: Didominasi Berawan",
        "summary": "TRIBUNNEWS.COM - Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) memprakirakan mayoritas wilayah di Daerah Istimewa Yogyakarta akan berawan pada Rabu (10/6/2026). Kondisi cuaca berawan ini diprediksi BMKG akan terjadi merata di wilayah Kulonprogo, Bantul, Gunungkidul, Sleman, dan Kota Yogyakarta. Suhu di Yogyakarta diperkirakan berkisar antara 20-32 derajat celcius dan kelembaban udara berkisar antara 48-98 persen.",
        "thumbnails": "https://asset.tribunnews.com/RaNJpK_B6L6acSlUYzoVTxrxvuA=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Cuaca-Yogyakarta-sks.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/regional/7839939/prakiraan-cuaca-yogyakarta-rabu-10-juni-2026-bmkg-didominasi-berawan"
    },
    {
        "title": "Kementan-BRIN Kerjasama Laboratorium Pertanian untuk Varietas Baru",
        "summary": "Seluruh kantor dan laboratorium milik Kementan yang tersebar di 38 provinsi kini bisa dimanfaatkan oleh para peneliti BRIN untuk mengembangkan riset pertanian. Indonesia sedang meningkatkan produktivitas hasil pertanian termasuk menemukan varietas baru dengan melibatkan para peneliti BRIN. Pemerintah fokus mengembangkan swasembada pangan bawang putih, kelapa dan tebu yang permintaannya sedang tinggi di dunia.",
        "thumbnails": "https://asset.tribunnews.com/zfCAjC2yIT0kJFEsMNHfBVVV7Pg=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Kerjasama-Kementan-BRIN-OK.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/bisnis/7839915/kementan-brin-kerjasama-laboratorium-pertanian-untuk-varietas-baru"
    },
    {
        "title": "Cara Keluarga Dampingi Sharfina, Jemaah Penyandang Autisme Jalani Rangkaian Haji",
        "summary": "Laporan langsung wartawan Tribunnews.com dan Media Center Haji dari Arab Saudi, Sri Juliati TRIBUNNEWS.COM - Di tengah jutaan manusia yang memadati Tanah Suci, terselip kisah yang menggetarkan hati dari Sharfina Diah Nuratika atau yang karib disapa Fina. Penyandang disabilitas autisme asal Tangerang Selatan, Banten itu memang tidak banyak berbicara tentang makna haji yang sedang dijalaninya.",
        "thumbnails": "https://asset.tribunnews.com/zU0t2gBZgJS13irwWyikLrbk5W4=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/tribunnews/foto/bank/originals/Jemaah-haji-autisme.jpg",
        "source": "tribun",
        "link": "https://www.tribunnews.com/haji/7839983/cara-keluarga-dampingi-sharfina-jemaah-penyandang-autisme-jalani-rangkaian-haji"
    },
    {
        "title": "Dunia Hari Ini: Timur Tengah Kembali Perang, Israel-Iran Saling Serang",
        "summary": "",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/08/abc-1780907517125_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/abc-australia/d-8523093/dunia-hari-ini-timur-tengah-kembali-perang-israel-iran-saling-serang"
    },
    {
        "title": "Polres Gresik Terima 15 Taruna Akpol Angkatan 58 Batalyon Ksatriya Hawin Sarwahita",
        "summary": "Detiknews.id Gresik – Polres Gresik resmi menerima 15 Taruna Akademi Kepolisian (Akpol) Tingkat III Angkatan 58 Batalyon Ksatriya Hawin Sarwahita untuk mengikuti Latihan Kerja (Latja) Tahun 2026. Pembukaan kegiatan yang dipimpin langsung Kapolres Gresik AKBP Ramadhan Nasution di Aula Rupatama SAR Polres Gresik, Senin (08/06), menjadi langkah penting dalam membekali para calon perwira Polri dengan pengalaman lapangan dan pemahaman tugas kepolisian secara nyata. Upacara diawali dengan laporan perwira yang ditunjuk kepada inspektur upacara, dilanjutkan prosesi penyematan tanda Latihan Kerja kepada perwakilan taruna sebagai simbol dimulainya kegiatan pembelajaran lapangan di wilayah hukum Polres Gresik.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/polres-gresik-terima-15-taruna-akpol-angkatan-58-batalyon-ksatriya-hawin-sarwahita/"
    },
    {
        "title": "Iran-Israel Umumkan Jeda Sementara Usai Saling Serang",
        "summary": "Israel dan Iran mendeklarasikan penghentian sementara serangan, setelah kedua negara saling menyerang untuk pertama kalinya sejak gencatan senjata ditetapkan dua bulan lalu. Meski demikian, kedua pihak menegaskan siap membalas jika kembali diserang. Perkembangan terbaru ini memunculkan harapan soal meredanya konflik yang telah mengguncang kawasan Timur Tengah dan memicu gejolak ekonomi global. Namun, situasi di lapangan menunjukkan ketegangan masih jauh dari berakhir. Sejak Amerika Serikat (AS) dan Israel melancarkan serangan terhadap Iran pada 28 Februari 2026, konflik telah mendorong kenaikan harga energi dunia dan meningkatkan biaya berbagai kebutuhan pokok. Upaya diplomatik untuk mengubah gencatan senjata – yang diumumkan pada April – menjadi kesepakatan damai permanen, hingga kini belum membuahkan hasil.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/09/iran-israel-umumkan-jeda-sementara-usai-saling-serang-1781006263225.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/dw/d-8525127/iran-israel-umumkan-jeda-sementara-usai-saling-serang"
    },
    {
        "title": "URC Polrestabes Surabaya Tangkap Dua Tersangka Curanmor Milik Kurir",
        "summary": "Detiknews.id Surabaya – Tim Unit Reaksi Cepat (URC) Resmob Polrestabes Surabaya mengamankan dua pria kasus pencurian kendaraan bermotor (curanmor) milik seorang kurir layanan pesan antar di kawasan Jalan Mayjen Yono Suwoyo, Surabaya. Kedua terduga pelaku yang diamankan masing-masing berinisial A.S.A. (36) dan A.E. (33), warga kawasan Sukomanunggal, Surabaya. Kasi Humas Polrestabes Surabaya AKP Ismanto menjelaskan bahwa peristiwa pencurian terjadi pada Selasa, 2 Juni 2026 sekitar pukul 18.00 WIB di depan kawasan Lenmarc Mall Surabaya.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/urc-polrestabes-surabaya-tangkap-dua-tersangka-curanmor-milik-kurir/"
    },
    {
        "title": "Lebih dari 20.000 Orang Mengugsi Akibat Gempa di Filipina",
        "summary": "Tim penyelamat terus menyisir reruntuhan bangunan di wilayah selatan Filipina pada Selasa (09/06) untuk memastikan tidak ada lagi korban yang terjebak, sehari setelah gempa terkuat yang melanda negara itu dalam setengah abad terakhir menewaskan sedikitnya 37 orang dan memaksa lebih dari 20.000 warga mengungsi. Hingga kini dalam laporan resmi masih ada empat orang yang dinyatakan hilang di sejumlah daerah dekat pusat gempa berkekuatan magnitudo 7,8 yang terjadi pada Senin (08/06) pagi. Kantor Pertahanan Sipil Filipina juga menyatakan bahwa beberapa bangunan yang roboh dan rusak berat masih harus diperiksa secara menyeluruh untuk mencari kemungkinan korban selamat maupun korban meninggal lainnya. Gempa tersebut berpusat di lepas pantai Pulau Mindanao, pulau dengan jumlah penduduk terbesar kedua di Filipina. Selain menewaskan puluhan orang, gempa juga menyebabkan hampir 500 orang mengalami luka-luka dan lebih dari 20.000 warga terpaksa meninggalkan rumah mereka dan mengungsi menuju tempat-tempat evakuasi.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/09/lebih-dari-20000-orang-mengugsi-akibat-gempa-di-filipina-1781007842224.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/dw/d-8525158/lebih-dari-20-000-orang-mengugsi-akibat-gempa-di-filipina"
    },
    {
        "title": "Dukung Ketahanan Pangan Nasional, Polres Gresik Dampingi Sektor Pertanian di Panceng",
        "summary": "Detiknews.id Gresik – Dalam rangka mendukung program ketahanan pangan nasional dan mewujudkan swasembada pangan, jajaran Polres Gresik terus melakukan pendampingan serta monitoring terhadap sektor pertanian di wilayah hukum masing-masing. Menindaklanjuti arahan pimpinan, Kapolres Gresik AKBP Ramadhan Nasution memerintahkan Kapolsek Panceng AKP Khairul Alam beserta anggotanya untuk melaksanakan pengecekan tanaman cabai di lahan LMDH yang berada di Desa Prupuh, Kecamatan Panceng, Kabupaten Gresik, Senin (08/06). Kegiatan tersebut dilakukan sebagai bentuk dukungan Polri terhadap program ketahanan pangan yang menjadi salah satu prioritas pemerintah dalam menjaga ketersediaan pangan nasional. Dalam pengecekan tersebut, Kapolsek Panceng bersama anggota meninjau langsung kondisi tanaman cabai, memastikan pertumbuhan tanaman berjalan dengan baik, serta berdialog dengan para petani mengenai berbagai kendala yang dihadapi di lapangan.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/dukung-ketahanan-pangan-nasional-polres-gresik-dampingi-sektor-pertanian-di-panceng/"
    },
    {
        "title": "Masuki Musim Kemarau, Polres-Pemkab Rohul Gelar Simulasi Atasi Karhutla",
        "summary": "Jajaran Polres Rokan Hulu (Rohul) bersama Pemkab Rohul, TNI, hingga Masyarakat Peduli Api (MPA) menggelar simulasi dalam penanggulangan karhutla. Kegiatan ini digelar untuk memperkuat sinergi dan koordinasi dalam penanganan karhutla memasuki musim kemarau. Kegiatan tersebut digelar di halaman Kantor Bupati Rokan Hulu, Selasa (9/6/2026), dipimpin Wakil Bupati Rohul Syafaruddin Poti. Turut hadir Kapolres Rokan Hulu AKBP Emil Eka Putra, perwakilan Dandim 0313/KPR, unsur Forkopimda, BPBD Provinsi Riau, jajaran Pemerintah Kabupaten Rokan Hulu, para Kapolsek, Danramil, camat se-Kabupaten Rokan Hulu, serta perwakilan perusahaan perkebunan. Apel kesiapsiagaan ini diikuti berbagai unsur yang terlibat langsung dalam upaya penanggulangan Karhutla, di antaranya Bhabinkamtibmas, Babinsa, BPBD Kabupaten Rokan Hulu, Polisi Kehutanan, Satpol PP dan Damkar, Tim Reaksi Cepat BPBD, Manggala Agni, Tagana, relawan, serta perwakilan perusahaan perkebunan dan kelapa sawit.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/09/polres-dan-pemkab-rohul-gelar-apel-kesiapsiagaan-penanganan-bencana-karhutla-1780999860045_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8524938/masuki-musim-kemarau-polres-pemkab-rohul-gelar-simulasi-atasi-karhutla"
    },
    {
        "title": "Polsek Kenjeran Salurkan Bantuan Bibit dan Obat Hama ke Poktan Nandur Makmur",
        "summary": "Detiknews.id Surabaya – Polsek Kenjeran, jajaran Polres Pelabuhan Tanjung Perak, menyalurkan bantuan bibit, pupuk, dan obat-obatan pertanian kepada Kelompok Tani (Poktan) Nandur Makmur. Aksi nyata ini dilakukan di lahan jagung Kelurahan Tambak Wedi, Kecamatan Kenjeran, Surabaya, pada Selasa (09/06/26) pagi. Langkah ini diambil sebagai wujud komitmen Polri dalam mendukung program Asta Cita Presiden RI guna mewujudkan swasembada pangan nasional dan kemandirian bangsa agar terbebas dari ketergantungan impor. Kapolsek Kenjeran, Kompol Yuyus Andriastanto, S.H., M.H., memimpin langsung jalannya penyerahan bantuan pada pukul 10.00 WIB.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/polsek-kenjeran-salurkan-bantuan-bibit-dan-obat-hama-ke-poktan-nandur-makmur/"
    },
    {
        "title": "Iran-Israel Kembali Saling Serang, Gencatan Senjata Terancam",
        "summary": "Kementerian Luar Negeri Iran pada Senin (8/6) mengatakan bahwa mereka menganggap Amerika Serikat (AS) \"bertanggung jawab atas konsekuensi dari setiap eskalasi\" di Timur Tengah. \"Tindakan Israel tidak bisa dipisahkan dari kebijakan AS,\" kata juru bicara Kementerian Luar Negeri Iran, seraya menambahkan: \"AS memikul tanggung jawab langsung atas pelanggaran gencatan senjata baru-baru ini.\" Juru bicara tersebut juga menyerang Badan Energi Atom Internasional (IAEA), menuduh badan pengawas nuklir PBB itu \"mengabaikan realitas konflik\" dan bersikap bias secara politik dalam krisis yang sedang berlangsung.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/09/iran-israel-kembali-saling-serang-gencatan-senjata-terancam-1780973857372.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/dw/d-8524069/iran-israel-kembali-saling-serang-gencatan-senjata-terancam"
    },
    {
        "title": "Tebas Polres Jember Ungkap Curanmor di Pos Ronda Bangsalsari dan Amankan Tersangka",
        "summary": "Detiknews.id Jember – Respons cepat jajaran Polres Jember Polda Jatim kembali membuahkan hasil dalam mengungkap kasus pencurian sepeda motor yang sempat viral di media sosial setelah rekaman CCTV aksi pelaku beredar luas melalui akun Instagram Jember 24 Jam. Berbekal hasil penyelidikan intensif dan pengumpulan keterangan saksi serta petunjuk di lapangan,Tim Elang Bangsalsari (TEBAS) bersama Tim Khusus 2 Jatanras Polres Jember Polda Jatim berhasil mengidentifikasi hingga mengamankan terduga pelaku, pada Minggu (07/06). Kanit Reskrim Polsek Bangsalsari, Aiptu Beny, menjelaskan bahwa peristiwa pencurian terjadi pada Kamis, 4 Juni 2026 sekitar pukul 05.30 WIB.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/tebas-polres-jember-ungkap-curanmor-di-pos-ronda-bangsalsari-dan-amankan-tersangka/"
    },
    {
        "title": "Keliling Pakai Kostum Pocong demi Konten, 2 Pemuda di Kuansing Diamankan",
        "summary": "Fenomena pocong jadi-jadian sampai ke Kuantan Singingi (Kuansing), Provinsi Riau. Baru-baru ini, dua orang pemuda diamankan setelah berkeliling memakai kostum pocong demi konten. Kedua pemuda tersebut, FS (20) dan AFM (18), warga Kelurahan pasar Taluk, Kecamatan Kuantan Tengah, Kabupaten Kuansing, diamankan polisi pada Sabtu (6/6) lalu. FS dan AFM diamankan setelah polisi mendapatkan laporan adanya 'pocong' keliling naik motor berkeliaran malam hari di Jalan Proklamasi, Desa Koto Taluk, Kecamatan Kuantan Tengah. Keduanya kemudian diamankan Satreskrim Polres Kuansing. Dalam pemeriksaan polisi, keduanya mengaku berkostum pocong untuk membuat konten video.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/08/dua-pemuda-di-kuansing-riau-diamankan-usai-bikin-konten-pakai-kostum-pocong-1780917010056_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8523452/keliling-pakai-kostum-pocong-demi-konten-2-pemuda-di-kuansing-diamankan"
    },
    {
        "title": "Epidemi Mengancam Bonus Demografi di Indonesia",
        "summary": "Detiknews.id Surabaya – Ketika publik disibukkan oleh stunting, tuberkulosis, dan penyakit tidak menular, epidemi HIV di Indonesia terus berkembang dalam senyap. Ia tidak menimbulkan kepanikan seperti Covid-19, tetapi dampaknya terhadap kesehatan masyarakat dan produktivitas penduduk usia kerja sangat besar. Yang mengkhawatirkan, ketika banyak negara berhasil menurunkan infeksi baru HIV secara signifikan, Indonesia justru masih menghadapi tantangan besar dalam menemukan dan mengobati penderita. Data terbaru Kementerian Kesehatan menunjukkan bahwa pada 2025 diperkirakan terdapat sekitar 564.000 orang hidup dengan HIV (ODHIV) di Indonesia. Namun hingga Maret 2025, baru sekitar 356.638 orang atau 63 persen yang mengetahui statusnya. Dari mereka yang telah teridentifikasi, hanya 67 persen yang menjalani terapi antiretroviral (ARV), dan sekitar 55 persen yang berhasil mencapai supresi virus. Dengan kata lain, hampir separuh penderita HIV di Indonesia masih berada di luar sistem pengobatan yang optimal. Situasi ini menjelaskan mengapa Indonesia saat ini menempati peringkat ke-14 dunia dalam jumlah orang hidup dengan HIV dan peringkat ke-9 untuk infeksi baru HIV. Angka tersebut menunjukkan bahwa persoalan HIV bukan lagi isu kesehatan yang berada di pinggiran agenda pembangunan nasional.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/epidemi-mengancam-bonus-demografi-di-indonesia/"
    },
    {
        "title": "Polres Rohil Gandeng Sekolah, Cetak Pelajar Jadi Agen Perubahan Antinarkoba",
        "summary": "Polres Rokan Hilir (Rohil) terus menggencarkan sosialisasi bahaya narkoba di masyarakat. Menggandeng Duta Antinarkoba Panipahan, Polres Rohil kini menggelorakan anti-narkoba di kalangan pelajar tingkat Sekolah Menengah Atas (SMA). Kegiatan ini digelar serentak di seluruh polsek jajaran, pada Senin (8/6/2026). Total ada 13 SMA di wilayah Rokan Hilir yang disambangi aparat kepolisian. Polres Rohil sendiri menggelar kegiatan penyuluhan bahaya narkoba di musala MTsN 1 Rokan Hilir, Kelurahan Ujung Tanjung, Kecamatan Tanah Putih, yang dipimpin oleh Kasat Res Narkoba Polres Rokan Hilir, AKP M Sodikin. Turut hadir memberikan penyuluhan Duta Antinarkoba Panipahan.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/06/08/polres-rohil-menggandeng-sekolah-dalam-upaya-pencegahan-terhadap-narkoba-1780915403666_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8523412/polres-rohil-gandeng-sekolah-cetak-pelajar-jadi-agen-perubahan-antinarkoba"
    },
    {
        "title": "Pegadaian Kanwil XII Surabaya, Berkontribusi Raihan Best Company to Work For in Asia 2026",
        "summary": "Detiknews.id Jakarta – PT Pegadaian meraih lima penghargaan dalam ajang HR Asia Awards 2026, termasuk penghargaan utama Best Company to Work For in Asia 2026. Penghargaan untuk kedelapan kalinya, penganugerahan berlangsung di Jakarta. Pegadaian Kanwil XII Surabaya, terus mendukung berbagai program transformasi perusahaan, pengembangan talenta. Berkontribusi dalam implementasi budaya kerja yang selaras dengan nilai-nilai perusahaan. Guna mewujudkan Pegadaian sebagai institusi keuangan. Semakin modern, terpercaya, dan dekat dengan masyarakat. Direktur Human Capital PT Pegadaian, Tribuana Tunggadewi, menyampaikan rasa syukur atas penghargaan yang diraih kembali oleh perusahaan di tingkat Asia. Ini menjadi motivasi bagi seluruh karyawan, untuk terus memberikan kontribusi terbaik bagi perusahaan dan nasabah.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/pegadaian-kanwil-xii-surabaya-berkontribusi-raihan-best-company-to-work-for-in-asia-2026/"
    },
    {
        "title": "Rekayasa Perampokan, Pria di Riau Ternyata Habiskan Duit buat Judol",
        "summary": "Seorang pria di Kabupaten Kampar, Riau, bernama Ilham (30) merekayasa laporan polisi seolah-olah dirinya dirampok. Usut punya usut, ternyata Ilham kehilangan uang puluhan juta karena judi online (judol). Kasus bermula ketika Ilham melapor ke Polsek XIII Koto Kampar, pada Jumat (5/6) sekitar pukul 19.30 WIB. Dia saat itu melaporkan bahwa dirinya telah dirampok di siang hari di rumahnya di Jalan Lintas Dusun IV, Desa Bandur Picak, Koto Kampar Hulu. \"Dalam laporannya tersebut, yang bersangkutan mengaku telah mengalami pencurian dengan kekerasan, disekap, dan diikat,\" kata Kapolres Kampar AKBP Boby Ramadhan Putra Sebayang, dalam keterangannya kepada wartawan, Senin (8/6/2026).",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2023/07/25/ilustrasi-penangkapan_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8523724/rekayasa-perampokan-pria-di-riau-ternyata-habiskan-duit-buat-judol"
    },
    {
        "title": "Danrem 084/Bhaskara Jaya Hadiri Groundbreaking Renovasi Masjid At-Taqwa",
        "summary": "Detiknews.id Surabaya – Danrem 084/Bhaskara Jaya Brigjen TNI Kohir menghadiri kegiatan ground breaking atau peletakan batu pertama renovasi Masjid At-Taqwa yang berlokasi di lingkungan Makodam V/Brawijaya, Senin (18/05). Acara tersebut dipimpin langsung oleh Pangdam V/Brawijaya Mayjen TNI Rudy Saladin, menandai secara resmi dimulainya proses pembangunan dan perbaikan masjid tersebut. Renovasi ini merupakan wujud nyata komitmen TNI Angkatan Darat dalam meningkatkan kualitas fasilitas ibadah agar menjadi lebih nyaman, representatif, dan tetap terbuka bagi masyarakat sekitar. Dalam kesempatannya, Danrem 084/BJ Brigjen TNI Kohir menegaskan bahwa pembangunan atau renovasi tempat ibadah memiliki nilai strategis, khususnya dalam pembentukan karakter prajurit. Menurutnya, masjid tidak hanya berfungsi sebagai tempat beribadah, tetapi juga menjadi pusat pembinaan mental dan spiritual bagi seluruh personel.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/danrem-084-bhaskara-jaya-hadiri-groundbreaking-renovasi-masjid-at-taqwa/"
    },
    {
        "title": "Rangkuman Lengkap Tabrakan Kereta di Bekasi yang Tewaskan 14 Orang",
        "summary": "Daftar Isi\n\t\n\t\t\n\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tKronologi Kejadian: Dipicu Insiden di Perlintasan Sebidang\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tInsiden di JPL 85\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tKRL Berhenti di Lintasan\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tBenturan dari Arah Belakang\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tDampak Tabrakan\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tKesaksian Penumpang: Kepanikan Saat Listrik Padam\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tPenumpang Terpental\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tSempat Tidak Sadar\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tEvakuasi Mandiri\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tEvakuasi dan Penanganan Korban\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tKendala Evakuasi\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tSeluruh Korban Meninggal Perempuan\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tPenanganan Medis\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tRespons Pemerintah: Investigasi hingga Rencana Perbaikan\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tSantunan Korban\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tPerbaikan Perlintasan\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tAnggaran Rp 4 Triliun\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tInvestigasi KNKT dan Dampak Perjalanan Kereta\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tPengumpulan Data\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tEvaluasi Operator Taksi\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tGangguan Operasional\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tPosko Informasi dan Layanan Korban\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tPosko Tanggap Darurat\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tLayanan Barang Temuan\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\tImbauan Kepolisian Aktivitas di Stasiun Bekasi Timur pada Senin malam, 27 April 2026, sempat terganggu setelah terjadi kecelakaan kereta api sekitar pukul 20.52 WIB. Insiden ini melibatkan KA Argo Bromo Anggrek dan KRL Commuter Line rute Jakarta-Cikarang. Data terbaru dari PT Kereta Api Indonesia (Persero) hingga Selasa (28/4/2026) pagi pukul 08.45 WIB, mencatat 14 orang meninggal dunia dan 84 orang mengalami luka-luka. Seluruh korban meninggal merupakan penumpang perempuan, karena titik benturan berada di gerbong khusus wanita yang terletak di bagian paling belakang rangkaian KRL.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/04/28/detik-detik-evakuasi-gerbong-krl-usai-tabrakan-maut-di-bekasi-timur-1777349376599_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://www.detik.com/jabar/berita/d-8464986/rangkuman-lengkap-tabrakan-kereta-di-bekasi-yang-tewaskan-14-orang"
    },
    {
        "title": "Danrem 084/Bhaskara Jaya dampingi Pangdam V/Brawijaya Kunjungi Lokasi Yonif TP di Sampang",
        "summary": "Detiknews.id Sampang – Danrem 084/Bhaskara Jaya Brigjen TNI Kohir mendampingi Pangdam V/Brawijaya Mayjen TNI Rudy Saladin meninjau lokasi rencana pembangunan Yonif Teritorial Pembangunan (Yonif TP) di Desa Nyeloh, Kecamatan Kedungdung, Kabupaten Sampang, Selasa (19/05). Kunjungan tersebut dilakukan sebagai bagian dari upaya TNI AD dalam mendukung percepatan pembangunan wilayah sekaligus memperkuat ketahanan teritorial di Kabupaten Sampang. Dalam kesempatan tersebut, Pangdam V/Brawijaya Mayjen TNI Rudy Saladin menyampaikan bahwa keberadaan Yonif TP nantinya diharapkan mampu memberikan manfaat nyata bagi masyarakat melalui berbagai program pembangunan dan pemberdayaan.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/danrem-084-bhaskara-jaya-dampingi-pangdam-v-brawijaya-kunjungi-lokasi-yonif-tp-di-sampang/"
    },
    {
        "title": "Potret Udara Sempadan Anak Sungai Nilo Dirusak Korporasi Sawit di Riau",
        "summary": "Polda Riau mengungkap adanya potensi kerusakan ekologis senilai Rp 187,8 miliar akibat penanaman sawit PT MM di sempadan Sungai Air Hitam yang merupakan anak Sungai Nilo, Kecamatan Ukui, Kabupaten Pelalawan. Kerusakan itu berupa abrasi, erosi, hingga longsor dan hilangnya vegetasi alami di sempadan sungai. Dari foto yang diperoleh detikcom, terlihat area sempadan sungai sudah ditanami kelapa sawit, yang sebagian sudah mengering. Pohon kelapa sawit tersebut terhampar si sepanjang garis bibir anak Sungai Nilo seluas 29 ribu hektare. Kasubdit Tipidter Ditreskrimsus Polda Riau AKBP Teddy menyebutkan PT MM sengaja dimatikan oleh pihak perusahaan.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/19/potret-sempadan-anak-sungai-nilo-di-kecamatan-ukui-kabupaten-pelalawan-yang-dirusak-perusahaan-sawit-1779161543012_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8494606/potret-udara-sempadan-anak-sungai-nilo-dirusak-korporasi-sawit-di-riau"
    },
    {
        "title": "Geser Kamboja, Indonesia Jadi Sarang Kejahatan Siber?",
        "summary": "Penggerebekan markas judol di sebuah gedung di kawasan Hayam Wuruk, Jakarta Barat pada Kamis (7/5) lalu menambah daftar panjang keberhasilan polisi mengungkap praktik kejahatan siber dalam negeri. Diketahui, dalam penyergapan tersebut, polisi berhasil menangkap 320 warga negara asing dan seorang WNI yang berperan sebagai admin judi online. Seluruh pelaku yang tertangkap tersebut memiliki tugas masing-masing mulai dari admin, customer service, hingga penagih utang. Hal tersebut diungkapkan oleh Direktur Tindak Pidana Umum (Dirtipidum) Bareskrim Polri Brigjen Wira Satya Triputra. Terkait tugas WNI yang ikut tertangkap, dirinya menyebut jika hal tersebut masih dalam penyelidikan lebih lanjut. \"Peran WNI masih akan kita cek kembali tapi yang pasti dia customer service untuk sementara,\" ucap dia dikutip dari detikNews, Senin (11/5).",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/11/detiksore-11-mei-2026-1778484463124_169.png?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/berita/d-8484197/geser-kamboja-indonesia-jadi-sarang-kejahatan-siber"
    },
    {
        "title": "Beberapa Nama Orang Indonesia Ditemukan dalam Dokumen Epstein",
        "summary": "Departemen Kehakiman Amerika Serikat merilis jutaan dokumen Jeffrey Epstein, yang berisi foto, video, riwayat percakapan melalui email, dan lainnya sehingga bisa diakses publik. Dokumen ini menjadi topik pembicaraan selama beberapa hari terakhir sejak dirilis akhir pekan lalu. Dokumen tersebut memuat nama beberapa tokoh, termasuk dari Indonesia.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/02/05/departemen-kehakiman-amerika-serikat-merilis-jutaan-dokumen-tambahan-dalam-kasus-jeffrey-epstein-1770290910914_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/abc-australia/d-8342542/beberapa-nama-orang-indonesia-ditemukan-dalam-dokumen-epstein"
    },
    {
        "title": "Danrem 084/Bhaskara Jaya Sambut Kunjungan Panglima TNI Hadiri Panen Raya",
        "summary": "Detiknews.id Sidoarjo – Komandan Korem 084/Bhaskara Jaya, Brigjen TNI Kohir, menyambut langsung kedatangan Panglima TNI beserta para Kepala Staf Angkatan di Base Ops Lanudal Juanda, Sidoarjo, Kamis (14/05). Kunjungan para petinggi TNI ini dalam rangka menghadiri kegiatan Panen Raya Kedelai yang akan dilaksanakan di Desa Ngadiboyo, Kabupaten Nganjuk. Dalam rombongan tersebut hadir Panglima TNI Jenderal TNI Agus Subiyanto, didampingi oleh Kepala Staf Angkatan Darat (KASAD) Jenderal TNI Maruli Simanjuntak, Kepala Staf Angkatan Laut (KASAL) Laksamana TNI Muhammad Ali, serta Kepala Staf Angkatan Udara (KASAU) Marsekal TNI Mohamad Tonny Harjono. Turut serta pula jajaran pejabat utama TNI lainnya. Suasana penyambutan berlangsung hangat dan penuh kebersamaan. Kehadiran para pimpinan tertinggi TNI ini menjadi bukti nyata perhatian institusi terhadap program strategis nasional, khususnya dalam upaya memperkuat ketahanan pangan nasional dan mendukung kesejahteraan para petani.",
        "thumbnails": "",
        "source": "detik",
        "link": "https://detiknews.id/detiknews/danrem-084-bhaskara-jaya-sambut-kunjungan-panglima-tni-hadiri-panen-raya/"
    },
    {
        "title": "Sampaikan Dukacita, Kapolres Rohil Hadiri Pemakaman Bocah Korban Pemerkosaan",
        "summary": "Bocah perempuan berusia 4 tahun di Kabupaten Rokan Hilir (Rohil), Provinsi Riau yang tewas setelah diduga diperkosa dimakamkan hari ini. Kapolres Rohil AKBP Isa Imam Syahroni turut menghadiri pemakaman tersebut. Kapolres tiba di lokasi bersama Wakil Bupati Rohil Jhony Charles, sekitar pukul 10.30 WIB. Turut hadir, Kasat Reskrim Polres Rohil AKP Kris Tofel dan Kapolsek Bagan Sinembah AKP Gian Wiatma Jonimandala, Danramil 03/Bagan Sinembah Kapten Inf Khairul, serta unsur Forkopimcam dan tokoh masyarakat setempat. Pada kesempatan itu, Kapolres turut menyampaikan belasungkawa kepada keluarga atas meninggalnya korban. Kapolres menekankan kehadirannya untuk memberikan dukungan moril, sekaligus wujud kehadiran negara di tengah-tengah masyarakat.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/02/kapolres-rohil-akbp-isa-imam-syahroni-menghadiri-pemakaman-bocah-yang-diduga-tewas-usai-diperkosa-sabtu-252026-1777703518972_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://news.detik.com/melindungi-tuah-marwah/d-8471300/sampaikan-dukacita-kapolres-rohil-hadiri-pemakaman-bocah-korban-pemerkosaan"
    },
    {
        "title": "Tampang Cole Tomas Allen, Pelaku Penembakan di Acara Donald Trump",
        "summary": "Insiden penembakan terjadi di sebuah acara yang dihadiri Presiden Amerika Serikat, Donald Trump. Pelaku berhasil diamankan aparat keamanan di lokasi kejadian. Dilaporkan CNN, sebagaimana dilansir dari detikNews Minggu (26/4/2026), pria bersenjata tersebut diidentifikasi sebagai Cole Tomas Allen (31), warga California. Peristiwa itu terjadi saat acara White House Correspondents Dinner yang digelar di Hilton Washington DC pada Sabtu (25/4) malam waktu setempat. Tembakan dilaporkan terdengar dari area luar ballroom utama tempat acara berlangsung.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/04/26/foto-penangkapan-cole-tomas-allen-yang-diunggah-trump-via-truth-social-1777175164082_169.jpeg?w=700&q=90",
        "source": "detik",
        "link": "https://www.detik.com/jabar/berita/d-8461936/tampang-cole-tomas-allen-pelaku-penembakan-di-acara-donald-trump"
    },
    {
        "title": "Fenomena Langit Mei 2026, Dua Purnama hingga Hujan Meteor",
        "summary": "Daftar Isi\n\t\n\t\t\n\t\t\t            \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tFenomena Astronomi Mei 2026\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t1. Flower Moon\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t2. Puncak Hujan Meteor Eta-Aquariid\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t3. Hujan Meteor Eta-Lyrid\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t4. Parade Konjungsi Planet\t\t\t\t\t\n\t\t\t\t\t\t\t\t            \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t5. Blue Moon Kabar gembira buat para pencinta astronomi. Langit malam pada Mei 2026 akan menghadirkan sejumlah fenomena menarik yang sayang untuk dilewatkan. Mulai dari kemunculan dua kali bulan purnama dalam satu bulan, hingga hujan meteor yang bisa disaksikan dengan mata telanjang.",
        "thumbnails": "https://akcdn.detik.net.id/community/media/visual/2026/05/03/ilustrasi-fenomena-astronomi-bulan-ini-1777789561274_169.png?w=700&q=90",
        "source": "detik",
        "link": "https://www.detik.com/jatim/berita/d-8472301/fenomena-langit-mei-2026-dua-purnama-hingga-hujan-meteor"
    },
    {
        "title": "Update Ranking FIFA Usai Skor Timnas Indonesia Vs Mozambik 1-0",
        "summary": "KOMPAS.com - Ranking FIFA Timnas Indonesia kembali  mengalami kenaikan selepas menumbangkan Mozambik 1-0 dalam agenda uji coba FIFA Matchday Juni 2026. Laga Timnas Indonesia vs Mozambik bertajuk Garuda Championship Series 2026 berlangsung di Stadion Utama Gelora Bung Karno, Jakarta, Selasa (9/6/2026) malam WIB. Gol semata wayang Timnas Indonesia disumbangkan Ole Romeny pada menit ke-11. Dia mengecoh kiper lawan dalam situasi satu lawan satu usai menerima assist Ragnar Oratmangoen.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/qeklKp3-QCSeQCGnvkz0GiEpPO4=/128x85:1152x768/1200x800/data/photo/2026/06/09/6a281a5adcd81.jpeg",
        "link": "https://bola.kompas.com/read/2026/06/09/22313548/update-ranking-fifa-usai-skor-timnas-indonesia-vs-mozambik-1-0"
    },
    {
        "title": "Hasil AVC Cup 2026: Timnas Voli Putri Indonesia Tumbangkan Hong Kong 3-0",
        "summary": "KOMPAS.com - Hasil positif berhasil diraih Timnas Voli Putri Indonesia saat menghadapi Hong Kong pada laga keempat AVC Cup 2026. Duel Timnas Voli Putri Indonesia vs Hong Kong yang berlangsung di Candon City Arena, Selasa (9/6/2026) sore WIB berakhir dengan skor 3-0 (25-20, 27-25, 25-14). Garuda Pertiwi cukup dominan pada pertandingan ini dan berhasil membuat pertahanan Hong Kong keteteran.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/-ueW0sfMdu5qJNfqefahuA0QQVs=/1x0:1600x1066/1200x800/data/photo/2026/04/30/69f32076edc10.jpeg",
        "link": "https://www.kompas.com/sports/read/2026/06/09/19110898/hasil-avc-cup-2026-timnas-voli-putri-indonesia-tumbangkan-hong-kong-3-0"
    },
    {
        "title": "Start Meyakinkan Rose/Febi, Usung Misi Pertahankan Gelar Australian Open",
        "summary": "KOMPAS.com - Ganda putri Rachel Allessya Rose/Febi Setianingrum mengawali perjalanan dengan kemenangan atas pasangan Korea Selatan di babak pertama Australian Open 2026. Turnamen Australian Open 2026 yang notabene masuk kategori BWF World Tour level Super 500 ini bergulir di Quaycentre, Sydney, mulai Selasa (9/6/2026) hingga Minggu (14/6/2026). Rachel Allessya Rose/Febi Setianingrum menyandang predikat juara bertahan Australian Open. Tahun lalu mereka mengalahkan rekan senegara, Febriana Dwipuji Kusuma/Meilysa Trias Puspitasari, di final.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/VF-LPZnokhNQPLm9LqXvlM4x1pw=/115x70:3566x2371/1200x800/data/photo/2026/06/09/6a27dddad0eb9.jpg",
        "link": "https://www.kompas.com/badminton/read/2026/06/09/16444508/start-meyakinkan-rose-febi-usung-misi-pertahankan-gelar-australian-open"
    },
    {
        "title": "Marak Modus Pura-pura Tertabrak Mobil, Simak Tips Amannya",
        "summary": "JAKARTA, KOMPAS.com - Konflik di jalan raya bisa terjadi kapan saja, mulai dari senggolan ringan hingga kesalahpahaman antarpengguna jalan. Namun belakangan, muncul kekhawatiran mengenai modus pengendara yang sengaja menabrakkan kendaraan atau mengaku menjadi korban tabrak lari untuk memancing emosi massa. Peristiwa yang menimpa pengemudi Toyota Fortuner di kawasan Tanah Abang, Jakarta Pusat, pada Sabtu (6/6/2026), menjadi salah satu contoh bagaimana situasi di jalan dapat berkembang menjadi kericuhan yang merugikan semua pihak.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/TkWZGJq6Nt_k2qs9toSWzrLF-74=/0x329:1080x1049/1200x800/data/photo/2026/06/07/6a2520c05b737.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/144100815/marak-modus-pura-pura-tertabrak-mobil-simak-tips-amannya"
    },
    {
        "title": "Mengapa Investor Asing Ramai-Ramai Melepas Aset Indonesia?",
        "summary": "JAKARTA, KOMPAS.com - Fenomena “Sell Indonesia” yang ditandai derasnya arus keluar dana asing, pelemahan rupiah, dan koreksi tajam Indeks Harga Saham Gabungan (IHSG), dinilai mencerminkan menurunnya kepercayaan investor terhadap kepastian kebijakan di dalam negeri. Di tengah tekanan pasar keuangan tersebut, pelaku pasar menilai faktor domestik justru lebih dominan dibandingkan gejolak global dalam memengaruhi keputusan investor untuk mengurangi eksposur terhadap aset-aset Indonesia. “Kami melihat faktor internal, sebagai mekanisme untuk mengoreksi kinerja pemerintah yang kebijakannya keliru,” ujar Investment Specialist KISI Sekuritas Ahmad Faris Mu’tashim saat dihubungi Kompas.com, Senin malam (8/6/2026).",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/KusFXxkkLRNu7F-oXKtQiiuWs2o=/159x699:1428x1546/1200x800/data/photo/2025/10/29/6901a683333b6.png",
        "link": "https://money.kompas.com/read/2026/06/09/060501626/mengapa-investor-asing-ramai-ramai-melepas-aset-indonesia?page=all"
    },
    {
        "title": "Keunggulan Baterai SLA Dibanding Lithium-ion pada Motor Listrik",
        "summary": "JAKARTA, KOMPAS.com - Baterai lithium-ion saat ini menjadi teknologi yang paling banyak digunakan pada motor listrik modern. Bobotnya lebih ringan, kapasitas energinya lebih besar, dan mampu memberikan jarak tempuh yang lebih jauh. Meski demikian, baterai tipe SLA (Sealed Lead Acid) masih memiliki tempat tersendiri di pasar motor listrik Indonesia.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/RoBgDIjQOHF5NWKTNiAJ7I5iLas=/0x333:4000x3000/1200x800/data/photo/2023/03/15/6411c97629656.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/112200015/keunggulan-baterai-sla-dibanding-lithium-ion-pada-motor-listrik"
    },
    {
        "title": "Chatib Basri: Ekonomi RI Tak Seburuk yang Dibayangkan",
        "summary": "JAKARTA, KOMPAS.com - Mantan Menteri Keuangan sekaligus ekonom senior Chatib Basri menilai kondisi perekonomian domestik Indonesia saat ini menunjukkan situasi yang tidak seburuk dari apa yang dibayangkan sebelumnya. “Domestic economy, yang menarik adalah situasi di domestik itu enggak seburuk yang dibayangkan. Karena kalau dilihat di kuarter pertama, household consumption-nya itu masih relatively lumayan,” kata Chatib Basri di Jakarta, Selasa (9/6/2026). Dia menilai, realisasi indikator ekonomi pada kuartal pertama yang masih menunjukkan kinerja relatif lumayan, terutama pada sektor konsumsi rumah tangga (household consumption) serta adanya dorongan signifikan dari pengeluaran pemerintah (government consumption).",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/8fgeonbHieLNKUACiYDuY23xtPw=/0x0:750x500/1200x800/data/photo/2019/12/08/5decf224d10c6.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/155127926/chatib-basri-ekonomi-ri-tak-seburuk-yang-dibayangkan"
    },
    {
        "title": "Asing Masih Net Sell Rp 2,58 Triliun, Meski IHSG Melonjak 7,57 Persen",
        "summary": "JAKARTA, KOMPAS.com - Indeks Harga Saham Gabungan (IHSG) melonjak signifikan pada penutupan perdagangan Selasa (9/6/2026). Indeks naik 404 poin atau 7,57 persen ke level 5.747. Penguatan tajam tersebut menjadi salah satu reli harian terbesar dalam beberapa waktu terakhir, setelah pasar saham Indonesia sebelumnya mengalami tekanan akibat aksi jual yang masif. Meski IHSG melonjak lebih dari 7 persen, investor asing masih melakukan aksi jual bersih alis net sell senilai Rp 2,58 triliun.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/XV-PYPF-CRz8vzLcmWqlGnqX7FU=/104x35:856x537/1200x800/data/photo/2020/05/03/5eaebe4153980.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/182143026/asing-masih-net-sell-rp-258-triliun-meski-ihsg-melonjak-757-persen"
    },
    {
        "title": "Ini Calon Lawan Timnas U19 Indonesia di Semifinal Piala AFF U19 2026",
        "summary": "KOMPAS.com - Calon lawan Timnas U19 Indonesia di babak semifinal Piala AFF U19 2026 semakin jelas usai keberhasilan Thailand mengalahkan Malaysia 3-2 di Grup B. Timnas U19 Thailand sukses menyusul Timnas U19 Indonesia lolos ke babak semifinal sebagai juara grup. Melihat bagan saat ini, Thailand akan menghadapi tim yang akan finis sebagai runner up terbaik yang masih akan diperebutkan oleh Vietnam dan Kamboja.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/pvgDzi4j2YJK56PykrGZbFIn8s4=/0x0:5000x3333/1200x800/data/photo/2026/06/08/6a25fe9f7cabb.jpg",
        "link": "https://bola.kompas.com/read/2026/06/09/12420528/ini-calon-lawan-timnas-u19-indonesia-di-semifinal-piala-aff-u19-2026?page=all"
    },
    {
        "title": "Operasi Patuh 2026 Ditunda, Ini Alasan Korlantas Polri",
        "summary": "JAKARTA, KOMPAS.com – Bagi Anda para pengguna jalan yang sudah bersiap-siap memperketat kelengkapan berkendara mulai hari ini, tampaknya bisa sedikit bernapas lega. Korps Lalu Lintas (Korlantas) Polri secara resmi memutuskan untuk menunda pelaksanaan Operasi Patuh 2026. Sejatinya, razia lalu lintas skala besar ini dijadwalkan bergulir serentak di seluruh Indonesia mulai Senin (8/6/2026) hari ini hingga 21 Juni mendatang. Namun, Korlantas memilih untuk mengubah peta rencana tersebut.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/Xa_efi7bFzMEs7JW1iRhbshnfbY=/0x0:1200x800/1200x800/data/photo/2026/06/08/6a25ca9500411.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/08/092658115/operasi-patuh-2026-ditunda-ini-alasan-korlantas-polri"
    },
    {
        "title": "Beda Spek, Ini Alasan Baterai SLA Lebih Mudah Rusak dibanding Lithium",
        "summary": "BOGOR, KOMPAS.com - Sebagian tipe sepeda motor listrik murah di Indonesia masih mengandalkan baterai jenis SLA (Sealed Lead Acid) atau yang akrab dikenal sebagai aki kering. Namun, sudah menjadi rahasia umum di kalangan pengguna bahwa baterai jenis SLA ini relatif lebih mudah rusak dan memiliki usia pakai yang cenderung singkat. Mengapa baterai tipe SLA ini dinilai lebih cepat drop dan berumur pendek jika dibandingkan dengan teknologi baterai Lithium?",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/JGuEScA1FlIjRtbAXU0E1eUrkqQ=/0x352:4080x3072/1200x800/data/photo/2026/06/09/6a27d00319a64.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/194100015/beda-spek-ini-alasan-baterai-sla-lebih-mudah-rusak-dibanding-lithium"
    },
    {
        "title": "Mau Balancing Baterai Hybrid atau EV? Simak Durasi dan Biayanya",
        "summary": "JAKARTA, KOMPAS.com - Balancing baterai menjadi salah satu perawatan yang mulai banyak dicari pemilik mobil hybrid maupun kendaraan listrik (electric vehicle/EV). Proses ini dilakukan untuk menyamakan voltase antar sel baterai agar kinerjanya kembali optimal. Meski terdengar sederhana, proses balancing ternyata membutuhkan waktu yang tidak sebentar. Durasinya bergantung pada kapasitas baterai, jumlah sel, hingga tingkat perbedaan voltase antar sel. Proses Balancing Bisa Sampai Tiga Hari",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/spp0ArKUBw92NZyQ1cy0mgsRAvY=/0x0:1536x1024/1200x800/data/photo/2026/03/06/69aa792be1de2.png",
        "link": "https://otomotif.kompas.com/read/2026/06/09/193100015/mau-balancing-baterai-hybrid-atau-ev-simak-durasi-dan-biayanya"
    },
    {
        "title": "Tot Tot Wuk Wuk Masih Dilarang, tapi Boleh di Tol untuk Patroli",
        "summary": "JAKARTA, KOMPAS.com - Korlantas Polri memastikan kebijakan moratorium penggunaan sirene, rotator, dan pengawalan kendaraan atau yang lebih dikenal dengan istilah 'tot tot wuk wuk' masih tetap berlaku. Kakorlantas Polri Irjen Pol Agus Suryonugroho mengatakan, kebijakan tersebut diperpanjang sebagai respons atas berbagai masukan masyarakat terkait penggunaan pengawalan kendaraan di jalan raya, khususnya di kawasan perkotaan. \"Kami mendengar aspirasi masyarakat terkait 'tot tot wuk wuk'. Karena itu moratorium kebijakan tersebut kami perpanjang. Jadi masih kami larang, khususnya di dalam kota. Termasuk pengawalan, masih kami bekukan dan kami larang,\" ujar Agus dikutip Selasa (9/6/2026).",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/NzJ5PGCLrvSvOZgacYbgnfVl0ks=/0x72:900x672/1200x800/data/photo/2025/09/19/68cd1517470ac.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/192100915/tot-tot-wuk-wuk-masih-dilarang-tapi-boleh-di-tol-untuk-patroli"
    },
    {
        "title": "Transaksi Digital di 23 Semarang Ditopang Sistem QRIS YUKK Payment",
        "summary": "JAKARTA, KOMPAS.com - YUKK Payment Gateway kembali memperluas dukungannya terhadap ekosistem pembayaran digital di Indonesia melalui kolaborasi dengan ID Kitchen Projection di area food court 23 Semarang Shopping Center. Perusahaan penyedia sistem pembayaran digital tersebut menjadi mitra pembayaran resmi untuk mendukung transaksi di Bak&Co dan Eateria, dua area kuliner yang menjadi bagian dari pusat perbelanjaan baru 23 Semarang yang resmi dibuka pada 23 Mei 2026. Melalui kerja sama tersebut, YUKK Payment Gateway menyediakan layanan QRIS yang dapat digunakan di seluruh tenant yang beroperasi di kedua area kuliner tersebut.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/_gQcscgeKZkAFOLPeQxVHEpIEwA=/0x0:0x0/1200x800/data/photo/2026/05/25/6a144b036946f.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/213338026/transaksi-digital-di-23-semarang-ditopang-sistem-qris-yukk-payment"
    },
    {
        "title": "Produsen Oli Edukasi Masyarakat Soal Merawat Mesin",
        "summary": "JAKARTA, KOMPAS.com - Produsen pelumas TOP 1 Indonesia resmi menjalin kerja sama strategis dengan maskapai penerbangan Citilink Indonesia. Langkah ini diambil sebagai wujud komitmen berkelanjutan perusahaan dalam memberikan nilai tambah bagi para konsumennya. Sinergi lintas industri ini ditandai lewat peluncuran program activation on board yang interaktif dalam penerbangan rute Jakarta (CGK) menuju Denpasar (DPS) pada Kamis (4/6/2026). Mengusung tema \"Melayani Sepenuh Hati\", kolaborasi unik ini dirancang untuk menghadirkan pengalaman perjalanan yang lebih dekat, hangat, dan berkesan bagi para penumpang di dalam kabin.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/uv0vV_ZZnGsYQ21pWOU1BLmHD44=/0x0:1202x801/1200x800/data/photo/2026/06/09/6a280aeb6ca79.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/195317315/produsen-oli-edukasi-masyarakat-soal-merawat-mesin"
    },
    {
        "title": "Penjualan Mobil di Indonesia Tumbuh 14 Persen pada Mei 2026",
        "summary": "JAKARTA, KOMPAS.com - Gabungan Industri Kendaraan Bermotor Indonesia (Gaikindo) melaporkan penjualan kendaraan roda empat atau lebih di dalam negeri meningkat 14 persen pada Mei 2026 dibanding periode sama tahun sebelumnya. Dalam data yang dibagikan, tercatat jumlah distribusi dari pabrik ke diler alias wholesales pada periode dimaksud mencapai 69.219 unit. Naik dari tahun lalu yang mencapai 60.697 unit. Dari sisi penjualan ritel alias penyaluran kendaraan dari diler ke konsumen, naik 16,8 persen dari 61.546 unit menjadi 71.890 unit secara tahunan (year-on-year/yoy). Menandakan pasar otomotif nasional masih prospektif di tahun ini.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/nfWwu1HbwRltPfS0B1BeINKe6Ko=/0x0:1000x667/1200x800/data/photo/2017/11/17/1085149614.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/154100715/penjualan-mobil-di-indonesia-tumbuh-14-persen-pada-mei-2026"
    },
    {
        "title": "Hak Partisipasi 10 Persen untuk Daerah Masuk RUU Migas, Kesiapan BUMD Jadi Perhatian",
        "summary": "JAKARTA, KOMPAS.com - Kewajiban penawaran Participating Interest (PI) 10 persen kepada Badan Usaha Milik Daerah (BUMD) kembali mendapat perhatian setelah dimasukkan dalam draf Rancangan Undang-Undang (RUU) Minyak dan Gas Bumi (Migas) versi 3 Maret 2026 yang tengah dibahas DPR RI. Dalam draf tersebut, kontraktor diwajibkan menawarkan PI sebesar 10 persen kepada BUMD sejak rencana pengembangan lapangan migas disetujui. Hak partisipasi itu dapat diberikan dalam bentuk hibah, pembagian keuntungan, atau skema lainnya. \"Kontraktor wajib menawarkan participating interest sebesar 10 persen kepada BUMD sejak rencana pengembangan lapangan disetujui,\" demikian ketentuan dalam draf RUU Migas yang dibahas DPR, April 2026 lalu.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/4mwP_rzlPVof4FAlihjk-WNr_-0=/101x67:899x599/1200x800/data/photo/2018/11/16/22186272562.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/205724326/hak-partisipasi-10-persen-untuk-daerah-masuk-ruu-migas-kesiapan-bumd-jadi"
    },
    {
        "title": "Ramai Seruan Sell Indonesia, OJK: Jangan Telan Mentah-Mentah",
        "summary": "JAKARTA, KOMPAS.com - Otoritas Jasa Keuangan (OJK) mengimbau masyarakat untuk tidak menelan mentah-mentah seruan sell Indonesia yang belakangan ramai diperbincangkan di tengah gejolak pasar keuangan domestik. Ketua Dewan Komisioner OJK Friderica Widyasari Dewi mengatakan, masyarakat perlu tetap rasional dalam menyikapi berbagai informasi maupun ajakan yang beredar, terutama yang berkaitan dengan investasi. Terlebih, menurutnya, kondisi fundamental ekonomi Indonesia juga masih cukup baik sehingga masyarakat tidak perlu panik mencabut investasinya.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/hBEAYNE-yEb4ODlCFMPRMk367yg=/0x0:0x0/1200x800/data/photo/2026/06/09/6a27f4a452de3.jpeg",
        "link": "https://money.kompas.com/read/2026/06/09/200955626/ramai-seruan-sell-indonesia-ojk-jangan-telan-mentah-mentah"
    },
    {
        "title": "Program Prioritas Prabowo Butuh Anggaran Rp 1.896 Triliun pada 2027, Terbagi 8 Klaster",
        "summary": "JAKARTA, KOMPAS.com - Pemerintahan Presiden Prabowo Subianto menyiapkan anggaran jumbo hingga Rp 1.896 triliun untuk mendanai berbagai program prioritas nasional pada 2027. Dana tersebut akan digunakan untuk membiayai 60 program kerja yang tersebar dalam delapan klaster utama, mulai dari makan bergizi gratis (MBG), pembangunan 3 juta rumah, hingga proyek Giant Sea Wall. Menteri Keuangan Purbaya Yudhi Sadewa mengatakan, kebutuhan pendanaan program prioritas nasional (PKPN) telah diperhitungkan dalam penyusunan Kerangka Ekonomi Makro dan Pokok-Pokok Kebijakan Fiskal (KEM-PPKF) 2027.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/sOaw-rTn-WGu5ZuIDCM68f4gJDY=/0x0:0x0/1200x800/data/photo/2026/06/04/6a210d7e6ac7c.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/184034526/program-prioritas-prabowo-butuh-anggaran-rp-1896-triliun-pada-2027-terbagi-8"
    },
    {
        "title": "Perawatan Benar, Baterai Motor Listrik Bisa Awet Sampai 5 Tahun",
        "summary": "JAKARTA, KOMPAS.com – Populasi sepeda motor listrik di Indonesia terus mengalami peningkatan. Meski menawarkan efisiensi tinggi dan bebas emisi, pemilik kendaraan roda dua ramah lingkungan ini tetap wajib memahami pola perawatan komponen utamanya, terutama sektor baterai. Baterai bisa dibilang sebagai \"jantung\" dari motor listrik. Komponen ini tidak hanya krusial untuk performa, tetapi juga menjadi komponen dengan nilai investasi paling tinggi jika terjadi kerusakan. Oleh karena itu, menjaga kesehatannya adalah harga mati bagi pemilik motor listrik. Mohamad Rifki Robani, punggawa bengkel spesialis motor listrik STB EV, mengatakan, perawatan komponen motor listrik yang paling utama adalah baterainya.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/2Fcozn_u-lXLuG5Fgtw0v1zEyqY=/0x0:1200x800/1200x800/data/photo/2026/06/07/6a24edc90c317.jpg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/162100115/perawatan-benar-baterai-motor-listrik-bisa-awet-sampai-5-tahun"
    },
    {
        "title": "Industri Kripto Perkuat Literasi Lewat Kolaborasi dengan Kampus",
        "summary": "JAKARTA, KOMPAS.com - Literasi aset kripto dinilai menjadi salah satu fondasi penting dalam mendukung pertumbuhan industri aset keuangan digital di Indonesia. Karena itu, bursa kripto PT Central Finansial X (CFX) memperluas upaya edukasi melalui kerja sama dengan sejumlah perguruan tinggi di Tanah Air. Komitmen tersebut ditandai dengan penandatanganan nota kesepahaman (MoU) antara CFX dengan Universitas Indonesia (UI), Universitas Gadjah Mada (UGM), dan Politeknik Keuangan Negara STAN dalam rangkaian puncak CFX Crypto Conference (CCC) 2026.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/VKZjXWxPZSGKFI2r_Zq-CyPzH0E=/0x0:1920x1280/1200x800/data/photo/2026/02/04/69830c1c92ae3.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/191618526/industri-kripto-perkuat-literasi-lewat-kolaborasi-dengan-kampus"
    },
    {
        "title": "Pemerintah Putuskan Bantuan Pangan Ditambah 3 Bulan",
        "summary": "JAKARTA, KOMPAS.com - Pemerintah memutuskan menambah program Bantuan Pangan (Banpang) pada 2026 sebanyak tiga bulan. Pemerintah sebelumnya menetapkan Bantuan Pangan digelontorkan dalam dua bulan yang disalurkan dalam kurun Februari hingga Juni. Menteri Koordinator Bidang Pangan Zulkifli Hasan (Zulhas) mengatakan, Bantuan Pangan ditambah mengingat Indonesia memasuki musim kemarau.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/328rchYu9jFcaXcyGiZZirkcaMM=/0x0:0x0/1200x800/data/photo/2026/06/09/6a2814f73c770.jpeg",
        "link": "https://money.kompas.com/read/2026/06/09/211502326/pemerintah-putuskan-bantuan-pangan-ditambah-3-bulan"
    },
    {
        "title": "BI Proyeksikan Rupiah Menguat Rp 16.800 pada 2027, Ini 5 Faktor Pendorongnya",
        "summary": "JAKARTA, KOMPAS.com - Gubernur Bank Indonesia (BI) Perry Warjiyo optimis nilai tukar rupiah akan menguat pada 2027 dan bergerak pada kisaran Rp 16.800 hingga Rp 17.500 per dollar AS. Proyeksi tersebut sejalan dengan asumsi makro ekonomi yang telah ditetapkan pemerintah dalam Kerangka Ekonomi Makro dan Pokok-Pokok Kebijakan Fiskal (KEM PPKF) 2027. \"Mengenai nilai tukar, kami memandang 2027 nilai tukar akan menguat. Rupiah kisarannya sama dengan pemerintah Rp 16.800 sampai Rp 17.500,\" kata Perry dalam rapat kerja dengan Badan Anggaran DPR RI, Selasa (9/6/2026).",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/niGv7PtLEaaOuOQ0vyTgWtN4A8E=/0x0:0x0/1200x800/data/photo/2026/05/18/6a0af8f0ad922.jpg",
        "link": "https://money.kompas.com/read/2026/06/09/193120826/bi-proyeksikan-rupiah-menguat-rp-16800-pada-2027-ini-5-faktor-pendorongnya"
    },
    {
        "title": "Veda Ega Pratama Sebut Sulit Taklukan Sirkuit di Hungaria",
        "summary": "BALATON PARK, KOMPAS.com – Pebalap Honda Team Asia, Veda Ega Pratama, mengakhiri balapan Moto3 Hungaria 2026 di posisi ke-16, pada Minggu (7/6/2026). Hasil tersebut membuat pebalap muda Indonesia itu gagal meraih poin meski sempat menunjukkan kecepatan yang menjanjikan sepanjang akhir pekan. Balapan yang berlangsung di Sirkuit Balaton Park menjadi tantangan tersendiri bagi Veda. Selain harus beradaptasi dengan karakter lintasan yang baru pertama kali ia jajal.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/XzKuxLNHPSR70C-rCshr7bjugNo=/109x0:1121x675/1200x800/data/photo/2026/05/10/6a0056dbc8a5f.jpeg",
        "link": "https://otomotif.kompas.com/read/2026/06/09/164100315/veda-ega-pratama-sebut-sulit-taklukan-sirkuit-di-hungaria"
    },
    {
        "title": "Bulog Usul “Beras Kita Premium” untuk Kendalikan Harga",
        "summary": "JAKARTA, KOMPAS.com- Perum Bulog mengusulkan program Beras Kita Premium untuk mengendalikan kenaikan harga beras premium di pasar. Usulan tersebut disampaikan Direktur Perum Bulog Ahmad Rizal Ramdhani dalam Rapat Koordinasi Terbatas di Kementerian Koordinator Bidang Pangan, Jakarta, Selasa (9/6/2026). “Jadi kan beras premium kan lagi agak naik harganya. Supaya menstabilisasi beras premium, ‘Beras Kita Premium’ harus ada,” kata Rizal saat ditemui di Kantor Kemenko Pangan, Jakarta, Selasa.",
        "source": "kompas",
        "thumbnails": "https://asset.kompas.com/crops/328rchYu9jFcaXcyGiZZirkcaMM=/0x0:0x0/1200x800/data/photo/2026/06/09/6a2814f73c770.jpeg",
        "link": "https://money.kompas.com/read/2026/06/09/213133226/bulog-usul-beras-kita-premium-untuk-kendalikan-harga"
    }
];

store_data(dataBerita3);