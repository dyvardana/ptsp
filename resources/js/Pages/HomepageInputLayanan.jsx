
import Mahasiswa from "./Komponen/Mahasiswa";
import Alumni from "./Komponen/Alumni";
import { usePage } from '@inertiajs/react';
import Homepage from "@/Layouts/Homepage";


export default function HomepageInputLayanan() {
 
const { props } = usePage();
  const kategori = props.kategori;

  return (
    <Homepage>
      {/* Konten utama */}
       {kategori === 'mahasiswa' && <Mahasiswa/>}
       {kategori === 'alumni' && <Alumni/>}
      {/* Footer */}
    </Homepage>
  );
}
