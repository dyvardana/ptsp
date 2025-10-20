
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Clock,
    Eye,
    ListChecks,
    Loader2,
    CheckCircle,
    XCircle,
    X,BadgeCheck, 
} from "lucide-react";
import { useState } from 'react';
export default function SupervisiLayanan(props) {
    // console.log("status data:", props.statusData);
    console.log("props:", props);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState(props.layanan || []);
    const rowsPerPage = 10;
     // Filter data
    const filteredData = list.filter(
        (item) =>
          
            item.nama_layanan.toLowerCase().includes(search.toLowerCase()) 
    );
     // Pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
  
    

    return (
        <AuthenticatedLayout>
            <Head title={props.title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3 sm:p-4">
                {/* Card Status */}
                <div
                    className="stat bg-base-100 shadow rounded-xl p-3 sm:p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300"
                >
                    <div className="stat-figure text-secondary">
                        <Clock className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="stat-title text-sm sm:text-base">
                        Menunggu
                    </div>
                    <div className="stat-value text-lg sm:text-2xl">
                        {props.statusData.menunggu}
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">Layanan</div>
                </div>

                <div
                    className="stat bg-base-100 shadow rounded-xl p-3 sm:p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300"
                >
                    <div className="stat-figure text-blue-500">
                        <ListChecks className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="stat-title text-sm sm:text-base">
                        Diterima
                    </div>
                    <div className="stat-value text-lg sm:text-2xl">
                        {props.statusData.diterima}
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">Layanan</div>
                </div>

                <div
                    className="stat bg-base-100 shadow rounded-xl p-3 sm:p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300"
                >
                    <div className="stat-figure text-yellow-500">
                        <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
                    </div>
                    <div className="stat-title text-sm sm:text-base">
                        Diproses
                    </div>
                    <div className="stat-value text-lg sm:text-2xl">
                        {props.statusData.diproses}
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">Layanan</div>
                </div>

                <div
                    className="stat bg-base-100 shadow rounded-xl p-3 sm:p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300"
                >
                    <div className="stat-figure text-green-500">
                        <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="stat-title text-sm sm:text-base">
                        Selesai
                    </div>
                    <div className="stat-value text-lg sm:text-2xl">
                        {props.statusData.selesai}
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">Layanan</div>
                </div>

                <div
                    className="stat bg-base-100 shadow rounded-xl p-3 sm:p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300"
                >
                    <div className="stat-figure text-red-500">
                        <X className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="stat-title text-sm sm:text-base">
                        Ditolak
                    </div>
                    <div className="stat-value text-lg sm:text-2xl">
                        {props.statusData.ditolak}
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">Layanan</div>
                </div>
            </div>
            
 <div className="mockup-window border border-base-300 bg-base-100 p-2 sm:p-4">
                <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="text-lg font-semibold">Layanan {props.kategori}</h2>
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="input input-bordered input-sm w-full max-w-xs"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
             <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Layanan</th>
                            <th className="hidden sm:table-cell">Deskripsi</th>
                            <th>Aktif</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       {paginatedData.map((item, index) => (
                            <tr key={item.id}>
                                <th>
                                    {(currentPage - 1) * rowsPerPage +
                                        index +
                                        1}
                                </th>

                                {/* Kategori → sembunyi di HP */}
                             

                                <td className="max-w-[120px] break-words">
                                    {item.nama_layanan}
                                </td>

                                {/* Deskripsi → sembunyi di HP */}
                                <td className="hidden sm:table-cell">
                                    {item.deskripsi}
                                </td>

                                <td>
                                    {item.status === "aktif" ? (
                                        <BadgeCheck className="text-green-500" />
                                    ) : (
                                        <X className="text-red-500" />
                                    )}
                                </td>
                                <td>{item.jumlah} </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}