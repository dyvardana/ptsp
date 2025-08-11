import { Inertia } from '@inertiajs/inertia';
import { useState, useMemo } from 'react';
import { usePage } from '@inertiajs/react';
import {
  Clock,Eye,ListChecks,Loader2,CheckCircle,XCircle} from 'lucide-react';
export default function TableLayanan({ data,staff }) {
 // console.log(data);
 // State Utama
const user = usePage().props.auth.user;
const dummyData = data;
const itemsPerPage = 10;

// State untuk Pencarian dan Pagination
const [search, setSearch] = useState('');
const [page, setPage] = useState(1);

// State untuk Modal dan Data Terpilih
const [selectedItem, setSelectedItem] = useState(null);
const [showModal, setShowModal] = useState(false);

// State Modal Tolak
const [showTolakModal, setShowTolakModal] = useState(false);
const [alasanTolak, setAlasanTolak] = useState('');
const [idTolak, setIdTolak] = useState('');
const [email, setEmail] = useState('');
const [noTiket, setNoTiket] = useState('');

// State Modal Kirim Berkas
const [showKirimModal, setShowKirimModal] = useState(false);
const [fileKirim, setFileKirim] = useState(null);
const [catatanKirim, setCatatanKirim] = useState('');
const [selectedStaff, setSelectedStaff] = useState('');
const [staffList, setStaffList] = useState(usePage().props.staff || []);

// State untuk Lihat Tindak Lanjut
const [tglSelesai, setTglSelesai] = useState(null);
const [namaTindakLanjut, setNamaTindakLanjut] = useState(null);
const [tglTindakLanjut, setTglTindakLanjut] = useState(null);

// Filter dan Pagination
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

// Fungsi Modal
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

// Fungsi Tolak
const handleTolak = () => {
  console.log('Ditolak dengan alasan:', idTolak);
  Inertia.post(route('tolak', {
    id: idTolak,
    email: email,
    keterangan_tiket: alasanTolak,
    idUser: user.id,
    no_tiket: noTiket,
  }));
  closeModal();
};

// Fungsi Terima
const handleTerima = () => {
  console.log('Diterima:', idTolak);
  Inertia.post(route('terima', {
    id: idTolak,
    idUser: user.id,
    no_tiket: noTiket,
  }));
  closeModal();
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

  console.log('form data:', formData);

  Inertia.post(route("tindakLanjut"), formData, {
    forceFormData: true,
    onSuccess: () => {
      setShowKirimModal(false);
      setSelectedStaff('');
      setCatatanKirim('');
      closeModal();
    },
  });
};

// Fungsi Lihat Tindak Lanjut
const handleLihatTindakLanjut = async (id_kirim) => {
  try {
    const response = await axios.post('cekTindakLanjut', {
      id_permohonan: id_kirim,
    });

    console.log('response axios:', response.data);

    setNamaTindakLanjut(response.data.name);
    setTglSelesai(response.data.updated_at);
    setTglTindakLanjut(response.data.created_at);
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
};
  return (
    <>
      {/* TABEL */}
      <div className="mockup-window border border-base-300 bg-base-100 p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Permohonan Layanan</h2>
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
                <th>Tiket</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Layanan</th>
                <th>Tanggal Pengajuan</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.no_tiket}</td>
                  <td>{item.nama_pemohon}</td>
                  <td>{item.kategori_pengguna}</td>
                  <td>{item.nama_layanan}</td>
                  <td>{item.tanggal_pengajuan}</td>
                  <td>
                    <span className={
                      item.status === 'menunggu' ? 'badge-xs badge badge-neutral flex items-center gap-1' :
                      item.status === 'diproses' ? 'badge-xs badge badge-warning flex items-center gap-1' :
                      item.status === 'diterima' ? 'badge-xs badge badge-info flex items-center gap-1' :
                      item.status === 'selesai' ? 'badge-xs badge badge-success flex items-center gap-1' :
                      item.status === 'ditolak' ? 'badge-xs badge badge-error flex items-center gap-1' :
                      'badge'
                    }>
                      {item.status === 'menunggu' && <Clock size={14} />}
                      {item.status === 'diproses' && <Loader2 size={14} className="animate-spin" />}
                       {item.status === 'diterima' && <ListChecks size={14} />}
                      {item.status === 'selesai' && <CheckCircle size={14} />}
                      {item.status === 'ditolak' && <XCircle size={14} />}
                      <span className="capitalize">{item.status}</span>
                    </span>
                  </td>
                 <td>
                    {item.rating?(
                        <>
                          {'★'.repeat(Math.round(item.rating)) + '☆'.repeat(5 - Math.round(item.rating))}
                        </>
                    ):null}
                        
                  </td>

                  <td>
                    <button
                      className="btn btn-xs btn-accent "
                      onClick={() => {openModal(item);handleLihatTindakLanjut(item.id); {setIdTolak(item.id);setEmail(item.email);setNoTiket(item.no_tiket)}}}
                    > <Eye/>
                      Detail
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
                <li>
                    <strong>Status:</strong>{' '}
                    <span
                      className={
                        selectedItem.status === 'diproses'
                          ? 'text-yellow-500'
                          : selectedItem.status === 'menunggu'
                          ? 'text-gray-800'
                          : selectedItem.status === 'diterima'
                          ? 'text-blue-500'
                          : selectedItem.status === 'selesai'
                          ? 'text-green-500'
                          : selectedItem.status === 'ditolak'
                          ? 'text-red-500'
                          : ''
                      }
                    >
                      {selectedItem.status}
                    </span>
                  </li>

               
                {selectedItem.status==="ditolak"? (
                  <>
                    <li><strong>Alasan Penolakan:</strong> {selectedItem.keterangan_tiket}</li>
                    <li><strong>Admin:</strong> {selectedItem.name}</li>
                  </>
                ):
                selectedItem.status==="diproses" ? (
                  <>
                   <li><strong>Admin:</strong> {selectedItem.name}</li>
                   <li><strong>Staff</strong> {namaTindakLanjut}</li>
                  <li><strong>Tindak Lanjut</strong> {tglTindakLanjut}</li>
                  </>
                ):selectedItem.status==="selesai" ? (
                  <>
                    <li><strong>Admin:</strong> {selectedItem.name}</li>
                     <li><strong>Tindak Lanjut</strong> {tglTindakLanjut}</li>
                   <li><strong>Tgl Selesai:</strong> {tglSelesai}</li>
                    <li><strong>Staff</strong> {namaTindakLanjut}</li>
                  </>
                ):null
                }
              </ul>
             
              <div className="mt-6 flex justify-end gap-2">
              {selectedItem.status === "ditolak" ? (
                  <button className="btn" onClick={() => { closeModal(); setIdTolak(''); }}>
                    Tutup
                  </button>
                ) : selectedItem.status === "diterima" ? (
                  <>
                    <button className="btn btn-primary" onClick={() => setShowKirimModal(true)}>
                  Teruskan Ke Staff
                </button>

                    <button className="btn" onClick={() => { closeModal(); setIdTolak(''); }}>
                      Tutup
                    </button>
                  </>
                ) : 
                selectedItem.status === "diproses" ? (
                  <>
                    <button className="btn btn-primary" >
                  Ubah Tujuan
                </button>

                    <button className="btn" onClick={() => { closeModal(); setIdTolak(''); }}>
                      Tutup
                    </button>
                  </>
                ): selectedItem.status === "selesai" ?
                (
                  <>
                   
                    <button className="btn btn-success" onClick={handleLihatTindakLanjut}>
                      Lihat Tindak Lanjut
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        closeModal();
                        setIdTolak('');
                        setEmail('');
                        setNoTiket('');
                      }}
                    >
                      Tutup
                    </button>
                  </>
                ): selectedItem.status === "menunggu" ?
                (
                  <>
                    <button
                        className="btn btn-error"
                        onClick={() => {
                          setShowModal(false); // tutup modal detail
                          setShowTolakModal(true); // buka modal tolak
                        }}
                      >
                        Tolak Pengajuan
                    </button>
                    <button className="btn btn-accent" onClick={() => { closeModal(); handleTerima() }}>
                      Terima Pengajuan
                    </button>
                    <button className="btn" onClick={() => { closeModal(); setIdTolak(''); }}>
                      Tutup
                    </button>
                  </>
                ):null
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
      {showKirimModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">Teruskan ke Staff</h2>

          <select
              className="select text-white select-bordered w-full mb-4"
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
        className="textarea text-white textarea-bordered w-full mb-4"
        rows="4"
        placeholder="Catatan tambahan..."
        value={catatanKirim}
        onChange={(e) => setCatatanKirim(e.target.value)}
      ></textarea>

      <div className="flex justify-end gap-2">
        <button className="btn" onClick={() => setShowKirimModal(false)}>
          Batal
        </button>
        <button className="btn btn-success" onClick={handleKirimBerkas}>
          Teruskan
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}

