import { useState, useMemo } from 'react';

export default function TableLayanan(props) {
  console.log(props);
  const dummyData = props.data;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null); // ⬅️ Untuk modal
  const [showModal, setShowModal] = useState(false); // ⬅️ Untuk toggle modal
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return dummyData.filter(item =>
      Object.values(item).some(val =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <>
      {/* TABEL */}
      <div className="mockup-window border border-base-300 bg-base-100 p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Layanan</h2>
          <input
            type="text"
            placeholder="Cari..."
            className="input input-bordered input-sm w-full max-w-xs"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>No</th>
                <th>Identitas</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Layanan</th>
                <th>Tanggal Pengajuan</th>
                <th>Status</th>
                <th>Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.identitas_pengguna}</td>
                  <td>{item.nama_pemohon}</td>
                  <td>{item.kategori_pengguna}</td>
                  <td>{item.id_layanan}</td>
                  <td>{item.tanggal_pengajuan}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() => openModal(item)}
                    >
                      Lihat
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
            Menampilkan {(page - 1) * itemsPerPage + 1} -{' '}
            {Math.min(page * itemsPerPage, filteredData.length)} dari {filteredData.length}
          </div>
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`join-item btn btn-sm ${page === i + 1 ? 'btn-active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="join-item btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedItem && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-5xl flex gap-4">
      {/* Preview PDF di kiri */}
      <div className="w-1/2 h-[500px] border rounded overflow-hidden">
        {selectedItem.file_lampiran ? (
          <iframe
            src={`/${selectedItem.file_lampiran}`}
            className="w-full h-full"
            title="Preview PDF"
          ></iframe>
        ) : (
          <div className="text-center p-4">Tidak ada file yang diunggah.</div>
        )}
      </div>

      {/* Detail Pengajuan di kanan */}
      <div className="w-1/2 overflow-y-auto max-h-[500px]">
        <h3 className="text-lg font-bold mb-4">Detail Pengajuan</h3>
        <ul className="text-sm space-y-1">
          <li><strong>No Tiket:</strong> {selectedItem.tiket.no_tiket}</li>
          <li><strong>Nama:</strong> {selectedItem.nama_pemohon}</li>
          <li><strong>NIK/NIM:</strong> {selectedItem.identitas_pengguna}</li>
          <li><strong>Email:</strong> {selectedItem.email}</li>
          <li><strong>No HP:</strong> {selectedItem.no_hp}</li>
          <li><strong>Alamat:</strong> {selectedItem.alamat}</li>
          <li><strong>Judul Layanan:</strong> {selectedItem.judul_layanan}</li>
          <li><strong>Keterangan:</strong> {selectedItem.keterangan_tambahan}</li>
          <li><strong>Kategori:</strong> {selectedItem.kategori_pengguna}</li>
          <li><strong>Layanan:</strong> {selectedItem.id_layanan}</li>
          <li><strong>Tanggal Pengajuan:</strong> {selectedItem.tanggal_pengajuan}</li>
          <li><strong>Status:</strong> {selectedItem.status}</li>
        </ul>
        <div className="mt-4 text-right">
             <button className="btn  btn-secondary" >Tolak</button> 
              <button className="btn  btn-success" >Terima</button> 
          <button className="btn " onClick={closeModal}>Tutup</button>
       
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
}
