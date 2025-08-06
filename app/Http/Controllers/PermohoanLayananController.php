<?php

namespace App\Http\Controllers;

use App\Models\PermohoanLayanan;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\PermohonanTerkirim;
use Illuminate\Support\Facades\Mail;



class PermohoanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = PermohoanLayanan::with('tiket')->get();

    return Inertia::render('Dashboard', [
        'data' => $data
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
    // Validasi data termasuk id_layanan
    $validated = $request->validate([
        'id_layanan' => 'required|exists:layanans,id',
        'identitas_pengguna' => 'required|string',
        'nama_pemohon' => 'required|string|max:255',
        'email' => 'required|email',
        'no_hp' => 'required|string',
        'alamat' => 'required|string',
        'judul_layanan' => 'required|string',
        'keterangan_tambahan' => 'nullable|string',
        'file_lampiran' => 'required|file|mimes:pdf|max:2048',
    ]);

    // Simpan file jika ada
    if ($request->hasFile('file_lampiran')) {
        // $path = $request->file('file_lampiran')->store('lampiran', 'public');
        // $validated['file_lampiran'] = $path;
         $file = $request->file('file_lampiran');
    
    // Nama file unik (optional, bisa juga pakai originalName)
    $filename = time() . '_' . $file->getClientOriginalName();

    // Simpan ke folder public/lampiran
    $file->move(public_path('lampiran'), $filename);

    // Simpan path relatif ke database, jika diperlukan
    $validated['file_lampiran'] = 'lampiran/' . $filename;
    }

    // Tambahan data default
    $validated['status'] = 'menunggu';
    $validated['tanggal_pengajuan'] = now();
    $validated['kategori_pengguna'] = 'mahasiswa';

    // Simpan ke database
    $permohonan = PermohoanLayanan::create($validated);

    // Tiketing
    $tiketing = [
        'id_layanan' => $validated['id_layanan'],
        'id_permohonan_layanan' => $permohonan->id, // Dapatkan id terakhir
        'no_tiket' => $this->generateNoTiket(),
        'keterangan_tiket' => ''
    ];
    Tiket::create($tiketing);
    Mail::to($validated['email'])->send(new PermohonanTerkirim($permohonan, $tiketing));

    return response()->json([
        'message' => 'Permohonan berhasil disimpan',
        'data' => $permohonan,
        'tiket' => $tiketing
    ], 201);
}



    /**
     * Display the specified resource.
     */
    public function show(PermohoanLayanan $permohoanLayanan)
    {
        //
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermohoanLayanan $permohoanLayanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermohoanLayanan $permohoanLayanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermohoanLayanan $permohoanLayanan)
    {
        //
    }
    function generateNoTiket()
{
    $tanggal = now()->format('dmy'); // ddmmyy
    $unik = mt_rand(100, 999); // 3 digit acak

    return "IMK".$tanggal . $unik;
}
}
