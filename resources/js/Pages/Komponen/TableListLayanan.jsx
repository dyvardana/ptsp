import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import { BadgeCheck, X } from "lucide-react";
import axios from 'axios';

export default function TableListLayanan({ datalist }) {
  const [namaLayanan, setNamaLayanan] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState(datalist);
  const rowsPerPage = 10;
  const [hapus, setHapus] = useState(null);

  const handleDelete = (id) => {
      axios.delete(`/layanans/${id}`)
            .then(res => {
                alert(res.data.message);
                setList(prev => prev.filter(item => item.id !== id));
            })
            .catch(() => {
                alert("Gagal menghapus layanan.");
            });
};


  // form state untuk tambah
  const [form, setForm] = useState({
    kategori_pengguna: "",
    nama_layanan: "",
    deskripsi: "",
    status: "aktif",
    syarat: [""],
  });

  // form state untuk update
  const [editForm, setEditForm] = useState({
    id: null,
    nama_layanan:"",
    deskripsi: "",
    status: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/listLayanan", form, {
      onSuccess: (page) => {
        setList((prev) => [{ ...form, id: Date.now() }, ...prev]);
        document.getElementById("modalTambah").close();
        setForm({
          kategori_pengguna: "",
          nama_layanan: "",
          deskripsi: "",
          status: "",
        });
      },
      onError: (errors) => {
        alert("Terjadi kesalahan saat menambah layanan.");
      },
    });
  };

  // Handle edit (buka modal update)
 const handleEdit = async (id) => {
  try {
    const { data } = await axios.get(`/layananget/${id}`);
    setEditForm({
      id: data.id,
      nama_layanan:data.nama_layanan,
      deskripsi: data.deskripsi,
      status: data.status,
      syarat: data.syarat?.length ? data.syarat : [""],
    });
    document.getElementById("modalUpdate").showModal();
  } catch (error) {
    console.error("Gagal ambil data layanan", error);
  }
};

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!editForm.deskripsi.trim()) {
      alert("Deskripsi tidak boleh kosong!");
      return;
    }

    // Pastikan endpoint sesuai route Laravel: /layanans/{id}
    Inertia.put(`/layanans/${editForm.id}`, editForm, {
      onSuccess: () => {
        setList((prev) =>
          prev.map((item) =>
            item.id === editForm.id ? { ...item, ...editForm } : item
          )
        );
        document.getElementById("modalUpdate")?.close();
      },
      onError: () => {
        alert("Gagal update layanan.");
      },
    });
  };

  // Filter data
  const filteredData = list.filter(
    (item) =>
      item.kategori_pengguna.toLowerCase().includes(search.toLowerCase()) ||
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
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Daftar Layanan</h2>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("modalTambah").showModal()}
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

      

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>No</th>
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
                <th>{(currentPage - 1) * rowsPerPage + index + 1}</th>
                <td>{item.kategori_pengguna}</td>
                <td>{item.nama_layanan}</td>
                <td>{item.deskripsi}</td>
                <td>
                  {item.status === "aktif" ? (
                    <BadgeCheck className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                </td>
                <td className="flex gap-1">
                  <button className="btn btn-xs btn-secondary" 
                  onClick={() => {setHapus(item.id); setNamaLayanan(item.nama_layanan);
                    document.getElementById("modalHapus").showModal();}}>
                    Hapus</button>
                  <button className="btn btn-xs btn-info">Lihat</button>
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
              <option value="aktif">Aktif</option>
              <option value="tidak">Tidak Aktif</option>
            </select>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("modalTambah").close()}
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
            <p>Apakah Anda yakin ingin menghapus layanan {namaLayanan}? </p>
            <span className="text-red-500 text-xs">
              <strong>PERHATIAN:</strong> Tindakan ini dapat mengakibatkan kehilangan data yang tidak dapat dikembalikan.
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
      <dialog id="modalUpdate" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Layanan</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <span>Nama Layanan : {editForm.nama_layanan}</span>
          
            <textarea
              name="deskripsi"
              className="textarea textarea-bordered w-full"
              placeholder="Masukkan deskripsi layanan"
              value={editForm.deskripsi}
              onChange={(e) =>
                setEditForm({ ...editForm, deskripsi: e.target.value })
              }
              required
            />
            
            <select
              name="status"
              className="select select-bordered w-full"
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value })
              }
            >
              <option value="aktif">Aktif</option>
              <option value="tidak">Tidak Aktif</option>
            </select>

            {/* Input syarat */}
            <div>
              <label className="label">
                <span className="label-text">Syarat Layanan</span>
              </label>
              {editForm.syarat.map((syarat, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder={`Syarat ${idx + 1}`}
                    value={syarat}
                    onChange={(e) => {
                      const newSyarat = [...editForm.syarat];
                      newSyarat[idx] = e.target.value;
                      setEditForm({ ...editForm, syarat: newSyarat });
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      setEditForm({
                        ...editForm,
                        syarat: editForm.syarat.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() =>
                  setEditForm({ ...editForm, syarat: [...editForm.syarat, ""] })
                }
              >
                + Tambah Syarat
              </button>
            </div>

            {/* Action */}
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("modalUpdate").close()}
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

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
