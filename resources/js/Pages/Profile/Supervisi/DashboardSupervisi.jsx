import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { User, GraduationCap, Cat, Baby, Star } from "lucide-react";
import { useState } from 'react';

export default function DashboardSupervisi(props) {
    const [listStaff, setListStaff] = useState(props.users || []);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter pencarian
    const filteredData = listStaff.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AuthenticatedLayout>
            <Head title={props.title} />
            
            {/* Statistik atas */}
            <div className="flex justify-center items-center w-full px-4 mt-6">
                <div className="stats stats-vertical sm:stats-horizontal bg-base-100 shadow-xl rounded-2xl w-full sm:w-auto border border-base-200">
                    <Link href={route('SupervisiLayanan', { kategori: 'mahasiswa' })}>
                        <div className="stat hover:bg-base-200 transition-all rounded-xl cursor-pointer">
                            <div className="stat-figure text-secondary">
                                <User className="h-8 w-8" />
                            </div>
                            <div className="stat-title">Layanan Mahasiswa</div>
                            <div className="stat-value text-primary">
                                {props.data.jumlahLayananMahasiswa}
                            </div>
                        </div>
                    </Link>
                    <Link href={route('SupervisiLayanan', { kategori: 'alumni' })}>
                        <div className="stat hover:bg-base-200 transition-all rounded-xl cursor-pointer">
                            <div className="stat-figure text-secondary">
                                <GraduationCap className="h-8 w-8" />
                            </div>
                            <div className="stat-title">Layanan Alumni</div>
                            <div className="stat-value text-primary">
                                {props.data.jumlahLayananAlumni}
                            </div>
                        </div>
                    </Link>
                    <Link href={route('SupervisiLayanan', { kategori: 'dosen' })}>
                        <div className="stat hover:bg-base-200 transition-all rounded-xl cursor-pointer">
                            <div className="stat-figure text-secondary">
                                <Cat className="h-8 w-8" />
                            </div>
                            <div className="stat-title">Layanan Dosen / Pegawai</div>
                            <div className="stat-value text-primary">
                                {props.data.jumlahLayananStaff}
                            </div>
                        </div>
                    </Link>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <Baby className="h-8 w-8" />
                        </div>
                        <div className="stat-title">Umum</div>
                        <div className="stat-value text-primary">
                            {props.data.jumlahLayananUmum}
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Staff */}
            <div className="w-full h-screen p-6 bg-base-100">
                <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <h2 className="text-xl font-bold text-center w-full sm:text-left text-primary">
                        Data Staff
                    </h2>

                    <input
                        type="text"
                        placeholder="Cari nama staff..."
                        className="input input-bordered w-full sm:w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Tabel */}
                <div className="overflow-x-auto rounded-xl border border-base-200 shadow-md h-[70vh]">
                    <table className="table w-full">
                        <thead className="bg-base-200 text-base font-semibold">
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th className="hidden sm:table-cell">Proses Layanan</th>
                                <th className="hidden md:table-cell">Skor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-base-200 transition">
                                    <td>
                                        {index + 1 + (currentPage - 1) * itemsPerPage}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-semibold text-base">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell">
                                        {item.total_selesai}
                                    </td>
                                    <td className="hidden md:table-cell">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${
                                                        i < item.skor_feedback
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="btn btn-primary btn-sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn btn-primary btn-sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
