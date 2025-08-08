import React from 'react';
import Navbar from './Navbar';
import { Head, Link } from '@inertiajs/react';
import MiniNavbar from './MiniNavbar';
import Footer from './Footer';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Homepage(props) {
  const [showCekForm, setShowCekForm] = useState(false);
  const [noTiket, setNoTiket] = useState('');
  return (
    <div
      data-theme="light"
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        backgroundPosition: 'center',
      }}
    >
      <Head title={props.title} /> 
      {/* Navbar tetap */}
      <div className="fixed top-0 left-0 w-full z-50">
        <MiniNavbar />
        <Navbar />
      </div>

      {/* Carousel */}
      <div className="pt-24 pb-32">
     

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-start pt-40 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-6 tracking-wide leading-relaxed">
            Pelayanan Terpadu Satu Pintu <br /> INSTITUT MPU KUTURAN
          </h1>

          {/* Tombol sejajar */}
          <div className="flex gap-4 flex-wrap justify-center mb-4">
            
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn btn-outline btn-primary px-6 py-3 rounded-xl text-lg transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-2">
                  <path fillRule="evenodd" d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                </svg>
                <span>Mulai Layanan</span>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56">
                <li><Link href={route('layanan')}data={{ kategori: 'mahasiswa' }} method="post">Mahasiswa</Link></li>
                <li><Link method="get">Alumni</Link></li>
                <li><Link  method="get">Dosen / Pegawai</Link></li>
                <li><Link  method="get">Masyarakat Umum</Link></li>
              </ul>
            </div>

         <button 
  onClick={() => setShowCekForm(true)}
  className="btn btn-outline btn-secondary px-6 py-3 rounded-xl text-lg transition duration-300"
>


              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path d="M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z" />
  <path fillRule="evenodd" d="M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" clipRule="evenodd" />
</svg>

             <span> Cek Pengajuan</span>
            </button>
          </div>
     

        </div>
      </div>

      {/* Konten utama */}
      <div className="px-4 sm:px-6 md:px-12">
        {/* Dua Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
          {/* Kolom Kiri */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/PUlz5IbwoeM?si=gH1n6F624Mv734r4"
                title="YouTube video player"
                className="w-full h-full rounded"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Selamat Datang di Laman PTSP IMK</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Sesuai amanat Undang-Undang (UU) Nomor: 14 Tahun 2008 tentang Keterbukaan Informasi Publik (KIP), Institut Mpu Kuturan (IMK) sebagai badan publik berupaya memenuhi kebutuhan publik akan informasi dengan membuat laman ptsp.imk.ac.id.
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Situs PTSP dirancang untuk mempermudah akses ke berbagai dokumen atau informasi yang tersedia, yang kami susun di laman Daftar Informasi Publik, dan telah dikelompokkan berdasarkan kategori-kategori yang sesuai, sehingga diharapkan mempermudah publik untuk mengaksesnya. Apabila membutuhkan layanan informasi, masyarakat juga dapat mengajukan permohonan sesuai prosedur dan ketentuan yang berlaku.
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
              console.error(error);
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


      {/* Footer */}
      <Footer />
    </div>
  );
}
