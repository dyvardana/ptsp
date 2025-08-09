import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableLayanan from './TableLayanan';

export default function Dashboard(props) {
    console.log('dashboard :',props);
    return (
        <AuthenticatedLayout
           
        >
            <Head title={props.title}/>
            
            <div className="stats bg-base-100 shadow">
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
    <div className="stat-title">Mahasiswa</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Surat Keterangan Kuliah</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        ></path>
      </svg>
    </div>
    <div className="stat-title">Mahasiswa</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">Surat Permohonan Cuti</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        ></path>
      </svg>
    </div>
    <div className="stat-title">Mahasiswa</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">Surat Keterangan Kuliah</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        ></path>
      </svg>
    </div>
    <div className="stat-title">Mahasiswa</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">Surat Keterangan Kuliah</div>
  </div>
</div>

<div className="flex gap-4 pt-4">
  {/* Orang 1 */}
  <div className="card card-side bg-base-100 shadow-sm p-4 items-center w-96">
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
        Peserta kelas "Belajar React Dasar"
      </p>
      <div className="flex flex-col gap-1 mt-2 text-sm">
        <p>⚡ Kecepatan: <span className="font-semibold text-green-600">4.5 / 5</span></p>
        <p>🎯 Kesesuaian: <span className="font-semibold text-green-600">4.8 / 5</span></p>
        <p>👌 Kemudahan: <span className="font-semibold text-green-600">4.7 / 5</span></p>
      </div>
    </div>
  </div>

  {/* Orang 2 */}
  <div className="card card-side bg-base-100 shadow-sm p-4 items-center w-96">
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
        Peserta kelas "UI/UX Design Mastery"
      </p>
      <div className="flex flex-col gap-1 mt-2 text-sm">
        <p>⚡ Kecepatan: <span className="font-semibold text-green-600">4.2 / 5</span></p>
        <p>🎯 Kesesuaian: <span className="font-semibold text-green-600">4.6 / 5</span></p>
        <p>👌 Kemudahan: <span className="font-semibold text-green-600">4.4 / 5</span></p>
      </div>
    </div>
  </div>

  {/* Orang 3 */}
  <div className="card card-side bg-base-100 shadow-sm p-4  items-center w-96">
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
        Peserta kelas "Backend Development"
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
