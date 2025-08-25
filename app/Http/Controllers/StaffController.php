<?php

namespace App\Http\Controllers;

use App\Mail\PermohonanSelesai;
use App\Models\PermohoanLayanan;
use App\Models\Tiket;
use App\Models\TindakLanjut;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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
        return Inertia::render('Profile/Staff/DashboardStaff', [
            'title' => 'Dashboard - Staff',
            'data' => $data
        ]);
    }
  public function TindakLanjutStaff(Request $request)
{
    $validated = $request->validate([
        'file_lampiran' => 'required|file|mimes:pdf|max:2048',
        'id_permohonan' => 'required|exists:permohonan_layanans,id',
        'id_users' => 'required|exists:users,id', 
        'no_tiket' => 'required|string',
    ]);

    if ($request->hasFile('file_lampiran')) {
        $file = $request->file('file_lampiran');

        // Simpan ke storage/app/public/tindak_lanjut
        $path = $file->store('tindak_lanjut', 'public');
        // hasil contoh: "tindak_lanjut/1692456789_namafile.pdf"

        // Update status permohonan
        PermohoanLayanan::where('id', $request->id_permohonan)->update([
            'status' => 'selesai'
        ]);

        TindakLanjut::where('id_permohonan_layanan', $request->id_permohonan)->update([
            'file_lampiran' => $path // simpan path relative (tindak_lanjut/...)
        ]);

        $permohonan = PermohoanLayanan::find($request->id_permohonan);
        $tiketing = Tiket::where('no_tiket', $request->no_tiket)->first();

        Mail::to($permohonan->email)->send(new PermohonanSelesai($permohonan, $tiketing));

        return back()->with('success', 'Tindak lanjut berhasil disimpan.');
    }

    return back()->with('error', 'File lampiran tidak ditemukan.');
}

public function listuser(){
    
   $users = User::select('id', 'name', 'email', 'role')
    ->where('role', 'staff')
    ->get()
    ->keyBy('id');


    return Inertia::render('KelolaStaff', [
        'title' => 'Kelola Staff',
        'staff' => $users
    ]);
}

}
