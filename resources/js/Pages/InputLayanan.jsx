import Footer from "./Footer";
import MiniNavbar from "./MiniNavbar";
import Navbar from "./Navbar";
import { useState, useEffect} from "react";
import Umum from "./Umum";
import Mahasiswa from "./Mahasiswa";
import Alumni from "./Alumni";
import { usePage } from '@inertiajs/react';


export default function InputLayanan() {
 
const { props } = usePage();
  const kategori = props.kategori;








  return (
    <div data-theme="light" className="min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <MiniNavbar />
        <Navbar />
      </div>

      {/* Konten utama */}
     
       {kategori === 'mahasiswa' && <Mahasiswa/>}
       {kategori === 'alumni' && <Alumni/>}
      
       
      {/* Footer */}
      <Footer />
    </div>
  );
}
