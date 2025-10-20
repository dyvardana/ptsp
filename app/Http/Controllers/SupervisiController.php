<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\PermohoanLayanan;
use App\Models\Supervisi;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Laravel\Prompts\table;

class SupervisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $jumlahLayananMahasiswa = PermohoanLayanan::where('kategori_pengguna', 'mahasiswa')->count();
        $jumlahLayananAlumni = PermohoanLayanan::where('kategori_pengguna', 'alumni')->count();
        $jumlahLayananUmum = PermohoanLayanan::where('kategori_pengguna', 'umum')->count();
        $jumlahLayananStaff = PermohoanLayanan::where('kategori_pengguna', 'dosen')->count();
        $data = [
            'jumlahLayananMahasiswa' => $jumlahLayananMahasiswa,
            'jumlahLayananAlumni' => $jumlahLayananAlumni,
            'jumlahLayananUmum' => $jumlahLayananUmum,
            'jumlahLayananStaff' => $jumlahLayananStaff,
        ];
       $users = DB::table('users as u')
    ->leftJoin('tindak_lanjuts as tl', 'tl.id_users', '=', 'u.id')
    ->leftJoin('permohonan_layanans as pl', function ($join) {
        $join->on('pl.id', '=', 'tl.id_permohonan_layanan')
             ->where('pl.status', '=', 'selesai');
    })
    ->leftJoin('feedback as f', 'f.id_permohonan_layanan', '=', 'pl.id')
    ->select(
        'u.id',
        'u.name',
        DB::raw('COUNT(DISTINCT tl.id) as total_selesai'),
        DB::raw('ROUND(AVG((f.kecepatan + f.kesesuaian + f.kemudahan)/3), 2) as skor_feedback')
    )
    ->where('u.role', 'staff')
    ->groupBy('u.id', 'u.name')
    ->orderByDesc('skor_feedback')
    ->get();

     
        return Inertia::render('Profile/Supervisi/DashboardSupervisi', [
            'title' => 'Dashboard - Supervisi',
            'data' => $data,
            'users' => $users,
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
    public function show(Supervisi $supervisi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supervisi $supervisi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supervisi $supervisi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supervisi $supervisi)
    {
        //
    }
    public function layanan(Request $request)
    {
       $kategori = $request->kategori;
    $statusData['ditolak'] = PermohoanLayanan::where('status', 'ditolak')->where('kategori_pengguna',$kategori)->count();
    $statusData['diterima'] = PermohoanLayanan::where('status', 'diterima')->where('kategori_pengguna',$kategori)->count();
    $statusData['menunggu'] = PermohoanLayanan::where('status', 'menunggu')->where('kategori_pengguna',$kategori)->count();
    $statusData['selesai'] = PermohoanLayanan::where('status', 'selesai')->where('kategori_pengguna',$kategori)->count();
    $statusData['diproses'] = PermohoanLayanan::where('status', 'diproses')->where('kategori_pengguna',$kategori)->count();

    $layanan = DB::table('layanans')
    ->leftJoin('permohonan_layanans', 'layanans.id', '=', 'permohonan_layanans.id_layanan')
    ->select('layanans.nama_layanan','layanans.status', 'layanans.deskripsi', DB::raw('COUNT(permohonan_layanans.id) as jumlah'))
    ->groupBy('layanans.id', 'layanans.nama_layanan','layanans.status', 'layanans.deskripsi')
    ->where('layanans.kategori_pengguna', $kategori)
    ->get();

        return Inertia::render('SupervisiLayanan', [
            'title' => 'Layanan - Supervisi',
            'statusData' => $statusData,
            'layanan' => $layanan,
            'kategori' => $kategori,
        ]);
    }

   
}
