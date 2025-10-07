import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import MiniNavbar from "@/Layouts/MiniNavbar";

export default function Homepage({ children }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cek kapan terakhir kali modal ditampilkan
    const lastShown = localStorage.getItem("lastModalDate");
    const today = new Date().toDateString(); // contoh: "Tue Sep 17 2025"

    if (lastShown !== today) {
      // Belum pernah ditampilkan hari ini → tampilkan modal
      setShowModal(true);
      localStorage.setItem("lastModalDate", today);
    }
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(217, 217, 216, 1) 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
        backgroundPosition: "center",
      }}
    >
      <Head>
        <title>PTSP IMK - Pelayanan Terpadu Satu Pintu</title>
        <meta
          name="description"
          content="PTSP IMK mempermudah mahasiswa, alumni, dosen/pegawai, dan masyarakat umum dalam mengakses layanan administrasi."
        />
      </Head>

      {/* Navbar tetap */}
      <div className="fixed top-0 left-0 w-full z-50">
        <MiniNavbar />
        <Navbar />
      </div>

      <main>{children}</main>

      {/* Footer */}
      <Footer />

      {/* Modal Popup Gambar */}
     {showModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div className="relative bg-white rounded-lg shadow-lg p-2 w-60 text-center">
      {/* Tombol silang pojok kanan atas */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-1 right-1 text-gray-600 hover:text-red-500 text-sm"
      >
        ✕
      </button>

      <img
        src="/images/popup.webp"
        alt="Promo"
        className="w-full h-auto rounded-md mb-2"
      />

      <button
        onClick={() => setShowModal(false)}
        className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 text-xs"
      >
        Tutup
      </button>
    </div>
  </div>
)}

    </div>
  );
}
