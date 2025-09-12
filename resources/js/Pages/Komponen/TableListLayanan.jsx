
import React, { useState } from "react";
import { BadgeCheck, X } from "lucide-react";
import axios from "axios";

export default function TableListLayanan({ datalist }) {
    const [namaLayanan, setNamaLayanan] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState(datalist);
    const rowsPerPage = 10;
    const [hapus, setHapus] = useState(null);

    // 🔔 state untuk notifikasi
    const [notif, setNotif] = useState({
        show: false,
        message: "",
        type: "success",
    });

    // fungsi show notif
    const showNotif = (message, type = "success") => {
        setNotif({ show: true, message, type });
        setTimeout(() => setNotif({ show: false, message: "", type }), 3000);
    };
    // fungsi delete
    const handleDelete = (id) => {
        axios
            .delete(`/layanans/${id}`)
            .then((res) => {
                showNotif(res.data.message, "success");
                setList((prev) => prev.filter((item) => item.id !== id));
            })
            .catch(() => {
                showNotif(res.data.message, "success");
            });
    };

    // form state untuk tambah
    const [form, setForm] = useState({
        kategori_pengguna: "",
        nama_layanan: "",
        deskripsi: "",
        status: "",
        validasi_spp: "",
        syarat: [""],
    });

    // form state untuk update
    const [editForm, setEditForm] = useState({
        id: null,
        nama_layanan: "",
        deskripsi: "",
        status: "",
        validasi_spp: "",
        syarat: [""],
    });

    // Handle change tambah
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Handle submit tambah
    // Handle submit tambah
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/listLayanan", form);
            // update tabel langsung dari JSON backend
            setList((prev) => [data, ...prev]);
            // reset form
            setForm({
                kategori_pengguna: "",
                nama_layanan: "",
                deskripsi: "",
                status: "",
                validasi_spp: "",
                syarat: [""],
            });
            // close modal
            document.getElementById("modalTambah").close();

            showNotif("Layanan berhasil ditambahkan!", "success");
        } catch (error) {
            showNotif("Terjadi kesalahan saat menambah layanan.", "error");
        }
    };

    // Handle edit (buka modal update)
    const handleEdit = async (id) => {
        try {
            const { data } = await axios.get(`/layananget/${id}`);
            setEditForm({
                id: data.id,
                nama_layanan: data.nama_layanan,
                deskripsi: data.deskripsi,
                status: data.status,
                validasi_spp: data.validasi_spp,
                syarat: data.syarat?.length ? data.syarat : [""],
            });
            document.getElementById("modalUpdate").showModal();
        } catch (error) {
            console.error("Gagal ambil data layanan", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!editForm.deskripsi.trim()) {
            alert("Deskripsi tidak boleh kosong!");
            return;
        }

        try {
            const res = await axios.put(`/layanans/${editForm.id}`, editForm);

            // res.data = { message, data }
            setList((prev) =>
                prev.map((item) =>
                    item.id === editForm.id
                        ? { ...item, ...res.data.data }
                        : item
                )
            );

            document.getElementById("modalUpdate")?.close();
            showNotif(res.data.message, "success");
        } catch (error) {
            console.error(error);
            showNotif("Layanan gagal diperbaharui!", "error");
        }
    };

    // Filter data
    const filteredData = list.filter(
        (item) =>
            item.kategori_pengguna
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.nama_layanan.toLowerCase().includes(search.toLowerCase()) ||
            item.status.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="p-4">
            {/* Header */}
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                {/* Judul */}
                <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">
                    Daftar Layanan
                </h2>

                {/* Aksi */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <button
                        className="btn btn-primary w-full sm:w-auto"
                        onClick={() =>
                            document.getElementById("modalTambah").showModal()
                        }
                    >
                        + Tambah
                    </button>
                    <input
                        type="text"
                        placeholder="Cari data..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full sm:w-64"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th className="hidden sm:table-cell">Kategori</th>
                            <th>Nama Layanan</th>
                            <th className="hidden sm:table-cell">Deskripsi</th>
                            <th>Aktif</th>
                            <th>Pilihan</th>
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
                                <td className="hidden sm:table-cell">
                                    {item.kategori_pengguna}
                                </td>

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

                                <td className="flex flex-col sm:flex-row gap-1">
                                    <button
                                        className="btn btn-xs btn-secondary"
                                        onClick={() => {
                                            setHapus(item.id);
                                            setNamaLayanan(item.nama_layanan);
                                            document
                                                .getElementById("modalHapus")
                                                .showModal();
                                        }}
                                    >
                                        Hapus
                                    </button>
                                    <button className="btn btn-xs btn-info">
                                        Lihat
                                    </button>
                                    <button
                                        className="btn btn-xs btn-warning"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah */}
            <dialog id="modalTambah" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Layanan</h3>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <select
                            name="kategori_pengguna"
                            value={form.kategori_pengguna}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="alumni">Alumni</option>
                            <option value="dosen">Dosen / Pegawai</option>
                            <option value="umum">Umum</option>
                        </select>
                        <input
                            type="text"
                            name="nama_layanan"
                            value={form.nama_layanan}
                            onChange={handleChange}
                            placeholder="Nama Layanan"
                            className="input input-bordered w-full"
                            required
                        />
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            placeholder="Deskripsi Layanan"
                            className="textarea textarea-bordered w-full"
                            required
                        />
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>
    -- Pilih Status Layanan --
  </option>
                            <option value="aktif">Aktif</option>
                            <option value="tidak">Tidak Aktif</option>
                        </select>
                        <select
                            name="validasi_spp"
                            value={form.validasi_spp}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>
    -- Pilih validasi SPP --
  </option>
                            <option value="ya">Ya</option>
                            <option value="tidak"> Tidak</option>
                        </select>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("modalTambah")
                                        .close()
                                }
                            >
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
            {/* Hapus Modal */}

            <dialog id="modalHapus" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hapus Layanan</h3>
                    <p>
                        Apakah Anda yakin ingin menghapus layanan {namaLayanan}?{" "}
                    </p>
                    <span className="text-red-500 text-xs">
                        <strong>PERHATIAN:</strong> Tindakan ini dapat
                        mengakibatkan kehilangan data yang tidak dapat
                        dikembalikan.
                    </span>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                document.getElementById("modalHapus").close();
                                setHapus(null);
                            }}
                        >
                            Batal
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                handleDelete(hapus);
                                document.getElementById("modalHapus").close();
                                setHapus(null);
                            }}
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Modal Update */}
            <dialog
                id="modalUpdate"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full max-w-lg">
                    <h3 className="font-bold text-lg mb-4">Update Layanan</h3>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <span className="block text-sm font-medium">
                            Nama Layanan : {editForm.nama_layanan}
                        </span>

                        <textarea
                            name="deskripsi"
                            className="textarea textarea-bordered w-full"
                            placeholder="Masukkan deskripsi layanan"
                            value={editForm.deskripsi}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    deskripsi: e.target.value,
                                })
                            }
                            required
                        />

                        <select
                            name="status"
                            className="select select-bordered w-full"
                            value={editForm.status}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="" disabled>
    -- Pilih Aktivasi Layanan --
  </option>
                            <option value="aktif">Aktif</option>
                            <option value="tidak">Tidak Aktif</option>
                        </select>
                        <select
                            name="validasi_spp"
                            className="select select-bordered w-full"
                            value={editForm.validasi_spp}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    validasi_spp: e.target.value,
                                })
                            }
                        >
                           <option value="" disabled>
    -- Pilih validasi SPP --
  </option>
                            <option value="ya">Ya</option>
                            <option value="tidak"> Tidak</option>
                        </select>
                        

                        {/* Input syarat */}
                        <div>
                            <label className="label">
                                <span className="label-text">
                                    Syarat Layanan
                                </span>
                            </label>
                            {editForm.syarat.map((syarat, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row gap-2 mb-2"
                                >
                                    <input
                                        type="text"
                                        className="input input-bordered flex-1"
                                        placeholder={`Syarat ${idx + 1}`}
                                        value={syarat}
                                        onChange={(e) => {
                                            const newSyarat = [
                                                ...editForm.syarat,
                                            ];
                                            newSyarat[idx] = e.target.value;
                                            setEditForm({
                                                ...editForm,
                                                syarat: newSyarat,
                                            });
                                        }}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-error btn-sm w-full sm:w-auto"
                                        onClick={() =>
                                            setEditForm({
                                                ...editForm,
                                                syarat: editForm.syarat.filter(
                                                    (_, i) => i !== idx
                                                ),
                                            })
                                        }
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary w-full sm:w-auto"
                                onClick={() =>
                                    setEditForm({
                                        ...editForm,
                                        syarat: [...editForm.syarat, ""],
                                    })
                                }
                            >
                                + Tambah Syarat
                            </button>
                        </div>

                        {/* Action */}
                        <div className="modal-action flex flex-col sm:flex-row gap-2">
                            <button
                                type="button"
                                className="btn w-full sm:w-auto"
                                onClick={() =>
                                    document
                                        .getElementById("modalUpdate")
                                        .close()
                                }
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                <button
                    className="btn btn-sm"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    «
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`btn btn-sm ${
                            currentPage === i + 1 ? "btn-active" : ""
                        }`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="btn btn-sm"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>
            {/* 🔔 Notifikasi */}
            {notif.show && (
                <div
                    className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 transition-opacity duration-300
                        ${
                            notif.type === "success"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                >
                    {notif.message}
                </div>
            )}
        </div>
    );
}
