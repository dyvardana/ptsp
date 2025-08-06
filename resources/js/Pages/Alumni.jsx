import React, { useState } from "react";

export default function Alumni() {
  const [form, setForm] = useState({
    nama: "",
    nim: "",
    nik: "",
    alamat: "",
    pekerjaan: "",
    telepon: "",
    email: "",
    informasi: "",
    tujuan: "",
    cara_mendapatkan: "",
    cara_mendapatkan_salinan: "",
    file_identitas: null,
  });

  const [layananTerpilih, setLayananTerpilih] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("Data dikirim:", form);
  };

  const layananMahasiswa = {
    "Izin Penelitian Mahasiswa": [
      "Surat Permohonan Izin Penelitian dari Mahasiswa",
      "Surat Pengantar dari Fakultas atau Prodi",
      "Proposal Penelitian",
      "Fotokopi KTM",
    ],
    Kemahasiswaan: [
      "Surat dari BEM atau organisasi kemahasiswaan",
      "Surat kuasa (jika mewakili orang lain)",
    ],
  };

  return (
    <div className="pt-32 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl font-bold">
              Form Permohonan Informasi Alumni
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* INFORMASI PEMOHON */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Informasi Mahasiswa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="nim"
                    value={form.nim}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="NIM"
                    required
                />

                {/* NIK + Tombol Cek dalam 1 baris */}
                <div className="flex gap-2">
                    <input
                    type="text"
                    name="nik"
                    value={form.nik}
                    onChange={handleChange}
                    className="input input-bordered flex-1"
                    placeholder="NIK"
                    required
                    />
                    <button className="btn btn-accent whitespace-nowrap">Cek</button>
                </div>

                <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Nama Lengkap"
                    required
                />

                <input
                    type="text"
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="No. HP"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input input-bordered w-full md:col-span-2"
                    placeholder="Email"
                />

                <textarea
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    className="textarea textarea-bordered md:col-span-2"
                    placeholder="Alamat Lengkap"
                    rows="2"
                    required
                ></textarea>
                </div>

              </div>

              {/* RINCIAN PERMOHONAN */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Rincian Permohonan</h3>
                <div className="space-y-4">
                  {/* Pilih Layanan */}
                  <select
                    value={layananTerpilih}
                    onChange={(e) => setLayananTerpilih(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>Pilih Layanan</option>
                    {Object.keys(layananMahasiswa).map((layananNama) => (
                      <option key={layananNama} value={layananNama}>
                        {layananNama}
                      </option>
                    ))}
                  </select>

                  {/* Persyaratan */}
                  {layananTerpilih && (
                    <div className="bg-gray-100 p-4 rounded text-sm text-gray-700 border border-gray-300">
                      <strong>Persyaratan untuk layanan {layananTerpilih}:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {layananMahasiswa[layananTerpilih].map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <input type="text" name="judul" className="input input-bordered w-full" placeholder="Judul" required />
                  <textarea name="informasi" value={form.informasi} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Rincian Informasi yang Dibutuhkan" rows="3" required></textarea>

                  <select name="cara_mendapatkan" value={form.cara_mendapatkan} onChange={handleChange} className="select select-bordered w-full" required>
                    <option value="">Cara Mendapatkan Informasi</option>
                    <option value="Melihat/Membaca/Mendengarkan/Mencatat">Melihat / Membaca / Mencatat / Mendengar</option>
                    <option value="Mendapatkan salinan">Mendapatkan Salinan</option>
                  </select>

                  <select name="cara_mendapatkan_salinan" value={form.cara_mendapatkan_salinan} onChange={handleChange} className="select select-bordered w-full" required>
                    <option value="">Cara Mendapatkan Salinan Informasi</option>
                    <option value="Mengambil langsung">Mengambil Langsung</option>
                    <option value="Kurir">Kurir</option>
                    <option value="Pos">Pos</option>
                    <option value="Faksimili">Faksimili</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>
                  <div className="form-control md:col-span-2">
                    <label className="label">Unggah berkas pendukung</label>
                    <input type="file" name="berkas" onChange={handleChange} accept=".pdf" className="file-input file-input-bordered w-full" required />
                  </div>
              <div className="card-actions justify-end pt-4">
                <button type="submit" className="btn btn-primary">
                  Kirim Permohonan
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
