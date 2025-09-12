import React, { useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { TriangleAlert } from "lucide-react";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

export default function Mahasiswa() {
    const [datamahasiswaValid, setDatamahasiswaValid] = useState(false);
    const [statusMahasiswa, setStatusMahasiswa] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        id_layanan: "",
        nama_pemohon: "",
        nim: "",
        identitas_pengguna: "",
        alamat: "",
        kategori_pengguna: "mahasiswa",
        no_hp: "",
        email: "",
        keterangan_tambahan: "",
        judul_layanan: "",
        file_lampiran: null,
    });

    const [layananMahasiswa, setLayananMahasiswa] = useState({});
    const [layananTerpilih, setLayananTerpilih] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const handleCekDataMahasiswa = async () => {
        if (!form.nik || !form.identitas_pengguna) {
            Swal.fire({
                icon: "warning",
                title: "Data Tidak Lengkap",
                text: "Harap lengkapi NIK dan NIM terlebih dahulu.",
            });
            return;
        }

        try {
            const res = await fetch(
                "https://stahnmpukuturan.ac.id/api/cekmahasiswa.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nik: form.nik,
                        nipd: form.identitas_pengguna,
                    }),
                }
            );

            const data = await res.json();

            if (data && data.user && data.user.nama) {
                setForm((prev) => ({
                    ...prev,
                    nama_pemohon: data.user.nama,
                    alamat: data.user.jln || "",
                    no_hp: data.user.phone || "",
                    email: data.user.email || "",
                }));
                setStatusMahasiswa(
                    data.user.status === "AKTIF" ? "AKTIF" : "NONAKTIF"
                );
               
                setDatamahasiswaValid(true);
                Swal.fire({
                    icon: "success",
                    title: "Data Ditemukan",
                    text: `Mahasiswa: ${data.user.nama}, jika terdapat perbedaan identitas silahkan lakukan perubahan pada akun SISKA`,
                });
            } else {
                setDatamahasiswaValid(false);
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Ditemukan",
                    text: "Pastikan NIK dan NIM sesuai.",
                });
            }
        } catch (err) {
            console.error("Gagal mengambil data:", err);
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan",
                text: "Gagal mengambil data mahasiswa.",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const response = await axios.post(
                route("permohonanlayanan"),
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text:
                    "Data berhasil dikirim dengan nomor tiket: " +
                    response.data.tiket.no_tiket,
            }).then(() => {
                router.visit(
                    route("detailTiket", {
                        no_tiket: response.data.tiket.no_tiket,
                    })
                );
            });
        } catch (error) {
            if (error.response?.status === 422) {
                Swal.fire({
                    icon: "warning",
                    title: "Validasi Gagal",
                    html:
                        "<pre style='text-align:left'>" +
                        JSON.stringify(error.response.data.errors, null, 2) +
                        "</pre>",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi kesalahan saat mengirim data.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios
            .get("/layanan/mahasiswa")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setLayananMahasiswa(res.data);
                } else {
                    console.error("Format data tidak valid:", res.data);
                }
            })
            .catch((err) => {
                console.error("Gagal memuat data layanan:", err);
            });
    }, []);


    return (
        <div className="pt-40 px-4 pb-20">
            <div className="max-w-4xl mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-center text-2xl font-bold">
                            Form Permohonan Layanan Mahasiswa
                        </h2>
                        <span className="text-sm text-gray-500 mb-2">
                            Silakan isi form berikut untuk memulai permohonan
                            layanan. Data diri harus lengkap dan apabila
                            terdapat perbedaan silahkan melakukan peremajaan
                            pada akun SISKA.
                        </span>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* INFORMASI MAHASISWA */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Informasi Diri Mahasiswa
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="identitas_pengguna"
                                        value={form.identitas_pengguna}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="NIM"
                                        required
                                    />

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="nik"
                                            value={form.nik}
                                            onChange={handleChange}
                                            className="input input-bordered flex-1"
                                            placeholder="NIK KTP"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-accent whitespace-nowrap"
                                            onClick={handleCekDataMahasiswa}
                                        >
                                            Cek
                                        </button>
                                    </div>

                                    <input
                                        type="text"
                                        name="nama_pemohon"
                                        value={form.nama_pemohon}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Nama Lengkap"
                                        readOnly
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="no_hp"
                                        value={form.no_hp}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="No. HP"
                                        readOnly
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Email aktif"
                                        readOnly
                                    />
                                    <textarea
                                        name="alamat"
                                        value={form.alamat}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Alamat Lengkap"
                                        rows="2"
                                        readOnly
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/* RINCIAN PERMOHONAN */}
                            {datamahasiswaValid &&
                                statusMahasiswa === "AKTIF" && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Rincian Permohonan
                                        </h3>
                                        <div className="space-y-4">
                                            <select
                                                name="id_layanan"
                                                className="select select-bordered w-full"
                                                value={layananTerpilih}
                                                onChange={(e) => {
                                                    setLayananTerpilih(
                                                        e.target.value
                                                    );
                                                    setForm({
                                                        ...form,
                                                        id_layanan:
                                                            e.target.value,
                                                        judul_layanan:
                                                            layananMahasiswa.find(
                                                                (l) =>
                                                                    l.id.toString() ===
                                                                    e.target
                                                                        .value
                                                            )?.nama_layanan ||
                                                            "",
                                                    });
                                                }}
                                            >
                                                <option value="" disabled>
                                                    Pilih Layanan
                                                </option>
                                                {layananMahasiswa.map(
                                                    (layanan) => (
                                                        <option
                                                            key={layanan.id}
                                                            value={layanan.id}
                                                        >
                                                            {
                                                                layanan.nama_layanan
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                            {layananTerpilih && (
                                                <div className="mt-4 bg-gray-100 p-4 rounded shadow">
                                                    <h3 className="font-semibold mb-2">
                                                        Persyaratan untuk
                                                        layanan{" "}
                                                        {
                                                            layananMahasiswa.find(
                                                                (l) =>
                                                                    l.id.toString() ===
                                                                    layananTerpilih
                                                            )?.nama_layanan
                                                        }
                                                    </h3>

                                                    {/* daftar persyaratan */}
                                                    <ul className="list-disc list-inside">
                                                        {layananMahasiswa
                                                            .find(
                                                                (l) =>
                                                                    l.id.toString() ===
                                                                    layananTerpilih
                                                            )
                                                            ?.persyaratan.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>

                                                    <hr className="my-3" />

                                                    {/* catatan dengan background dan sejajar */}
                                                    <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                                                        <TriangleAlert className="text-yellow-800 mt-1" />
                                                        <p className="text-sm">
                                                            <strong>
                                                                Catatan:
                                                            </strong>{" "}
                                                            <i>
                                                                Pastikan semua
                                                                persyaratan
                                                                telah dipenuhi
                                                                sebelum mengirim
                                                                permohonan dan
                                                                dijadikan satu
                                                                file .pdf /
                                                                .zip.
                                                            </i>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <textarea
                                                name="keterangan_tambahan"
                                                value={form.keterangan_tambahan}
                                                onChange={handleChange}
                                                className="textarea textarea-bordered w-full"
                                                placeholder="Rincian Informasi yang Dibutuhkan"
                                                rows="3"
                                                
                                            ></textarea>
                                            <div className="form-control md:col-span-2">
                                                <label className="label">
                                                    Unggah berkas pendukung
                                                </label>
                                                <input
                                                    type="file"
                                                    name="file_lampiran"
                                                    onChange={handleChange}
                                                    accept=".pdf,.rar,.zip"
                                                    className="file-input file-input-bordered w-full"
                                                    
                                                />
                                            </div>

                                            <div className="card-actions justify-end pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className={`px-4 py-2 rounded text-white ${
                                                        loading
                                                            ? "bg-gray-400"
                                                            : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                                >
                                                    {loading
                                                        ? "Mengirim..."
                                                        : "Kirim"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </form>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center">
                        <svg
                            className="animate-spin h-10 w-10 text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                            ></path>
                        </svg>
                        <span className="mt-2 text-green-600 font-semibold">
                            Mengirim data...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
