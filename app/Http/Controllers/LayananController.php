<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\PersyaratanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $kategori = $request->input('kategori');

    if (!$kategori) {
        return redirect('/');
    }

    return Inertia::render('InputLayanan', [
        'kategori' => $kategori,
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Jika diperlukan, bisa return view atau Inertia
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'kategori_pengguna' => 'required|string|max:255',
        'nama_layanan'      => 'required|string|max:255',
        'deskripsi'         => 'required|string|max:255',
        'status'            => 'required|in:aktif,tidak',
    ]);

    $layanan = Layanan::create($validated);

    // Kalau request dari Inertia (via fetch/axios), kirim JSON
    if ($request->wantsJson()) {
        return response()->json($layanan);
    }

    // Default fallback
    return redirect()->route('listLayanan');
}


    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // Tampilkan detail layanan
        $list = Layanan::get();
        return Inertia::render('LayananList',[
            'title'=>'layanan',
            'list' => $list
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Layanan $layanan)
    {
        // Tampilkan form edit layanan
    }

    /**
     * Update the specified resource in storage.
     */
     public function update(Request $request, $id)
    {
        // Validasi input
        $validated = $request->validate([
            'deskripsi' => 'required|string',
            'status' => 'required|in:aktif,tidak',
            'syarat' => 'array', // daftar syarat
            'syarat.*' => 'required|string'
        ]);

        DB::transaction(function () use ($validated, $id) {
            // 1. Update data layanan
            $layanan = Layanan::findOrFail($id);
            $layanan->update([
                'deskripsi' => $validated['deskripsi'],
                'status' => $validated['status']
            ]);

            // 2. Update persyaratan
            // Hapus semua syarat lama
            PersyaratanLayanan::where('id_layanan', $id)->delete();
            
            // Tambahkan syarat baru
            foreach ($validated['syarat'] as $syarat) {
                PersyaratanLayanan::create([
                    'id_layanan' => $id,
                    'persyaratan' => $syarat
                ]);
            }
        });
       // dd($request);
        return redirect()->back()->with('success', 'Layanan berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Layanan $layanan)
    {
        // Hapus layanan
    }

    /**
     * API: Ambil layanan untuk kategori mahasiswa dan daftar persyaratannya.
     */
    public function getLayananMahasiswa()
    {
        $layanans = Layanan::with('persyaratan')
            ->where('kategori_pengguna', 'mahasiswa')
            ->where('status','aktif')
            ->get();

        $result = [];

        foreach ($layanans as $layanan) {
    $result[] = [
        'id' => $layanan->id,
        'nama_layanan' => $layanan->nama_layanan,
        'persyaratan' => $layanan->persyaratan->pluck('persyaratan')->toArray()
    ];
}

      
        
        return response()->json($result);

    }
public function persyaratan($id)
{
    $layanan = Layanan::with('persyaratan')->find($id);

    if (!$layanan) {
        return response()->json([
            'success' => false,
            'message' => 'Layanan tidak ditemukan'
        ], 404);
    }

    // Ambil daftar persyaratan saja
    $syarat = $layanan->persyaratan
        ->pluck('persyaratan')
        ->filter()
        ->values()
        ->toArray();

    // Kalau kosong, isi array dengan 1 elemen string kosong
    if (empty($syarat)) {
        $syarat = [""];
    }

    return response()->json([
    'success' => true,
    'id' => $layanan->id,
    'deskripsi' => $layanan->deskripsi, // tambahkan
    'status' => $layanan->status,       // tambahkan
    'nama_layanan' => $layanan->nama_layanan,
    'syarat' => $syarat
]);

}



}
