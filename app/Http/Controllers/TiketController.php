<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Support\Facades\DB;
use App\Models\Tiket;
use App\Models\TindakLanjut;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $request->validate([
        'tiket' => 'required|string',
    ]);

    $data = DB::table('layanans')
        ->join('permohonan_layanans', 'layanans.id', '=', 'permohonan_layanans.id_layanan')
        ->join('tikets', 'tikets.id_permohonan_layanan', '=', 'permohonan_layanans.id')
       // ->join('tindak_lanjuts', 'tindak_lanjuts.id_permohonan_layanan', '=', 'permohonan_layanans.id')
        ->where('tikets.no_tiket', $request->tiket)
        ->select(
            'layanans.nama_layanan',
            'permohonan_layanans.identitas_pengguna',
            'permohonan_layanans.nama_pemohon',
            'permohonan_layanans.email',
            'permohonan_layanans.no_hp',
            'permohonan_layanans.alamat',
            'permohonan_layanans.kategori_pengguna',
            'permohonan_layanans.judul_layanan',
            'permohonan_layanans.keterangan_tambahan',
            'permohonan_layanans.tanggal_pengajuan',
            'permohonan_layanans.status',
            'tikets.no_tiket',
         //   'tindak_lanjuts.file_lampiran',
         //   'tindak_lanjuts.updated_at'
        )
        ->first();

    if (!$data) {
        return response()->json(['message' => 'Tiket tidak ditemukan.'], 404);
    }

    return response()->json([
        'message' => 'Tiket ditemukan.',
        'tiket' => $data,
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
   public function show($no_tiket)
{
   $data = DB::table('layanans')
    ->join('permohonan_layanans', 'layanans.id', '=', 'permohonan_layanans.id_layanan')
    ->join('tikets', 'tikets.id_permohonan_layanan', '=', 'permohonan_layanans.id')
    ->where('tikets.no_tiket', $no_tiket)
    ->select(
        'layanans.nama_layanan',
        'permohonan_layanans.id as id_permohonan_layanan', // ✅ penting untuk query tindak lanjut
        'permohonan_layanans.identitas_pengguna',
        'permohonan_layanans.nama_pemohon',
        'permohonan_layanans.email',
        'permohonan_layanans.no_hp',
        'permohonan_layanans.alamat',
        'permohonan_layanans.kategori_pengguna',
        'permohonan_layanans.judul_layanan',
        'permohonan_layanans.keterangan_tambahan',
        'permohonan_layanans.tanggal_pengajuan',
        'permohonan_layanans.status',
        'permohonan_layanans.updated_at',
        'tikets.no_tiket',
        'tikets.keterangan_tiket'
    )
    ->first();

if (!$data) {
    return redirect()
        ->route('cekTiket')
        ->withErrors(['tiket' => 'Tiket tidak ditemukan !']);
}

// Gunakan first() langsung, jika tidak ada otomatis null
$tindakLanjut = TindakLanjut::where('id_permohonan_layanan', $data->id_permohonan_layanan)->first() ?? null;
$feedback = Feedback::where('id_permohonan_layanan', $data->id_permohonan_layanan)->first() ?? null;
return Inertia::render('CekTiket', [
    'data' => $data,
    'tindak_lanjut' => $tindakLanjut, // null jika tidak ada
    'feedback'=>$feedback,
]);

}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tiket $tiket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tiket $tiket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tiket $tiket)
    {
        //
    }
}
