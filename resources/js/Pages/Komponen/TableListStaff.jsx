import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function TableListStaff({ staff }) {
  const listStaff = Object.values(staff || {});

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
    const { data, setData, post, processing, errors, reset } = useForm({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    
  // Filter berdasarkan pencarian
  const filteredData = listStaff.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const openModal = () => {
    document.getElementById('modalTambahStaff').showModal();
  };
  const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
  return (
    <div className="w-full h-screen p-4 bg-base-100">
      {/* Header tabel */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold">Daftar Staff</h1>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={openModal}
            >
              + Tambah Staff
            </button>
            <input
              type="text"
              placeholder="Cari nama staff"
              className="input input-bordered w-full sm:w-64"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>


      {/* Tabel */}
      <div className="overflow-x-auto h-[70vh]">
  <table className="table w-full">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th className="hidden sm:table-cell">Email</th>
        <th className="hidden md:table-cell">Role</th>
        <th>Pilihan</th>
      </tr>
    </thead>
    <tbody>
      {displayedData.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{item.name}</div>
              </div>
            </div>
          </td>

          {/* Email hanya tampil mulai ukuran sm */}
          <td className="hidden sm:table-cell">{item.email}</td>

          {/* Role hanya tampil mulai ukuran md */}
          <td className="hidden md:table-cell">{item.role}</td>

          <td className="flex flex-col sm:flex-row gap-1">
            <button className="btn btn-xs btn-secondary w-full sm:w-auto">Hapus</button>
            <button className="btn btn-xs btn-info w-full sm:w-auto">Lihat</button>
            <button className="btn btn-xs btn-warning w-full sm:w-auto">Update</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-primary btn-xs"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary btn-xs"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal Tambah Staff */}
      <dialog id="modalTambahStaff" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tambah Staff</h3>
          <form method="dialog" className="flex flex-col gap-3" onSubmit={submit}>
            <input
              type="text"
              placeholder="Nama"
              className="input input-bordered w-full"
              id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              id="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
            />
            <input
              
              className="input input-bordered w-full"
              id="password"
              placeholder='password'
                type="password"
                name="password"
                value={data.password}
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
            />
            <input
            placeholder='Konfirmasi Password'
                 id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="input input-bordered w-full"
                autoComplete="new-password"
                onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                }
                required
            />
            <select className="select select-bordered w-full">
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>

            <div className="modal-action">
              <button className="btn"  onClick={() => document.getElementById('modalTambahStaff').close()}>Batal</button>
              <button className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
