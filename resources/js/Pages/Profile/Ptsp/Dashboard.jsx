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
            
      <div className='flex justify-center items-center '>
        <div className="stats bg-base-100 shadow">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <User/>
                    </svg>
                  </div>
                  <div className="stat-title">Layanan Mahasiswa</div>
                  <div className="stat-value">{props.data.jumlahLayananMahasiswa}</div>
                  {/* <div className="stat-desc">Surat Keterangan Kuliah</div> */}
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <GraduationCap/>
                    </svg>
                  </div>
                  <div className="stat-title">Layanan Alumni</div>
                  <div className="stat-value">{props.data.jumlahLayananAlumni}</div>
                  {/* <div className="stat-desc">Surat Permohonan Cuti</div> */}
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <Cat/>
                    </svg>
                  </div>
                  <div className="stat-title">Layanan Dosen / Pegawai</div>
                  <div className="stat-value">{props.data.jumlahLayananStaff}</div>
                  {/* <div className="stat-desc">Surat Keterangan Kuliah</div> */}
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <Baby/>
                    </svg>
                  </div>
                  <div className="stat-title">Umum</div>
                  <div className="stat-value">{props.data.jumlahLayananUmum}</div>
                  {/* <div className="stat-desc">Surat Keterangan Kuliah</div> */}
                </div>
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
