import React from 'react';

export default function Footer() {
  return (
    <div data-theme="dark">
    <footer className=" py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Kolom 1 */}
        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-2">Tentang</h3>
          <p className="text-gray-400 text-sm">
            PTSP IAHN Mpu Kuturan merupakan layanan satu pintu untuk kebutuhan administrasi akademik dan umum.
          </p>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-2">Kontak</h3>
          <p className="text-gray-400 text-sm">Jl. Pulau Menjangan No 27 Banyuning, Singaraja</p>
          <p className="text-gray-400 text-sm">Email: ptsp@mpukuturan.ac.id</p>
          <p className="text-gray-400 text-sm">Telepon: (0362) 21289</p>
        </div>

        {/* Kolom 3 */}
        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-2">Tautan Cepat</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li><a href="#" className="hover:underline">IMK</a></li>
            <li><a href="#" className="hover:underline">Penerimaan Mahasiswa Baru</a></li>
            <li><a href="#" className="hover:underline">SISKA</a></li>
            <li><a href="#" className="hover:underline">JDIH</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} PTSP. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
