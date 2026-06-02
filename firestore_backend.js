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
    const collectionRef = db.collection('artikel_berita');

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

store_data(dataBerita);