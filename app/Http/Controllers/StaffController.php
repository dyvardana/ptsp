<?php

namespace App\Http\Controllers;

use App\Models\PermohoanLayanan;
use App\Models\TindakLanjut;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class StaffController extends Controller
{
    //
    public function index(Request $request){
          $userId = Auth::id(); // Ambil id user yang sedang login

    $data = DB::table('permohonan_layanans')
        ->join('layanans', 'permohonan_layanans.id_layanan', '=', 'layanans.id')
        ->join('tikets', 'permohonan_layanans.id', '=', 'tikets.id_permohonan_layanan')
        ->join('tindak_lanjuts','tindak_lanjuts.id_permohonan_layanan','=','permohonan_layanans.id')
        ->leftJoin('users', 'permohonan_layanans.id_users', '=', 'users.id') // Ubah di sini
        ->where('tindak_lanjuts.id_users', $userId) // 🔥 Filter berdasarkan user login
        ->select(
            'permohonan_layanans.id',
            'permohonan_layanans.id_layanan',
            'permohonan_layanans.identitas_pengguna',
            'permohonan_layanans.nama_pemohon',
            'permohonan_layanans.email',
            'permohonan_layanans.no_hp',
            'permohonan_layanans.alamat',
            'permohonan_layanans.kategori_pengguna',
            'permohonan_layanans.judul_layanan',
            'permohonan_layanans.keterangan_tambahan',
            'permohonan_layanans.tanggal_pengajuan',
            'permohonan_layanans.updated_at',
            'permohonan_layanans.status',
            'permohonan_layanans.file_lampiran',
            'layanans.nama_layanan',
            'tikets.no_tiket',
            'tikets.keterangan_tiket',
            'users.name',
            'tindak_lanjuts.catatan'
        )
        ->get();
         //  dd($data);
        return Inertia::render('DashboardStaff', [
            'title' => 'Dashboard - Staff',
            'data' => $data
        ]);
    }
  public function TindakLanjutStaff(Request $request)
{
 // dd($request);
 $validated = $request->validate([
        'file_lampiran' => 'required|file|mimes:pdf|max:2048',
        'id_permohonan' => 'required|exists:permohonan_layanans,id',
        'id_users' => 'required|exists:users,id', // optional, jika kamu ingin simpan siapa yang upload
        'no_tiket' => 'required|string', // optional, tergantung mau disimpan atau tidak
    ]);

    if ($request->hasFile('file_lampiran')) {
        $file = $request->file('file_lampiran');

        // Bersihkan nama file
        $originalName = preg_replace('/[^A-Za-z0-9\.\-_]/', '_', $file->getClientOriginalName());
        $filename = time() . '_' . $originalName;

        // Simpan file ke folder publik
        $file->move(public_path('tindak_lanjut'), $filename);
        $path = 'tindak_lanjut/' . $filename;

        // Update status permohonan
        PermohoanLayanan::where('id', $request->id_permohonan)->update([
            'status' => 'selesai'
        ]);
        TindakLanjut::where('id_permohonan_layanan',$request->id_permohonan)->update([
            'file_lampiran' => $path
        ]);
      

        return back()->with('success', 'Tindak lanjut berhasil disimpan.');
    }

    return back()->with('error', 'File lampiran tidak ditemukan.');
}

}
