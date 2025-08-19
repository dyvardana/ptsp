import React, { useEffect, useRef } from 'react';

import { Head, Link } from '@inertiajs/react';

import { useState } from 'react';
import Homepage from '@/Layouts/Homepage';

export default function HomePageKonten(){
     const [showCekForm, setShowCekForm] = useState(false);
  const [noTiket, setNoTiket] = useState('');
    const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
const faqs = [
  {
    question: "Apa itu PTSP IMK?",
    answer:
      "PTSP (Pelayanan Terpadu Satu Pintu) IMK adalah sistem layanan daring yang disediakan oleh Institut Mpu Kuturan untuk mempermudah mahasiswa, alumni, dosen/pegawai, dan masyarakat umum dalam mengakses berbagai layanan administrasi dan informasi secara cepat dan transparan.",
  },
  {
    question: "Siapa saja yang dapat menggunakan layanan PTSP?",
    answer:
      "Layanan PTSP IMK dapat diakses oleh: Mahasiswa aktif, Alumni, Dosen dan pegawai, serta Masyarakat umum yang memerlukan informasi atau layanan tertentu dari IMK.",
  },
  {
    question: "Bagaimana cara mengajukan layanan di PTSP IMK?",
    answer:
      "Pengguna dapat mengakses laman resmi ptsp.imk.ac.id, memilih jenis layanan, melengkapi formulir, mengunggah dokumen pendukung, lalu mengirim permohonan dan menunggu konfirmasi dari petugas.",
  },
  {
    question: "Apakah semua layanan PTSP gratis?",
    answer:
      "Sebagian besar layanan PTSP tidak dikenakan biaya. Namun, terdapat beberapa layanan tertentu yang mungkin memiliki biaya administrasi sesuai dengan peraturan yang berlaku di Institut Mpu Kuturan.",
  },
  {
    question: "Berapa lama waktu proses layanan?",
    answer:
      "Waktu proses layanan bervariasi tergantung jenis layanan yang diajukan. ",
  },
  {
    question: "Bagaimana cara memantau status permohonan?",
    answer:
      "Pengguna dapat memeriksa status permohonan melalui fitur 'Cek Pengajuan' di laman PTSP dengan memasukkan nomor tiket atau kode unik yang diberikan.",
  },
  {
    question: "Bagaimana jika saya mengalami kendala saat menggunakan PTSP?",
    answer:
      "Silakan menghubungi Helpdesk PTSP IMK melalui email ptsp@imk.ac.id, WhatsApp resmi, atau formulir kontak di laman PTSP.",
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

    return(
      
        <Homepage>

                  {/* Carousel */}
                  <div className=" md:pb-32 sm:pb-10 md:pt-10 sm:pt-20">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-start pt-40 px-4">
                      <img src="/images/logoIMK.png" alt="Logo Institut Mpu Kuturan" className="w-[7.5rem]" />
                      <h1 className="text-2xl md:pt-5 sm:text-3xl md:text-5xl font-extrabold text-center text-gold-700 mb-6 tracking-wide leading-relaxed">
                          Layanan Terpadu Satu Pintu 
                          
                        </h1>
                      
            
                      {/* Tombol sejajar */}
 <div className="flex gap-4 flex-wrap justify-center mb-4">
  {/* Dropdown */}
  <div className="dropdown dropdown-bottom">
    <div
      tabIndex={0}
      role="button"
      className="btn btn-outline btn-primary 
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
        <path
          fillRule="evenodd"
          d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
      <span>Mulai Layanan</span>
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56"
    >
      <li>
        <Link href={route("layanan")} data={{ kategori: "mahasiswa" }} method="post">
          Mahasiswa
        </Link>
      </li>
      <li>
        <Link href={route("layanan")} data={{ kategori: "alumni" }} method="post">
          Alumni
        </Link>
      </li>
    </ul>
  </div>

  {/* Cek Pengajuan */}
  <button
    onClick={() => setShowCekForm(true)}
    className="btn btn-outline btn-secondary
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
    <span>Cek Pengajuan</span>
  </button>
</div>
                    </div>
                  </div>
            
                  {/* Konten utama */}
                  <div className="px-4 sm:px-6 md:px-12 ">
                    {/* Dua Kolom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                      {/* Kolom Kiri */}
                      <div
                          ref={videoRef}
                          className=" p-4 sm:p-6 rounded-xl "
                        >
                          <div className="aspect-video w-full rounded overflow-hidden">
                            {isVisible ? (
                              <iframe
                                src="https://www.youtube.com/embed/PUlz5IbwoeM?autoplay=1&mute=1"
                                title="YouTube Mpu Kuturan"
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : (
                              <img
                                src="https://img.youtube.com/vi/PUlz5IbwoeM/hqdefault.jpg"
                                alt="Video Institut Mpu Kuturan"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </div>
            
                      {/* Kolom Kanan */}
                      <div className=" p-4 sm:p-6 rounded-xl ">
                        <h2 className="text-xl font-semibold mb-4 text-purple-800">Selamat Datang di Laman PTSP IMK</h2>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                          Sejalan dengan amanat Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik, Institut Mpu Kuturan (IMK) sebagai badan publik berkomitmen untuk memberikan pelayanan yang optimal guna memenuhi kebutuhan masyarakat. Wujud komitmen tersebut diwujudkan melalui pengembangan laman layanan terpadu di ptsp.imk.ac.id.
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Situs PTSP ini dirancang untuk memberikan kemudahan akses bagi mahasiswa, alumni, dosen/pegawai, serta masyarakat umum. Melalui platform ini, publik dapat mengakses berbagai layanan secara cepat, praktis, dan transparan. Apabila memerlukan layanan informasi lebih lanjut, masyarakat juga dapat mengajukan permohonan sesuai prosedur dan ketentuan yang berlaku.
                        </p>
                      </div>
                    </div>
            
                    {/* Tahapan Permohonan */}
                    <div className=" py-12 px-4 sm:px-6 md:px-12 rounded-xl">
                      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Tahapan Permohonan</h2>
                      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
                        Kini permohonan informasi dapat Anda lakukan di mana pun melalui layanan PTSP IMK.
                      </p>
            
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        {/* Step 1 */}
                        <div className="bg-amber-400 text-yellow-900 rounded-xl p-6 max-w-sm w-full text-center shadow">
                          <div className="bg-yellow-200 text-yellow-800 rounded w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                            1
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Pengajuan Layanan</h3>
                          <p className="text-sm">
                            Silahkan pilih tujuan permohonan layanan pada tautan yang disediakan.
                          </p>
                        </div>
            
                        {/* Step 2 */}
                        <div className="bg-amber-400 text-yellow-900 rounded-xl p-6 max-w-sm w-full text-center shadow">
                          <div className="bg-yellow-200 text-yellow-800 rounded w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                            2
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Pengisian Data Pemohon</h3>
                          <p className="text-sm">
                            Melengkapi data identitas pemohon dan pendukung informasi lainnya oleh pemohon.
                          </p>
                        </div>
            
                        {/* Step 3 */}
                        <div className="bg-amber-400 text-yellow-900 rounded-xl p-6 max-w-sm w-full text-center shadow">
                          <div className="bg-yellow-200 text-yellow-800 rounded w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                            3
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Penerimaan Layanan</h3>
                          <p className="text-sm">
                            Silahkan tunggu balasan dari Petugas melalui notifikasi email dan WA pemohon.
                          </p>
                        </div>
                      </div>
            
                    </div>
                  </div>
            {showCekForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
                  <button
                    onClick={() => setShowCekForm(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                  <h2 className="text-lg font-bold mb-4">Cek Status Pengajuan</h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
            
                      try {
                        const formData = new FormData();
                        formData.append("tiket", noTiket);
            
                        const response = await axios.post("cekTiket", formData, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        });
            
                        // ✅ Redirect ke halaman detail tiket
                        window.location.href = `/cekTiket/${response.data.tiket.no_tiket}`;
                      } catch (error) {
                        if (error.response?.status === 422) {
                          alert("Validasi gagal:\n" + JSON.stringify(error.response.data.errors));
                        } else {
                          alert("Tiket tidak ditemukan atau terjadi kesalahan.");
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
                      <button type="submit" className="btn btn-primary">
                        Cari
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="py-12 px-4 sm:px-6 md:px-12 rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        F A Q
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            onClick={() => toggleFaq(index)}
            className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
          >
            <span className="font-medium text-gray-700">{faq.question}</span>
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
            <div className="pb-4 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
        </Homepage>
    )
}