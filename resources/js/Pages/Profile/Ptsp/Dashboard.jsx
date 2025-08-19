import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableLayanan from '@/Pages/TablePermohonanLayanan';
import { Head } from '@inertiajs/react';


import { User,GraduationCap,Cat,Baby } from 'lucide-react';
export default function Dashboard(props) {
   // console.log('dashboard :',props);
    return (
        <AuthenticatedLayout
           
        >
            <Head title={props.title}/>
            
      <div className="flex justify-center items-center w-full px-2">
  <div className="stats stats-vertical sm:stats-horizontal bg-base-100 shadow w-full sm:w-auto">
    <div className="stat">
      <div className="stat-figure text-secondary">
        <User className="h-8 w-8" />
      </div>
      <div className="stat-title">Layanan Mahasiswa</div>
      <div className="stat-value">{props.data.jumlahLayananMahasiswa}</div>
    </div>

    <div className="stat">
      <div className="stat-figure text-secondary">
        <GraduationCap className="h-8 w-8" />
      </div>
      <div className="stat-title">Layanan Alumni</div>
      <div className="stat-value">{props.data.jumlahLayananAlumni}</div>
    </div>

    <div className="stat">
      <div className="stat-figure text-secondary">
        <Cat className="h-8 w-8" />
      </div>
      <div className="stat-title">Layanan Dosen / Pegawai</div>
      <div className="stat-value">{props.data.jumlahLayananStaff}</div>
    </div>

    <div className="stat">
      <div className="stat-figure text-secondary">
        <Baby className="h-8 w-8" />
      </div>
      <div className="stat-title">Umum</div>
      <div className="stat-value">{props.data.jumlahLayananUmum}</div>
    </div>
  </div>
</div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
  {/* Orang 1 */}
  <div className="card card-side bg-base-100 shadow-sm p-4 items-center">
    <div className="avatar">
      <div className="w-16 rounded-full">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User Avatar"
        />
      </div>
    </div>
    <div className="card-body p-4">
      <h2 className="card-title">Nike Hartini</h2>
      <p className="text-sm text-gray-500">
        Cekatan dan sangat membantu dalam proses pengajuan layanan.
      </p>
      <div className="flex flex-col gap-1 mt-2 text-sm">
        <p>⚡ Kecepatan: <span className="font-semibold text-green-600">4.5 / 5</span></p>
        <p>🎯 Kesesuaian: <span className="font-semibold text-green-600">4.8 / 5</span></p>
        <p>👌 Kemudahan: <span className="font-semibold text-green-600">4.7 / 5</span></p>
      </div>
    </div>
  </div>

  {/* Orang 2 */}
  <div className="card card-side bg-base-100 shadow-sm p-4 items-center">
    <div className="avatar">
      <div className="w-16 rounded-full">
        <img
          src="https://randomuser.me/api/portraits/men/33.jpg"
          alt="User Avatar"
        />
      </div>
    </div>
    <div className="card-body p-4">
      <h2 className="card-title">Dodik Krismawan</h2>
      <p className="text-sm text-gray-500">
        "Layanan yang cepat dan responsif, sangat membantu!"
      </p>
      <div className="flex flex-col gap-1 mt-2 text-sm">
        <p>⚡ Kecepatan: <span className="font-semibold text-green-600">4.2 / 5</span></p>
        <p>🎯 Kesesuaian: <span className="font-semibold text-green-600">4.6 / 5</span></p>
        <p>👌 Kemudahan: <span className="font-semibold text-green-600">4.4 / 5</span></p>
      </div>
    </div>
  </div>

  {/* Orang 3 */}
  <div className="card card-side bg-base-100 shadow-sm p-4 items-center">
    <div className="avatar">
      <div className="w-16 rounded-full">
        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="User Avatar"
        />
      </div>
    </div>
    <div className="card-body p-4">
      <h2 className="card-title">Reski Udayani</h2>
      <p className="text-sm text-gray-500">
        "Sangat puas dengan layanan yang diberikan, sangat membantu dalam proses pengajuan."
      </p>
      <div className="flex flex-col gap-1 mt-2 text-sm">
        <p>⚡ Kecepatan: <span className="font-semibold text-green-600">4.9 / 5</span></p>
        <p>🎯 Kesesuaian: <span className="font-semibold text-green-600">5.0 / 5</span></p>
        <p>👌 Kemudahan: <span className="font-semibold text-green-600">4.8 / 5</span></p>
      </div>
    </div>
  </div>
</div>


        </AuthenticatedLayout>
    );
}
