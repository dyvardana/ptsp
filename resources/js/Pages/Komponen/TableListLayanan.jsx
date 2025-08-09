import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import { BadgeCheck,X } from 'lucide-react';

export default function TableListLayanan({datalist}){
    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState(datalist); // simpan data tabel di state
  const rowsPerPage = 10;

  // state untuk form tambah
  const [form, setForm] = useState({
  kategori_pengguna: "",
  nama_layanan: "",
  deskripsi: "", // 👈 tambahan
  status: "Aktif",
});


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  Inertia.post("/listLayanan", form, {
    onSuccess: () => {
      setList((prev) => [{ ...form, id: Date.now() }, ...prev]);
      document.getElementById("modalTambah").close();
      setForm({
        kategori_pengguna: "",
        nama_layanan: "",
        deskripsi: "",
        status: "Aktif"
      });
    }
  });
};


  // filter pencarian
  const filteredData = list.filter(
    (item) =>
      item.kategori_pengguna.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_layanan.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  // pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
    return (
        <>
            <div className="p-4">
          {/* Header + Pencarian */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Daftar Layanan</h2>

            <div className="flex items-center gap-2">
              <button
                className="btn btn-primary"
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
                className="input input-bordered w-64"
              />
            </div>
          </div>

          {/* Modal Tambah */}
          <dialog id="modalTambah" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Tambah Layanan</h3>
              <p className="py-2">
                Isi form di bawah untuk menambah layanan baru.
              </p>

              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  name="kategori_pengguna"
                  value={form.kategori_pengguna}
                  onChange={handleChange}
                  placeholder="Kategori Pengguna"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="nama_layanan"
                  value={form.nama_layanan}
                  onChange={handleChange}
                  placeholder="Nama Layanan"
                  className="input input-bordered w-full"
                />
                <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    placeholder="Deskripsi Layanan"
                    className="textarea textarea-bordered w-full"
                    />

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("modalTambah").close()
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

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Kategori</th>
                  <th>Nama Layanan</th>
                  <th>Deskripsi</th>
                  <th>Aktif</th>
                  <th>Pilihan</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <th>
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </th>
                    <td>{item.kategori_pengguna}</td>
                    <td>{item.nama_layanan}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.status==="aktif"?(
                        <>
                          
                            <BadgeCheck className="text-green-500"/>
                        </>
                    ):
                        <>
                            <X className="text-red-500"/>
                        </>
                    }</td>
                    <td className="flex gap-1">
                      <button className="btn btn-xs btn-secondary">Hapus</button>
                      <button className="btn btn-xs btn-info">Lihat</button>
                      <button className="btn btn-xs btn-warning">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
        </>
    )
}