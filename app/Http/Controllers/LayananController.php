<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\PersyaratanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class LayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function select(Request $request)
{
    $kategori = $request->input('kategori');

    if (!$kategori) {
        return redirect('/');
    }

    $now = Carbon::now('Asia/Makassar'); // timezone WITA

    // ======================
    // 1️⃣ Hari Sabtu/Minggu
    // ======================
    $isWeekend = $now->isWeekend();

    // ======================
    // 2️⃣ Hari Libur Nasional / Tanggal Tambahan
    // ======================
    $liburTambahan = [
        '2026-01-01', // Tahun Baru Masehi
        '2026-01-20', // Imlek
        '2026-03-11', // Nyepi
        '2026-04-10', // Contoh Hari Libur Lain
        '2026-05-01', // Hari Buruh
        '2026-12-25', // Natal
        '2026-12-26', // Hari Libur Tambahan
    ];
    $isHoliday = in_array($now->toDateString(), $liburTambahan);

    // ======================
    // 3️⃣ Jam operasional
    // ======================
    $startTime = Carbon::createFromTime(8, 0, 0, 'Asia/Makassar');  // 08:00 WITA
    $endTime   = Carbon::createFromTime(15, 30, 0, 'Asia/Makassar'); // 15:30 WITA
    $isOutsideHours = $now->lt($startTime) || $now->gt($endTime);

    // ======================
    // 4️⃣ Gabungkan semua pengecekan
    // ======================
    $isLibur = $isWeekend || $isHoliday || $isOutsideHours;

    // Opsional: alasan libur
    $liburReason = '';
    if ($isWeekend) {
        $liburReason = 'Hari libur: Sabtu / Minggu';
    } elseif ($isHoliday) {
        $liburReason = 'Hari libur nasional / Fakultatif Daerah';
    } elseif ($isOutsideHours) {
        $liburReason = 'Di luar jam operasional (08:00-15:30 WITA)';
    }

    // ======================
    // 5️⃣ Kirim ke frontend
    // ======================
    if ($isLibur) {
        // Jika libur, tetap render homepage, jangan lanjut ke form layanan
        return Inertia::render('HomePageKonten', [
            'isLibur' => true,
            'liburReason' => $liburReason,
        ]);
    }

    // Jika bukan libur, lanjut ke form layanan
    return Inertia::render('HomepageInputLayanan', [
        'kategori' => $kategori,
        'isLibur' => false,
        'liburReason' => '',
    ]);
}
    public function index(Request $request) {}

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
            'validasi_spp'      => 'required|in:ya,tidak',
            'status'            => 'required|in:aktif,tidak',
        ]);

        $layanan = Layanan::create($validated);

        return response()->json($layanan);
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // Tampilkan detail layanan
        $list = Layanan::get();
        return Inertia::render('KelolaLayanan', [
            'title' => 'layanan',
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
            'validasi_spp'      => 'required|in:ya,tidak',
            'syarat' => 'array',
            'syarat.*' => 'required|string'
        ]);

        $layanan = DB::transaction(function () use ($validated, $id) {
            // 1. Update data layanan
            $layanan = Layanan::findOrFail($id);
            $layanan->update([
                'deskripsi' => $validated['deskripsi'],
                'status' => $validated['status']
            ]);

            // 2. Update persyaratan
            PersyaratanLayanan::where('id_layanan', $id)->delete();

            foreach ($validated['syarat'] as $syarat) {
                PersyaratanLayanan::create([
                    'id_layanan' => $id,
                    'persyaratan' => $syarat
                ]);
            }

            return $layanan->load('persyaratan'); // 🔥 sekalian load relasi biar lengkap
        });

        return response()->json([
            'message' => 'Layanan berhasil diperbarui!',
            'data' => $layanan
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Hapus layanan
        $layanan = Layanan::findOrFail($id);
        $layanan->delete();

        // Hapus semua persyaratan terkait
        PersyaratanLayanan::where('id_layanan', $id)->delete();

        // Jika request dari Inertia/JS
        return response()->json([
            'success' => true,
            'message' => 'Layanan Berhasil Dihapus.'
        ]);
    }


    /**
     * API: Ambil layanan untuk kategori mahasiswa dan daftar persyaratannya.
     */
    public function getLayananMahasiswa()
    {
        $layanans = Layanan::with('persyaratan')
            ->where('kategori_pengguna', 'mahasiswa')
            ->where('status', 'aktif')
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
    public function getLayananAlumni()
    {
        $layanans = Layanan::with('persyaratan')
            ->where('kategori_pengguna', 'alumni')
            ->where('status', 'aktif')
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
