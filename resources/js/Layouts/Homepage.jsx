import React from 'react';

import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import MiniNavbar from '@/Layouts/MiniNavbar';

export default function Homepage({children}) {
 
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
      <Head  /> 
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
