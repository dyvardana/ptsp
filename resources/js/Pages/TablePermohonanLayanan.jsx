import { Inertia } from "@inertiajs/inertia";
import { useState, useMemo, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import axios from "axios";
import {
  FaFileAlt,
  FaUser,
  FaTimes,
  FaTimesCircle,
  FaPaperPlane,
  FaExchangeAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaEye
} from "react-icons/fa";

import {
    Clock,
    Eye,
    ListChecks,
    Loader2,
    CheckCircle,
    XCircle,
    MessageCircleWarning,
} from "lucide-react";
export default function TablePermohonanLayanan({ data, staff }) {
    const [dummyData, setDummyData] = useState(data);
   
    // update state kalau props.data berubah
    useEffect(() => {
        setDummyData(data);
    }, [data]);
    // console.log(data);
    // State Utama
    const user = usePage().props.auth.user;
    // dummyData = data;
    const itemsPerPage = 10;

    // State untuk Pencarian dan Pagination
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // State untuk Modal dan Data Terpilih
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // State Modal Tolak
    const [showTolakModal, setShowTolakModal] = useState(false);
    const [alasanTolak, setAlasanTolak] = useState("");
    const [idTolak, setIdTolak] = useState("");
    const [email, setEmail] = useState("");
    const [noTiket, setNoTiket] = useState("");

    // State Modal Kirim Berkas
    const [showKirimModal, setShowKirimModal] = useState(false);
    const [fileKirim, setFileKirim] = useState(null);
    const [catatanKirim, setCatatanKirim] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [staffList, setStaffList] = useState(usePage().props.staff || []);

    // State untuk Lihat Tindak Lanjut
    const [tglSelesai, setTglSelesai] = useState(null);
    const [namaTindakLanjut, setNamaTindakLanjut] = useState(null);
    const [noHpTindakLanjut, setNoHpTindakLanjut] = useState(null);
    const [tglTindakLanjut, setTglTindakLanjut] = useState(null);
    // ✅ state untuk detail mahasiswa modal terpisah
    const [mahasiswaDetail, setMahasiswaDetail] = useState(null);
    const [loadingMahasiswa, setLoadingMahasiswa] = useState(false);
    const [showMahasiswaModal, setShowMahasiswaModal] = useState(false);
    const[berkasTL,setBerkasTL]=useState(null);

    //modal syrat layanan
    const [modalSyarat, setModalSyarat] = useState(false);
    const [syaratLayanan, setSyaratLayanan] = useState([]);

    // Filter dan Pagination
    const filteredData = useMemo(() => {
        return dummyData.filter((item) =>
            Object.values(item).some((val) =>
                val?.toString().toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [search, dummyData]);

    const paginatedData = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Fungsi Modal
    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
        
    };

    const closeModal = () => {
        setSelectedItem(null);
        setShowModal(false);
        setShowTolakModal(false);
        setAlasanTolak("");
    };

    // Fungsi Tolak
    const handleTolak = () => {
        router.post(
            route("tolak"),
            {
                id: idTolak,
                email,
                keterangan_tiket: alasanTolak,
                idUser: user.id,
                no_tiket: noTiket,
            },
            {
                onSuccess: () => {
                    //closeModal();
                    setShowTolakModal(false);
                    router.reload({ only: ["data", "statusData"] });
                },
            },
        );
    };

    // Fungsi Terima
    const handleTerima = () => {
        router.post(
            route("terima"),
            {
                id: idTolak,
                idUser: user.id,
                no_tiket: noTiket,
            },
            {
                onSuccess: () => {
                    router.reload({ only: ["data", "statusData"] });
                },
            },
        );
    };

    // Fungsi Kirim Berkas
    const handleKirimBerkas = () => {
        if (!selectedStaff) {
            alert("Pilih staff terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("id", idTolak);
        formData.append("idUser", user.id);
        formData.append("no_tiket", noTiket);
        formData.append("id_staff", selectedStaff);
        formData.append("catatan", catatanKirim);

        console.log("form data:", formData);

        router.post(route("tindakLanjut"), formData, {
            forceFormData: true,
            onSuccess: () => {
                setShowKirimModal(false);
                setSelectedStaff("");
                setCatatanKirim("");
                closeModal();

                router.reload({ only: ["data"] });
                // pastikan controller passing prop `data`
            },
        });
    };
    //fungsi untuk cek syarat layanan
   const handleSyaratLayanan = (id_layanan) => {
    axios
      .get(`/syaratLayanan/${id_layanan}`)
      .then((response) => {
        const data = response.data;
        setSyaratLayanan(data);
        setModalSyarat(true);
      })
      .catch((error) => {
        console.error("Error fetching syarat layanan:", error);
        alert("Gagal mengambil syarat layanan.");
      });
  };

    const fetchMahasiswaDetail = async (nipd) => {
        setLoadingMahasiswa(true);
        try {
            const response = await fetch(
                "https://stahnmpukuturan.ac.id/api/detailmahasiswa.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nipd }),
                },
            );
            const data = await response.json();
            setMahasiswaDetail(data.user);
            setShowMahasiswaModal(true);
        } catch (error) {
            console.error("Error fetching mahasiswa details:", error);
            setMahasiswaDetail(null);
        } finally {
            setLoadingMahasiswa(false);
        }
    };
    // Fungsi Lihat Tindak Lanjut
    
    const handleLihatTindakLanjut = async (id_kirim) => {
        try {
            const response = await axios.post("/cekTindakLanjut", {
                id_permohonan: id_kirim,
            });

            console.log("response axios:", response.data);

            setNamaTindakLanjut(response.data.name);
            setNoHpTindakLanjut(response.data.phone);
            setTglSelesai(response.data.updated_at);
            setTglTindakLanjut(response.data.created_at);
            setBerkasTL(response.data.file_lampiran);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };
    
    const getPaginationPages = () => {
        const pages = [];
        const delta = 1;

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (page > 3) {
            pages.push("...");
        }

        for (
            let i = Math.max(2, page - delta);
            i <= Math.min(totalPages - 1, page + delta);
            i++
        ) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <>
            {/* TABEL */}
            <div className="mockup-window border border-base-300 bg-base-100 p-2 sm:p-4">
                <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="text-lg font-semibold">Permohonan Masuk</h2>
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

                <div className="overflow-x-auto w-full">
                    <table className="table table-xs w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tiket</th>
                                <th className="hidden sm:table-cell">Nama</th>
                                <th className="hidden md:table-cell">
                                    Kategori
                                </th>
                                <th className="hidden lg:table-cell">
                                    Layanan
                                </th>
                                <th className="hidden lg:table-cell">
                                    Tanggal Pengajuan
                                </th>
                                <th>Status</th>
                                <th className="hidden md:table-cell">Rating</th>
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
                                    <td className="hidden sm:table-cell">
                                        {item.nama_pemohon}
                                    </td>
                                    <td className="hidden md:table-cell">
                                        {item.kategori_pengguna}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        {item.nama_layanan}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        {item.tanggal_pengajuan}
                                    </td>
                                    <td>
                                        <span
                                            className={
                                                item.status === "menunggu"
                                                    ? "badge-xs badge badge-neutral flex items-center gap-1"
                                                    : item.status === "diproses"
                                                      ? "badge-xs badge badge-warning flex items-center gap-1"
                                                      : item.status ===
                                                          "diterima"
                                                        ? "badge-xs badge badge-info flex items-center gap-1"
                                                        : item.status ===
                                                            "selesai"
                                                          ? "badge-xs badge badge-success flex items-center gap-1"
                                                          : item.status ===
                                                              "ditolak"
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
                                    <td className="hidden md:table-cell">
                                        {item.rating
                                            ? "★".repeat(
                                                  Math.round(item.rating),
                                              ) +
                                              "☆".repeat(
                                                  5 - Math.round(item.rating),
                                              )
                                            : null}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-xs btn-accent"
                                            onClick={() => {
                                                openModal(item);
                                                handleLihatTindakLanjut(
                                                    item.id,
                                                );
                                                setIdTolak(item.id);
                                                setEmail(item.email);
                                                setNoTiket(item.no_tiket);
                                            }}
                                        >
                                            <Eye /> Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
                    {/* TEXT INFO */}
                    <div className="text-sm text-gray-600">
                        Menampilkan {paginatedData.length} dari{" "}
                        {filteredData.length} data
                    </div>

                    {/* BUTTON PAGINATION */}
                    <div className="join">
                        <button
                            className="join-item btn btn-sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        >
                            «
                        </button>

                        {getPaginationPages().map((p, i) =>
                            p === "..." ? (
                                <button
                                    key={`ellipsis-${i}`}
                                    className="join-item btn btn-sm btn-disabled"
                                >
                                    ...
                                </button>
                            ) : (
                                <button
                                    key={p}
                                    className={`join-item btn btn-sm ${
                                        page === p ? "btn-active" : ""
                                    }`}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </button>
                            ),
                        )}

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
                        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] border rounded flex flex-col">
                            {selectedItem.file_lampiran ? (
                                <>
                                    <iframe
                                        src={`/storage/${selectedItem.file_lampiran}`}
                                        className="w-full flex-1"
                                        title="Preview PDF"
                                    ></iframe>

                                    <div className="p-2 border-t text-center">
                                        <button
                                            className="btn btn-xs btn-secondary"
                                            onClick={() =>
                                                (window.location.href = `/lampiran/download/${selectedItem.file_lampiran.replace(/^lampiran\//, "")}`)
                                            }
                                        >
                                            Download Lampiran
                                        </button>
                                    </div>
                                </>
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
                                    <span
                                        className={
                                            selectedItem.status === "diproses"
                                                ? "text-yellow-500"
                                                : selectedItem.status ===
                                                    "menunggu"
                                                  ? "text-gray-800"
                                                  : selectedItem.status ===
                                                      "diterima"
                                                    ? "text-blue-500"
                                                    : selectedItem.status ===
                                                        "selesai"
                                                      ? "text-green-500"
                                                      : selectedItem.status ===
                                                          "ditolak"
                                                        ? "text-red-500"
                                                        : ""
                                        }
                                    >
                                        {selectedItem.status}
                                    </span>
                                </li>

                                {/* Kondisional sesuai status */}
                                {selectedItem.status === "ditolak" ? (
                                    <>
                                        <li>
                                            <strong>Alasan Penolakan:</strong>{" "}
                                            {selectedItem.keterangan_tiket}
                                        </li>
                                        <li>
                                            <strong>Admin:</strong>{" "}
                                            {selectedItem.name}
                                        </li>
                                    </>
                                ) : selectedItem.status === "diproses" ? (
                                    <>
                                        <li>
                                            <strong>Admin:</strong>{" "}
                                            {selectedItem.name}
                                        </li>
                                        <li>
                                            <strong>Staff:</strong>{" "}
                                            {namaTindakLanjut}
                                        </li>
                                        <li>
                                            <strong>Tindak Lanjut:</strong>{" "}
                                            {tglTindakLanjut}
                                        </li>
                                    </>
                                ) : selectedItem.status === "selesai" ? (
                                    <>
                                        <li>
                                            <strong>Admin:</strong>{" "}
                                            {selectedItem.name}
                                        </li>
                                        <li>
                                            <strong>Tindak Lanjut:</strong>{" "}
                                            {tglTindakLanjut}
                                        </li>
                                        <li>
                                            <strong>Tgl Selesai:</strong>{" "}
                                            {tglSelesai}
                                        </li>
                                        <li>
                                            <strong>Staff:</strong>{" "}
                                            {namaTindakLanjut}
                                        </li>
                                    </>
                                ) : null}
                            </ul>

                            {/* Tombol Aksi */}
                          <div className="mt-6 flex flex-wrap justify-end gap-3">

  {/* Syarat */}
  <button
    onClick={() => handleSyaratLayanan(selectedItem.id_layanan)}
    className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition transform hover:scale-105"
  >
    <FaFileAlt /> Syarat
  </button>

  {/* Mahasiswa */}
  <button
    onClick={() => fetchMahasiswaDetail(selectedItem.identitas_pengguna)}
    className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition transform hover:scale-105"
  >
    <FaUser /> Mahasiswa
  </button>

  {/* ===== KONDISI ===== */}

  {selectedItem.status === "diterima" && (
    <>
      <button
        onClick={() => {
          setShowModal(false);
          setShowTolakModal(true);
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition transform hover:scale-105"
      >
        <FaTimesCircle /> Tolak
      </button>

      <button
        onClick={() => setShowKirimModal(true)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition transform hover:scale-105"
      >
        <FaPaperPlane /> Teruskan
      </button>
    </>
  )}

  {selectedItem.status === "diproses" && (
    <>
      <button
        onClick={() => {
          setShowModal(false);
          setShowTolakModal(true);
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition transform hover:scale-105"
      >
        <FaTimesCircle /> Tolak
      </button>

      <button
        onClick={() => setShowKirimModal(true)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition transform hover:scale-105"
      >
        <FaExchangeAlt /> Ubah
      </button>

      <button
        onClick={() =>
          window.open(
            `https://wa.me/${noHpTindakLanjut}?text=` +
              encodeURIComponent(
                `Halo, ${namaTindakLanjut} Anda telah ditugaskan untuk menindaklanjuti layanan ${selectedItem.nama_layanan} dengan No Tiket : *${selectedItem.no_tiket}*. Demi memperlancar layanan silakan tindaklanjuti pada aplikasi web Paduraksa melalui link https://paduraksa.mpukuturan.ac.id.`
              ),
            "_blank"
          )
        }
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition transform hover:scale-105"
      >
        <FaWhatsapp /> WA
      </button>
    </>
  )}

  {selectedItem.status === "selesai" && (
    <a
      href={`/storage/${berkasTL}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition transform hover:scale-105"
    >
      <FaEye /> Lihat TL
    </a>
  )}

  {selectedItem.status === "menunggu" && (
    <>
      <button
        onClick={() => {
          setShowModal(false);
          setShowTolakModal(true);
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition transform hover:scale-105"
      >
        <FaTimesCircle /> Tolak
      </button>

      <button
        onClick={() => {
          closeModal();
          handleTerima();
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition transform hover:scale-105"
      >
        <FaCheckCircle /> Terima
      </button>
    </>
  )}

  {/* Tutup */}
  <button
    onClick={() => {
      closeModal();
      setIdTolak("");
      setEmail("");
      setNoTiket("");
    }}
    className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition transform hover:scale-105"
  >
    <FaTimes /> Tutup
  </button>

</div>
                        </div>
                    </div>
                </div>
            )}
            {/* MODAL DETAIL MAHASISWA */}
            {showMahasiswaModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">
                            Detail Mahasiswa
                        </h3>
                        {loadingMahasiswa ? (
                            <div className="text-center">
                                Loading detail mahasiswa...
                            </div>
                        ) : mahasiswaDetail ? (
                            <div>
                                <div className="flex flex-col items-center mb-4">
                                    {mahasiswaDetail.foto && (
                                        <img
                                            src={`https://siska.stahnmpukuturan.ac.id/assets/foto/${mahasiswaDetail.foto}`}
                                            alt="Foto Mahasiswa"
                                            className="w-24 h-32 object-cover rounded"
                                        />
                                    )}
                                    <p className="mt-2 font-semibold">
                                        {mahasiswaDetail.nama}
                                    </p>
                                </div>
                                <ul className="space-y-1 text-sm">
                                    <li>
                                        <strong>NIPD:</strong>{" "}
                                        {mahasiswaDetail.nipd}
                                    </li>
                                    <li>
                                        <strong>Program Studi:</strong>{" "}
                                        {mahasiswaDetail.prodi}
                                    </li>
                                    <li>
                                        <strong>Angkatan:</strong>{" "}
                                        {mahasiswaDetail.angkatan}
                                    </li>
                                    <li>
                                        <strong>Agama:</strong>{" "}
                                        {mahasiswaDetail.agama}
                                    </li>
                                    <li>
                                        <strong>Status:</strong>{" "}
                                        {mahasiswaDetail.status}
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center text-red-500">
                                Data mahasiswa tidak ditemukan
                            </div>
                        )}
                        <div className="mt-6 flex justify-end">
                            <button
                                className="btn"
                                onClick={() => setShowMahasiswaModal(false)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* MODAL ALASAN TOLAK */}
            {showTolakModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            Alasan Penolakan
                        </h2>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            rows="4"
                            placeholder="Tuliskan alasan penolakan..."
                            value={alasanTolak}
                            onChange={(e) => setAlasanTolak(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                            <button
                                className="btn"
                                onClick={() => setShowTolakModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    handleTolak();
                                }}
                            >
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showKirimModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            Teruskan ke Staff
                        </h2>

                        <select
                            className="select  select-bordered w-full mb-4"
                            value={selectedStaff}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                            <option value="">Pilih Staff</option>

                            {staff.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            className="textarea  textarea-bordered w-full mb-4"
                            rows="4"
                            placeholder="Catatan tambahan..."
                            value={catatanKirim}
                            onChange={(e) => setCatatanKirim(e.target.value)}
                        ></textarea>

                        <div className="flex justify-end gap-2">
                            <button
                                className="btn"
                                onClick={() => setShowKirimModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={handleKirimBerkas}
                            >
                                Teruskan
                            </button>
                        </div>
                    </div>
                </div>
            )}
          {/* MODAL SYARAT LAYANAN */}
{modalSyarat && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
    <div className="bg-white w-full max-w-sm rounded-xl shadow-md p-4 relative">
      
      {/* Tombol close (X) */}
      <button
        onClick={() => setModalSyarat(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
      >
        ✕
      </button>

      {/* Header */}
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        Syarat Layanan
      </h2>

      {/* Content */}
      <div className="max-h-48 overflow-y-auto text-sm text-gray-600">
        {syaratLayanan.length > 0 ? (
          <ul className="list-disc pl-4 space-y-1">
            {syaratLayanan.map((item, index) => (
              <li key={index}>{item.persyaratan}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            Tidak ada syarat khusus.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4">
        <button
          onClick={() => setModalSyarat(false)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 rounded-lg transition"
        >
          Tutup
        </button>
      </div>

    </div>
  </div>
)}
        </>
    );
}
