<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\Request;
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
     
    }

    /**
     * Display the specified resource.
     */
    public function show(Layanan $layanan)
    {
        // Tampilkan detail layanan
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
    public function update(Request $request, Layanan $layanan)
    {
        // Lakukan update data
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
}
