import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Mahasiswa() {
  const [datamahasiswaValid, setDatamahasiswaValid] = useState(false);
  const [statusMahasiswa, setStatusMahasiswa] = useState("");

  const [form, setForm] = useState({
    id_layanan:"",
    nama_pemohon: "",
    nim: "",
    identitas_pengguna: "",
    alamat: "",
    pekerjaan: "mahasiswa",
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
    try {
      const res = await fetch("https://stahnmpukuturan.ac.id/api/cekmahasiswa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nik: form.nik, nipd: form.identitas_pengguna }),
      });
      const data = await res.json();
      if (data && data.user && data.user.nama) {
        setForm((prev) => ({
          ...prev,
          nama_pemohon: data.user.nama,
          alamat: data.user.jln || "",
          no_hp: data.user.phone || "",
          email: data.user.email || "",
        }));
        setStatusMahasiswa(data.user.status === "AKTIF" ? "AKTIF" : "NONAKTIF");
        setDatamahasiswaValid(true);
      } else {
        setDatamahasiswaValid(false);
        alert("Data mahasiswa tidak ditemukan.");
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      alert("Terjadi kesalahan saat mengambil data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post("/permohonan-layanan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Berhasil:", response.data.message, response.data.data, response.data.tiket);
      alert("Data berhasil dikirim dengan nomor tiket : "+ response.data.tiket.no_tiket);
    } catch (error) {
      if (error.response?.status === 422) {
        console.error("Validasi gagal:", error.response.data.errors);
        alert("Validasi gagal:\n" + JSON.stringify(error.response.data.errors));
      } else {
        console.error("Gagal:", error);
        alert("Terjadi kesalahan saat mengirim data.");
      }
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
    <div className=" px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl font-bold">
              Form Permohonan Informasi Mahasiswa
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* INFORMASI MAHASISWA */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Informasi Mahasiswa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="identitas_pengguna" value={form.identitas_pengguna} onChange={handleChange} className="input input-bordered w-full" placeholder="NIM" required />

                  <div className="flex gap-2">
                    <input type="text" name="nik" value={form.nik} onChange={handleChange} className="input input-bordered flex-1" placeholder="NIK" required />
                    <button type="button" className="btn btn-accent whitespace-nowrap" onClick={handleCekDataMahasiswa}>Cek</button>
                  </div>

                  <input type="text" name="nama_pemohon" value={form.nama_pemohon} onChange={handleChange} className="input input-bordered w-full" placeholder="Nama Lengkap" readOnly required />

                  <input type="text" name="no_hp" value={form.no_hp} onChange={handleChange} className="input input-bordered w-full" placeholder="No. HP" readOnly required />

                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" placeholder="Email" readOnly />

                  <textarea name="alamat" value={form.alamat} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Alamat Lengkap" rows="2" readOnly required></textarea>
                </div>
              </div>

              {/* RINCIAN PERMOHONAN */}
              {datamahasiswaValid && statusMahasiswa === "AKTIF" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rincian Permohonan</h3>
                  <div className="space-y-4">
                   <select name="id_layanan"
                      className="select select-bordered w-full"
                      value={layananTerpilih}
                      onChange={(e) => {
                        setLayananTerpilih(e.target.value);
                        setForm({
                          ...form,
                          id_layanan: e.target.value,
                          judul_layanan:
                            layananMahasiswa.find((l) => l.id.toString() === e.target.value)
                              ?.nama_layanan || "",
                        });
                      }}
                    >
                      <option value="" disabled>Pilih Layanan</option>
                      {layananMahasiswa.map((layanan) => (
                        <option key={layanan.id} value={layanan.id}>
                          {layanan.nama_layanan}
                        </option>
                      ))}
                    </select>



                  {layananTerpilih && (
                      <div className="mt-4 bg-gray-100 p-4 rounded shadow">
                        <h3 className="font-semibold mb-2">
                          Persyaratan untuk layanan{" "}
                          {
                            layananMahasiswa.find((l) => l.id.toString() === layananTerpilih)
                              ?.nama_layanan
                          }
                        </h3>
                        <ul className="list-disc list-inside">
                          {layananMahasiswa
                            .find((l) => l.id.toString() === layananTerpilih)
                            ?.persyaratan.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                    <textarea name="keterangan_tambahan" value={form.keterangan_tambahan} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Rincian Informasi yang Dibutuhkan" rows="3" required></textarea>
                    <div className="form-control md:col-span-2">
                      <label className="label">Unggah berkas pendukung</label>
                      <input type="file" name="file_lampiran" onChange={handleChange} accept=".pdf" className="file-input file-input-bordered w-full" required />
                    </div>

                    <div className="card-actions justify-end pt-4">
                      <button type="submit" className="btn btn-primary">Kirim Permohonan</button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
