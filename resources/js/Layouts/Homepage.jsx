import React from 'react';

import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import MiniNavbar from '@/Layouts/MiniNavbar';

export default function Homepage({children}) {
 
  return (
    <div
      data-theme=""
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        backgroundPosition: 'center',
      }}
    >
      <Head  /> 
                  <title>PTSP IMK - Pelayanan Terpadu Satu Pintu</title>
              <meta
                name="description"
                content="PTSP (Pelayanan Terpadu Satu Pintu) IMK mempermudah mahasiswa, alumni, dosen/pegawai, dan masyarakat umum dalam mengakses layanan administrasi secara cepat dan transparan."
              />
              <meta
                name="keywords"
                content="PTSP IMK, layanan mahasiswa, layanan alumni, pelayanan administrasi, Institut Mpu Kuturan"
              />
              <meta property="og:title" content="PTSP IMK - Layanan Administrasi" />
              <meta
                property="og:description"
                content="Akses layanan administrasi dengan mudah melalui PTSP Institut Mpu Kuturan Singaraja."
              />
              <meta property="og:image" content="/images/logoIMK.png" />
              <meta property="og:type" content="website" />
      {/* Navbar tetap */}
      <div className="fixed top-0 left-0 w-full z-50">
        <MiniNavbar />
        <Navbar />
      </div>
       <main >
        {children}
      </main>
      

      {/* Footer */}
      <Footer />
    </div>
  );
}
