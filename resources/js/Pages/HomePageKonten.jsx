import React, { useEffect, useRef } from "react";
import { router,usePage } from '@inertiajs/react';
import { Head, Link } from "@inertiajs/react";
import axios from 'axios';

import { useState } from "react";
import Homepage from "@/Layouts/Homepage";

export default function HomePageKonten() {
    const [showCekForm, setShowCekForm] = useState(false);
    const [noTiket, setNoTiket] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = useRef(null);
//whatsapp helpdesk
     const [open, setOpen] = useState(false);
 //FAQ    
    const faqs = [
      {
    question: "Apa itu PADURAKSA?",
    answer: "PADURAKSA (Pelayanan Terpadu, Ramah, Berkualitas, dan Andal) adalah sistem layanan daring yang disediakan oleh Institut Mpu Kuturan untuk mempermudah mahasiswa, alumni, dosen/pegawai, dan masyarakat umum dalam mengakses berbagai layanan administrasi dan informasi secara cepat, efisien, dan transparan.",
},
{
    question: "Siapa saja yang dapat menggunakan layanan PADURAKSA?",
    answer: "Layanan PADURAKSA dapat diakses oleh: Mahasiswa aktif, Alumni, Dosen dan pegawai, serta Masyarakat umum yang memerlukan informasi atau layanan tertentu dari Institut Mpu Kuturan.",
},
{
    question: "Bagaimana cara mengajukan layanan di PADURAKSA?",
    answer: "Pengguna dapat mengakses laman resmi paduraksa.imk.ac.id, memilih jenis layanan, melengkapi formulir, mengunggah dokumen pendukung, lalu mengirim permohonan dan menunggu konfirmasi dari petugas.",
},
{
    question: "Apakah semua layanan di PADURAKSA gratis?",
    answer: "Semua pelayanan pada PADURAKSA bersifat gratis, apabila ada oknum yang meminta biaya, silakan lapor ke petugas.",
},
{
    question: "Berapa lama waktu proses layanan di PADURAKSA?",
    answer: "Waktu proses layanan bervariasi tergantung jenis layanan yang diajukan.",
},
{
    question: "Bagaimana cara memantau status permohonan di PADURAKSA?",
    answer: "Pengguna dapat memeriksa status permohonan melalui fitur 'Cek Pengajuan' di laman PADURAKSA dengan memasukkan nomor tiket atau kode unik yang diberikan.",
},
{
    question: "Bagaimana jika saya mengalami kendala saat menggunakan PADURAKSA?",
    answer: "Silakan menghubungi Helpdesk PADURAKSA melalui email paduraksa@imk.ac.id, WhatsApp resmi, atau formulir kontak di laman PADURAKSA.",
},


    ];
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 } // 20% terlihat di layar
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

const { isLibur, liburReason } = usePage().props;
const [showLiburModal, setShowLiburModal] = useState(false);

// cek langsung saat komponen mount
useEffect(() => {
    if (isLibur) {
        setShowLiburModal(true);
    }
}, [isLibur]);

 
 const handleMulaiLayanan = (kategori) => {
 if (isLibur) {
 setShowLiburModal(true);
 return;
 }
 
 router.post(route("layanan"), { kategori });
 };
 



    return (
        <Homepage>
            {/* Carousel */}
            <div className=" md:pb-32 sm:pb-10 md:pt-10 sm:pt-20">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-start pt-40 px-4">
                    <img
                        src="/images/LogoIMK.png"
                        alt="Logo Institut Mpu Kuturan"
                        className="w-[7.5rem]"
                    />
                    <h1 className="text-2xl md:pt-5  sm:text-3xl md:text-5xl font-extrabold text-center text-gold-700  tracking-wide leading-relaxed">
                       PADURAKSA
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500 text-center mb-8">
                      "Pelayanan Terpadu Ramah, Berkualitas, dan Andal"
                      </p>
                    {/* Tombol sejajar */}
                    <div className="flex gap-4 flex-wrap justify-center mb-4">
                        {/* Dropdown */}
                        <div className="dropdown dropdown-bottom">
    <div
        tabIndex={0}
        role="button"
        className="btn btn-primary flex items-center gap-1
            px-4 py-2 text-sm
            sm:px-5 sm:py-2.5 sm:text-base
            md:px-6 md:py-3 md:text-lg
            rounded-xl transition duration-300"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 sm:w-4 sm:h-4 md:w-4 md:h-4"
        >
            <path
                fillRule="evenodd"
                d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
        <span className="whitespace-nowrap sm:block text-xs sm:text-sm md:text-base">Mulai Layanan</span>
    </div>

    <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44 sm:w-56"
    >
       <li>
  <button
      type="button"
      onClick={() => handleMulaiLayanan("mahasiswa")}
  >
      Mahasiswa
  </button>
</li>
<li>
  <button
      type="button"
      onClick={() => handleMulaiLayanan("alumni")}
  >
      Alumni
  </button>
</li>

    </ul>
</div>


                        {/* Cek Pengajuan */}
                        <button
                            onClick={() => setShowCekForm(true)}
                            className="btn  btn-secondary
               px-4 py-2 text-sm
               sm:px-5 sm:py-2.5 sm:text-base
               md:px-6 md:py-3 md:text-lg
               rounded-xl transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-5 h-5 sm:w-4 sm:h-4 md:w-4 md:h-4 mr-2"
                            >
                                <path d="M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z" />
                                <path
                                    fillRule="evenodd"
                                    d="M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Cek Status</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Konten utama */}
            <div className="px-4 sm:px-6 md:px-12 ">
                {/* Dua Kolom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 items-center">
  {/* Kolom Kiri */}
  <div className=" md:flex justify-center">
    <img 
  src="images/siluanglaptop.png" 
  alt="Siluang"
  className="max-w-[120px] sm:max-w-[200px] md:max-w-[400px] h-auto object-contain mx-auto"
/>

  </div>

  {/* Kolom Kanan */}
  <div className="p-4 sm:p-6 rounded-xl">
    <h2 className="text-xl font-semibold mb-4 text-yellow-500">
      Transformasi Layanan Publik
    </h2>
    <p className="text-gray-600 mb-4 text-sm sm:text-base">
      Sejalan dengan amanat Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik, 
      Institut Mpu Kuturan (IMK) berkomitmen memberikan layanan yang profesional, 
      transparan, dan akuntabel. 
      Wujud komitmen ini diwujudkan melalui pengembangan 
      <span className="font-semibold"> PADURAKSA (Pelayanan Terpadu, Ramah, Berkualitas, dan Andal)</span>.
    </p>
    <p className="text-gray-600 text-sm sm:text-base">
      PADURAKSA dirancang untuk memudahkan akses layanan. 
      Melalui platform ini, berbagai layanan administrasi akademik maupun umum 
      dapat diakses secara cepat, mudah, dan transparan. 
      Jika membutuhkan informasi lebih lanjut, 
      pengguna dapat mengajukan permohonan sesuai dengan prosedur yang berlaku.
    </p>
  </div>
</div>


                {/* Tahapan Permohonan */}
                <div className=" py-12 px-4 sm:px-6 md:px-12 rounded-xl">
                    <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
                        Tahapan Permohonan
                    </h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
                        Kini permohonan informasi dapat Anda lakukan di mana pun
                        melalui layanan PTSP IMK.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        {/* Step 1 */}
                        <div className="bg-amber-400 text-yellow-900 rounded-xl p-6 max-w-sm w-full text-center shadow">
                            <div className="bg-yellow-200 text-yellow-800 rounded w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                                1
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Mulai Layanan
                            </h3>
                            <p className="text-sm">
                                Silahkan pilih tujuan permohonan layanan pada
                                tautan yang disediakan.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-amber-400 text-yellow-900 rounded-xl p-6 max-w-sm w-full text-center shadow">
                            <div className="bg-yellow-200 text-yellow-800 rounded w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                                2
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Pengisian Data Pemohon
                            </h3>
                            <p className="text-sm">
                                Melengkapi data identitas pemohon dan pendukung
                                informasi lainnya oleh pemohon.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-amber-400 text-yellow-900 rounded-xl p-6 max-w-sm w-full text-center shadow">
                            <div className="bg-yellow-200 text-yellow-800 rounded w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                                3
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Penerimaan Layanan
                            </h3>
                            <p className="text-sm">
                                Silahkan tunggu balasan dari Email
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showCekForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-base-100 p-6 rounded-xl shadow-md w-full max-w-md relative">
                        <button
                            onClick={() => setShowCekForm(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-bold mb-4">
                            Cek Status Pengajuan
                        </h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();

                                try {
                                    const formData = new FormData();
                                    formData.append("tiket", noTiket);

                                    const response = await axios.post(
                                        "cekTiket",
                                        formData,
                                        {
                                            headers: {
                                                "Content-Type":
                                                    "multipart/form-data",
                                            },
                                        }
                                    );

                                    // ✅ Redirect ke halaman detail tiket
                                    window.location.href = `/cekTiket/${response.data.tiket.no_tiket}`;
                                } catch (error) {
                                    if (error.response?.status === 422) {
                                        alert(
                                            "Validasi gagal:\n" +
                                                JSON.stringify(
                                                    error.response.data.errors
                                                )
                                        );
                                    } else {
                                        alert(
                                            "Tiket tidak ditemukan atau terjadi kesalahan."
                                        );
                                        //console.error(error);
                                    }
                                }
                            }}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="text"
                                value={noTiket}
                                onChange={(e) => setNoTiket(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Masukkan Nomor Tiket"
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCekForm(false)}
                                    className="btn btn-ghost"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
           <div className="py-12 px-4 sm:px-6 md:px-12 rounded-xl">
  <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
    Hasil Survey Kepuasan Pengguna
  </h2>

  <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
    Berdasarkan hasil survey kepuasan pengguna layanan PADURAKSA Tahun 2025.
  </p>

  {/* GRID TESTIMONI */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    
    {[1,2,3,4].map((item) => (
      <div key={item} className="bg-white ">
        <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
          <img
            src={`/images/feedback${item}.PNG`}
            alt={`Testimoni ${item}`}
            className="max-h-full max-w-full "
          />
        </div>
      </div>
    ))}

  </div>

  {/* DOWNLOAD LAPORAN */}
  <div className="text-center">
    <p className="text-gray-700 mb-4 text-sm sm:text-base">
      Unduh laporan lengkap hasil survey kepuasan pengguna PADURAKSA Tahun 2025
    </p>

   <a
  href="/files/surveykepuasan2025.pdf"
  download
  className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" />
  </svg>

  <span className="tracking-wide">
    Download Laporan Survey
  </span>
</a>
  </div>
</div>   


            <div className="py-12 px-4 sm:px-6 md:px-12 rounded-xl">
                <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
                    F A Q
                </h2>
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-500">
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                        >
                            <span className="font-medium text-gray-500">
                                {faq.question}
                            </span>
                            <svg
                                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                                    openIndex === index ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="pb-4 text-gray-500">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
           <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2
                   bg-green-500 hover:bg-green-600 text-white
                   px-4 py-3 rounded-full shadow-lg
                   transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12.04 2C6.55 2 2.07 6.48 2.07 11.97c0 1.93.5 3.82 1.45 5.5L2 22l4.67-1.47a9.9 9.9 0 005.37 1.55h.01c5.49 0 9.97-4.48 9.97-9.97C22 6.48 17.53 2 12.04 2zm5.8 14.25c-.24.68-1.18 1.26-1.93 1.41-.51.1-1.18.18-3.41-.73-2.85-1.15-4.7-4-4.84-4.19-.14-.19-1.16-1.55-1.16-2.96 0-1.41.73-2.1.99-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.57.82 2 .89 2.15.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.3.38-.43.51-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.89 1.05.93 1.94 1.22 2.22 1.36.28.14.45.12.62-.07.17-.19.71-.82.9-1.1.19-.28.38-.24.64-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z"/>
        </svg>
        <span className="hidden sm:block text-sm font-medium">
          Helpdesk
        </span>
      </button>
    {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
      
      {/* Close */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
      >
        ✕
      </button>

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Hubungi Helpdesk
        </h2>
        <p className="text-sm text-gray-500">
          Pilih admin yang ingin Anda hubungi
        </p>
      </div>

      {/* List CS */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* CS Layanan */}
        <a
          href="https://wa.me/6285954551272?text=Om%20Swastyastu%20Helpdesk%20Layanan%20PADURAKSA,%20saya%20butuh%20bantuan."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-gray-50 hover:bg-green-50 p-4 rounded-xl transition shadow-sm hover:shadow-md"
        >
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="CS Layanan"
              className="w-14 h-14 rounded-full object-cover mb-2"
            />
            <span className="absolute bottom-2 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <span className="text-sm font-medium text-gray-700">
            Layanan
          </span>
          <span className="text-xs text-gray-400">
            Dian Suciari
          </span>
        </a>

        {/* CS Sistem */}
        <a
          href="https://wa.me/6287861000090?text=Om%20Swastyastu%20Helpdesk%20PADURAKSA,%20saya%20butuh%20bantuan."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-gray-50 hover:bg-green-50 p-4 rounded-xl transition shadow-sm hover:shadow-md"
        >
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="CS Sistem"
              className="w-14 h-14 rounded-full object-cover mb-2"
            />
            <span className="absolute bottom-2 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <span className="text-sm font-medium text-gray-700">
            Sistem
          </span>
          <span className="text-xs text-gray-400">
            Edy Wardana
          </span>
        </a>

      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Jam operasional: 08.00 - 16.00
        </p>
      </div>

    </div>
  </div>
)}
{showLiburModal && (
  <dialog className="modal modal-open backdrop-blur-sm">
    <div className="modal-box text-center rounded-3xl shadow-xl bg-base-100">
      
      {/* Icon */}
     <div className="text-5xl mb-2">🦥</div>


      <h3 className="font-bold text-xl text-error">
        Layanan Lagi Rehat Dulu
      </h3>

      <p className="py-4 text-gray-600 leading-relaxed">
        Pergi ke pasar beli pepaya 🍉  
        <br />
        PADURAKSA lagi istirahat sejenak ya~
        {liburReason && (
          <>
            <br />
            <span className="italic text-sm">
              (bukan ngambek kok, cuma {liburReason} aja 😌)
            </span>
          </>
        )}
      </p>

      <p className="text-sm text-gray-500">
        Tenang… habis rehat kami balik lagi dengan semangat baru ✨
      </p>

      <div className="modal-action justify-center mt-6">
        <button
          className="btn btn-primary rounded-full px-8 shadow-md hover:scale-105 transition"
          onClick={() => setShowLiburModal(false)}
        >
          Okeee 💕
        </button>
      </div>
    </div>
  </dialog>
)}


        </Homepage>
    );
}
