import { Inertia } from "@inertiajs/inertia";
import { useState, useMemo } from "react";
import { router, usePage } from "@inertiajs/react";

import {
    Clock,
    Eye,
    ListChecks,
    Loader2,
    CheckCircle,
    XCircle,
} from "lucide-react";
export default function TableLayananStaff({ data }) {
    const dummyData = data;
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showTolakModal, setShowTolakModal] = useState(false);
    const [alasanTolak, setAlasanTolak] = useState("");
    const [idTolak, setIdTolak] = useState("");
    const [email, setEmail] = useState("");
    const [noTiket, setNoTiket] = useState("");
    const itemsPerPage = 10;
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);

    const user = usePage().props.auth.user;

    const filteredData = useMemo(() => {
        return dummyData.filter((item) =>
            Object.values(item).some((val) =>
                val?.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, dummyData]);

    const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
        //console.log("item ini :",item);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setShowModal(false);
        setShowTolakModal(false);
        setAlasanTolak("");
    };

    const handleTolak = () => {
        console.log("Ditolak dengan alasan:", idTolak);
        // Kirim ke backend jika perlu

        Inertia.post(
            route("tolak", {
                id: idTolak,
                email: email,
                keterangan_tiket: alasanTolak,
                idUser: user.id,
                no_tiket: noTiket,
            })
        );
        console.log(noTiket);
        closeModal();
    };

    const handleTerima = () => {
        console.log("Diterima:", idTolak);
        // Kirim ke backend jika perlu
        // Inertia.post(route('terima',{id:idTolak,idUser:user.id,no_tiket:noTiket}));
        closeModal();
    };

    return (
        <div data-theme="light">
            {/* TABEL */}
            <div className="mockup-window border border-base-300 bg-base-100 p-4">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Layanan</h2>
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
                    <table className="table table-xs w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tiket</th>
                                {/* tampil mulai tablet */}
                                <th className="hidden md:table-cell">Nama</th>
                                <th className="hidden md:table-cell">
                                    Kategori
                                </th>
                                {/* tampil mulai laptop */}
                                <th className="hidden lg:table-cell">
                                    Layanan
                                </th>
                                <th className="hidden lg:table-cell">
                                    Tanggal Pengajuan
                                </th>
                                <th>Status</th>
                                <th>Pilihan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        {(page - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td>{item.no_tiket}</td>
                                    {/* sembunyiin di hp */}
                                    <td className="hidden md:table-cell">
                                        {item.nama_pemohon}
                                    </td>
                                    <td className="hidden md:table-cell">
                                        {item.kategori_pengguna}
                                    </td>
                                    {/* sembunyiin di hp + tablet */}
                                    <td className="hidden lg:table-cell">
                                        {item.nama_layanan}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        {item.updated_at}
                                    </td>
                                    <td>
                                        <span
                                            className={
                                                item.status === "menunggu"
                                                    ? "badge-xs badge badge-neutral flex items-center gap-1"
                                                    : item.status === "diproses"
                                                    ? "badge-xs badge badge-warning flex items-center gap-1"
                                                    : item.status === "diterima"
                                                    ? "badge-xs badge badge-info flex items-center gap-1"
                                                    : item.status === "selesai"
                                                    ? "badge-xs badge badge-success flex items-center gap-1"
                                                    : item.status === "ditolak"
                                                    ? "badge-xs badge badge-error flex items-center gap-1"
                                                    : "badge"
                                            }
                                        >
                                            {item.status === "menunggu" && (
                                                <Clock size={14} />
                                            )}
                                            {item.status === "diproses" && (
                                                <Loader2
                                                    size={14}
                                                    className="animate-spin"
                                                />
                                            )}
                                            {item.status === "diterima" && (
                                                <ListChecks size={14} />
                                            )}
                                            {item.status === "selesai" && (
                                                <CheckCircle size={14} />
                                            )}
                                            {item.status === "ditolak" && (
                                                <XCircle size={14} />
                                            )}
                                            <span className="capitalize">
                                                {item.status}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-xs btn-accent"
                                            onClick={() => {
                                                openModal(item);
                                                setIdTolak(item.id);
                                                setEmail(item.email);
                                                setNoTiket(item.no_tiket);
                                            }}
                                        >
                                            <Eye />
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm">
                        Menampilkan {(page - 1) * itemsPerPage + 1} -{" "}
                        {Math.min(page * itemsPerPage, filteredData.length)}{" "}
                        dari {filteredData.length}
                    </div>
                    <div className="join">
                        <button
                            className="join-item btn btn-sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        >
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`join-item btn btn-sm ${
                                    page === i + 1 ? "btn-active" : ""
                                }`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="join-item btn btn-sm"
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage((p) => Math.min(p + 1, totalPages))
                            }
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL DETAIL */}
            {showModal && selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-5xl flex flex-col md:flex-row gap-4">
                        {/* Kiri: File */}
                        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] border rounded overflow-hidden">
                            {selectedItem.file_lampiran ? (
                                <iframe
                                    src={`/storage/${selectedItem.file_lampiran}`} // ✅ akses storage
                                    className="w-full h-full"
                                    title="Preview PDF"
                                ></iframe>
                            ) : (
                                <div className="text-center p-4">
                                    Tidak ada file yang diunggah.
                                </div>
                            )}
                        </div>

                        {/* Kanan: Detail */}
                        <div className="w-full md:w-1/2 overflow-y-auto max-h-[300px] md:max-h-[500px]">
                            <h3 className="text-lg font-bold mb-4">
                                Detail Pengajuan
                            </h3>
                            <ul className="text-sm space-y-1">
                                <li>
                                    <strong>No Tiket:</strong>{" "}
                                    {selectedItem.no_tiket ?? "Belum ada tiket"}
                                </li>
                                <li>
                                    <strong>Nama:</strong>{" "}
                                    {selectedItem.nama_pemohon}
                                </li>
                                <li>
                                    <strong>NIK/NIM:</strong>{" "}
                                    {selectedItem.identitas_pengguna}
                                </li>
                                <li>
                                    <strong>Email:</strong> {selectedItem.email}
                                </li>
                                <li>
                                    <strong>No HP:</strong> {selectedItem.no_hp}
                                </li>
                                <li>
                                    <strong>Alamat:</strong>{" "}
                                    {selectedItem.alamat}
                                </li>
                                <li>
                                    <strong>Kategori:</strong>{" "}
                                    {selectedItem.kategori_pengguna}
                                </li>
                                <li>
                                    <strong>Layanan:</strong>{" "}
                                    {selectedItem.nama_layanan}
                                </li>
                                <li>
                                    <strong>Judul Layanan:</strong>{" "}
                                    {selectedItem.judul_layanan}
                                </li>
                                <li>
                                    <strong>Tanggal Pengajuan:</strong>{" "}
                                    {selectedItem.tanggal_pengajuan}
                                </li>
                                <li>
                                    <strong>Keterangan:</strong>{" "}
                                    {selectedItem.keterangan_tambahan}
                                </li>
                                <li>
                                    <strong>Status:</strong>{" "}
                                    {selectedItem.status}
                                </li>
                                <li>
                                    <strong>PTSP:</strong> {selectedItem.name}
                                </li>
                                <li>
                                    <strong>Catatan PTSP:</strong>{" "}
                                    {selectedItem.catatan}
                                </li>
                                {selectedItem.status === "ditolak" && (
                                    <li>
                                        <strong>Alasan Penolakan:</strong>{" "}
                                        {selectedItem.keterangan_tiket}
                                    </li>
                                )}
                            </ul>

                            <div className="mt-6 flex flex-col md:flex-row justify-end gap-2">
                                {selectedItem.status === "diproses" ? (
                                    <>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                setShowModal(false);
                                                setShowUploadModal(true);
                                            }}
                                        >
                                            Tindak Lanjut
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                closeModal();
                                                setIdTolak("");
                                            }}
                                        >
                                            Tutup
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-success">
                                            Unduh Tindak Lanjut
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                closeModal();
                                                setIdTolak("");
                                                setEmail("");
                                                setNoTiket("");
                                            }}
                                        >
                                            Tutup
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showUploadModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h3 className="text-lg font-bold mb-4">
                            Unggah File Tindak Lanjut
                        </h3>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData();
                                formData.append("file_lampiran", uploadFile);
                                formData.append(
                                    "id_permohonan",
                                    selectedItem.id
                                );
                                formData.append("id_users", user.id);
                                formData.append(
                                    "no_tiket",
                                    selectedItem.no_tiket
                                );

                                router.post(
                                    route("tindak_lanjut_staff"),
                                    formData,
                                    {
                                        forceFormData: true,
                                        onSuccess: () => {
                                            setShowUploadModal(false);
                                            setUploadFile(null);
                                        },
                                    }
                                );
                            }}
                        >
                            <div className="mb-4">
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setUploadFile(e.target.files[0])
                                    }
                                    className="file-input file-input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        setUploadFile(null);
                                    }}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Unggah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
