import { Inertia } from '@inertiajs/inertia';
import { useState, useMemo } from 'react';
import { usePage } from '@inertiajs/react';
export default function TableLayanan({ data }) {
  const dummyData = data;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState('');
  const [idTolak, setIdTolak] = useState('');
  const [email, setEmail] = useState('');
  const [noTiket, setNoTiket]=useState('');
  const itemsPerPage = 10;
  const user = usePage().props.auth.user;


  const filteredData = useMemo(() => {
    return dummyData.filter(item =>
      Object.values(item).some(val =>
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
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    setShowTolakModal(false);
    setAlasanTolak('');
  };

  const handleTolak = () => {
    console.log('Ditolak dengan alasan:', idTolak);
    // Kirim ke backend jika perlu
    
    Inertia.post(route('tolak',{id:idTolak,email:email,keterangan_tiket:alasanTolak,idUser:user.id,no_tiket:noTiket}));
    console.log(noTiket);
    closeModal();
  };

  const handleTerima = () => {
    console.log('Diterima:', idTolak);
    // Kirim ke backend jika perlu
    closeModal();
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
                  <td>{item.nama_layanan}</td>
                  <td>{item.tanggal_pengajuan}</td>
                  <td>
                     <span className={
                      item.status === 'menunggu' ? 'badge-xs badge badge-neutral' :
        item.status === 'diproses' ? 'badge-xs badge badge-warning' :
        item.status === 'selesai' ? 'badge-xs badge badge-success' :
        item.status === 'ditolak' ? 'badge-xs badge badge-error' :
        'badge'
      }>
        {item.status}
      </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() => {openModal(item); {setIdTolak(item.id)}}}
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

      {/* MODAL DETAIL */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-5xl flex gap-4">
            {/* Kiri: File */}
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

            {/* Kanan: Detail */}
            <div className="w-1/2 overflow-y-auto max-h-[500px]">
              <h3 className="text-lg font-bold mb-4">Detail Pengajuan</h3>
              <ul className="text-sm space-y-1">
                <li><strong>No Tiket:</strong> {selectedItem.no_tiket ?? 'Belum ada tiket'}</li>
                <li><strong>Nama:</strong> {selectedItem.nama_pemohon}</li>
                <li><strong>NIK/NIM:</strong> {selectedItem.identitas_pengguna}</li>
                <li><strong>Email:</strong> {selectedItem.email}</li>
                <li><strong>No HP:</strong> {selectedItem.no_hp}</li>
                <li><strong>Alamat:</strong> {selectedItem.alamat}</li>
                 <li><strong>Kategori:</strong> {selectedItem.kategori_pengguna}</li>
                 <li><strong>Layanan:</strong> {selectedItem.nama_layanan}</li>
                <li><strong>Judul Layanan:</strong> {selectedItem.judul_layanan}</li>
                <li><strong>Tanggal Pengajuan:</strong> {selectedItem.tanggal_pengajuan}</li>
                <li><strong>Keterangan:</strong> {selectedItem.keterangan_tambahan}</li>
                <li><strong>Status:</strong> {selectedItem.status}</li>
              </ul>
             
              <div className="mt-6 flex justify-end gap-2">
                {selectedItem.status==="ditolak" || selectedItem.status==="diproses" || selectedItem.status==="selesai" ? (
                  <button className="btn" onClick={()=>{closeModal(); setIdTolak('')}}>Tutup</button>
                ) : (
                  <>
                <button className="btn btn-secondary" onClick={() => {setShowTolakModal(true); setEmail(selectedItem.email);setNoTiket(selectedItem.no_tiket)}}>Tolak</button>
                <button className="btn btn-success" onClick={()=>{handleTerima()}}>Terima</button>
                <button className="btn" onClick={()=>{closeModal(); setIdTolak('')}}>Tutup</button>
               </> )
                }
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ALASAN TOLAK */}
      {showTolakModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Alasan Penolakan</h2>
            <textarea
              className="textarea text-white textarea-bordered w-full mb-4"
              rows="4"
              placeholder="Tuliskan alasan penolakan..."
              value={alasanTolak}
              onChange={(e) => setAlasanTolak(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setShowTolakModal(false)}>Batal</button>
              <button className="btn btn-error" onClick={()=> {handleTolak()}}>Kirim</button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
