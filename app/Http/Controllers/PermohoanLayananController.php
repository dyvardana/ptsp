<?php

namespace App\Http\Controllers;

use App\Models\PermohoanLayanan;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\PermohonanTerkirim;
use App\Mail\PermohonanTertolak;
use App\Models\TindakLanjut;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class PermohoanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
        return Inertia::render('Profile/Ptsp/Dashboard', [
            'title' => 'Dashboard',
            'data' => $data,
        ]);
    }
    public function list()
    {
        $staff = User::where('role', 'staff')->get();
        //
        // $data = DB::table('permohonan_layanans')
        //     ->join('layanans', 'permohonan_layanans.id_layanan', '=', 'layanans.id')
        //     ->join('tikets', 'permohonan_layanans.id', '=', 'tikets.id_permohonan_layanan')
        //     ->leftJoin('users', 'permohonan_layanans.id_users', '=', 'users.id')
        //     ->leftJoin('feedback', 'permohonan_layanans.id', '=', 'feedback.id_permohonan_layanan')
        //     ->select(
        //         'permohonan_layanans.id',
        //         'permohonan_layanans.id_layanan',
        //         'permohonan_layanans.identitas_pengguna',
        //         'permohonan_layanans.nama_pemohon',
        //         'permohonan_layanans.email',
        //         'permohonan_layanans.no_hp',
        //         'permohonan_layanans.alamat',
        //         'permohonan_layanans.kategori_pengguna',
        //         'permohonan_layanans.judul_layanan',
        //         'permohonan_layanans.keterangan_tambahan',
        //         'permohonan_layanans.tanggal_pengajuan',
        //         'permohonan_layanans.status',
        //         'permohonan_layanans.file_lampiran',
        //         'layanans.nama_layanan',
        //         'tikets.no_tiket',
        //         'tikets.keterangan_tiket',
        //         'users.name',
        //         DB::raw('((feedback.kecepatan + feedback.kesesuaian + feedback.kemudahan) / 3) as rating')
        //     )
        //     ->orderBy('permohonan_layanans.id', 'desc') // ðŸ”¥ urutkan dari terbesar ke terkecil
        //     ->get();

//perbaikan query

$data = DB::table('permohonan_layanans as p')
    ->select(
        'p.id',
        'p.identitas_pengguna',
        'p.nama_pemohon',
        'p.email',
        'p.no_hp',
        'p.alamat',
        'p.kategori_pengguna',
        'p.judul_layanan',
        'p.keterangan_tambahan',
        'p.tanggal_pengajuan',
        'p.status',
        'p.file_lampiran',
        'l.nama_layanan',
        DB::raw('MAX(t.no_tiket) as no_tiket'),
        DB::raw('MAX(t.keterangan_tiket) as keterangan_tiket'),
        'u.name',
        DB::raw('AVG((f.kecepatan + f.kesesuaian + f.kemudahan)/3) as rating')
    )
    ->join('layanans as l', 'p.id_layanan', '=', 'l.id')
    ->leftJoin('tikets as t', 'p.id', '=', 't.id_permohonan_layanan')
    ->leftJoin('users as u', 'p.id_users', '=', 'u.id')
    ->leftJoin('feedback as f', 'p.id', '=', 'f.id_permohonan_layanan')
    ->groupBy(
        'p.id',
        'p.identitas_pengguna',
        'p.nama_pemohon',
        'p.email',
        'p.no_hp',
        'p.alamat',
        'p.kategori_pengguna',
        'p.judul_layanan',
        'p.keterangan_tambahan',
        'p.tanggal_pengajuan',
        'p.status',
        'p.file_lampiran',
        'l.nama_layanan',
        'u.name'
    )
    ->orderByDesc('p.id')
    ->get();


        $menunggu = $data->where('status', 'menunggu')->count();
        $diterima = $data->where('status', 'diterima')->count();
        $ditolak = $data->where('status', 'ditolak')->count();
        $diproses = $data->where('status', 'diproses')->count();
        $selesai = $data->where('status', 'selesai')->count();
        $statusData = [
            'menunggu' => $menunggu,
            'diterima' => $diterima,
            'ditolak' => $ditolak,
            'diproses' => $diproses,
            'selesai' => $selesai,
        ];
        //dd($data);
        return Inertia::render('PermohonanList', [
            'title' => 'Dashboard - PTSP',
            'data' => $data,
            'staff' => $staff,
            'statusData' => $statusData,

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
   // Ambil semua data request
    $data = $request->all();

    // Jika tidak ada file diunggah → hapus field supaya tidak dianggap string kosong
    if (!$request->hasFile('file_lampiran')) {
        unset($data['file_lampiran']);
    }

    // 1. Validasi input
    $validated = validator($data, [
        'id_layanan'          => 'required|exists:layanans,id',
        'identitas_pengguna'  => 'required|string',
        'nama_pemohon'        => 'required|string|max:255',
        'email'               => 'required|email',
        'no_hp'               => 'required|string',
        'alamat'              => 'required|string',
        'judul_layanan'       => 'required|string',
        'keterangan_tambahan' => 'nullable|string',
        'file_lampiran'       => 'nullable|file|mimes:pdf,zip,rar|max:5120',
    ])->validate();

        // 2. Cek apakah layanan perlu validasi SPP
        $validasiLayanan = DB::table('layanans')->where('id', $validated['id_layanan'])->first();
        
        if ($validasiLayanan->validasi_spp == 'ya' && $request->kategori_pengguna == 'mahasiswa') {
            // ðŸ”Ž Panggil API sppmahasiswa
            $response = Http::withoutVerifying()->post(
                'https://stahnmpukuturan.ac.id/api/sppmahasiswa.php',
                ['nipd' => $request->identitas_pengguna]
            );

            if (!$response->ok()) {
                return response()->json([
                    'message' => 'Gagal menghubungi server validasi SPP.',
                ], 500);
            }

            $result = $response->json();

            // ðŸš¨ Stop proses kalau spp bukan "lunas"
            if (empty($result['success']) || ($result['user']['spp'] ?? null) !== 'lunas') {
                return response()->json([
                    'message' => 'Validasi gagal, SPP belum lunas. Permohonan tidak dapat diproses.',
                ], 422);
            }
        }
        // Cek semester aktif
            $response = Http::withoutVerifying()->get('https://stahnmpukuturan.ac.id/api/semesteraktif.php');
              $data = $response->json();
                if ($response->successful() && isset($data['data']['id_smt'])) {
                    $idSemester = $data['data']['id_smt'];
                    $smtAktif = $idSemester;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Gagal mengambil semester aktif',
                        'response' => $data,
                    ], 500);
                }
        if ($validasiLayanan->batasi_pengajuan == 'ya' && $request->kategori_pengguna == 'mahasiswa') {
            

            // Cek apakah sudah pernah mengajukan layanan ini di semester yang sama
            $existing = PermohoanLayanan::where('id_layanan', $validated['id_layanan'])
                ->where('identitas_pengguna', $validated['identitas_pengguna'])
                ->where('smt_aktif', $smtAktif)
                ->where('status', '!=', 'ditolak') // kecuali yang ditolak
                ->first();

            if ($existing) {
                return response()->json([
                    'message' => 'Anda sudah pernah mengajukan layanan ini pada semester aktif yang sama. Tidak dapat mengajukan lagi.',
                ], 422);
            }
        }

        // 3. Upload file jika ada
        if ($request->hasFile('file_lampiran')) {
            $file = $request->file('file_lampiran');

            $path = $file->store('lampiran', 'public');
            $validated['file_lampiran'] = $path;
            $validated['file_asli'] = $file->getClientOriginalName();
        }

        // 4. Tambahkan data default
        $validated['status']            = 'menunggu';
        $validated['tanggal_pengajuan'] = now();
        $validated['kategori_pengguna'] = $request->kategori_pengguna ?? 'mahasiswa';
        $validated['smt_aktif']          = $smtAktif ?? null;

        // 5. Simpan ke database
        $permohonan = PermohoanLayanan::create($validated);

        // 6. Generate tiket
        $tiketing = [
            'id_layanan'            => $validated['id_layanan'],
            'id_permohonan_layanan' => $permohonan->id,
            'no_tiket'              => $this->generateNoTiket(),
            'keterangan_tiket'      => ''
        ];
        Tiket::create($tiketing);

        // 7. Kirim email notifikasi
        try {
            Mail::to($validated['email'])->send(new PermohonanTerkirim($permohonan, $tiketing));
        } catch (\Throwable $e) {
            Log::error("Email gagal dikirim: " . $e->getMessage());
        }

        // 8. Return response sukses
        return response()->json([
            'message' => 'Permohonan berhasil disimpan',
            'data'    => $permohonan,
            'tiket'   => $tiketing,
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
    public function terima(Request $request)
    {
        $data = [
            'status' => 'diterima',
            'id_users' => $request->idUser,
            'updated_at' => now(),
        ];
        PermohoanLayanan::where('id', $request->id)->update($data);
        //return redirect()->back()->with('message', 'Data berhasil diupdate');
        return redirect()->route('permohonanList')->with('message', 'Data berhasil diupdate');
    }

    public function tolak(Request $request)
    {
        //
        $data = [
            'status' => 'ditolak',
            'id_users' => $request->idUser,
            'updated_at' => now(),
        ];
        $tiket = [
            'keterangan_tiket' => $request->keterangan_tiket,
            'updated_at' => now(),
        ];

        PermohoanLayanan::where('id', $request->id)->update($data);
        Tiket::where('id_permohonan_layanan', $request->id)->update($tiket);
        //  dd($request);
        $permohonan = PermohoanLayanan::find($request->id);
        $tiketing = Tiket::where('no_tiket', $request->no_tiket)->first();
        //fontee
         $target = $permohonan->no_hp;
            $this->kirimPesanFonnte($target, 'Hay '.$permohonan->nama_pemohon.', Permohonan Layanan dengan Nomor Tiket : '.$request->no_tiket.' ditolak dengan alasan "'.$request->keterangan_tiket.'". Hati-hati penipuan mengatasnamakan Institut Mpu Kuturan. Semua layanan resmi tanpa dipungut biaya apapun.');
            
        // dd($tiketing);
        Mail::to($request->email)->send(new PermohonanTertolak($permohonan, $tiketing));
       // return redirect()->back()->with('message', 'Data berhasil ditolak');
        return redirect()->route('permohonanList')->with('message', 'Data berhasil ditolak');
    }
    function generateNoTiket()
    {
        $tanggal = now()->format('dmy'); // ddmmyy
        $unik = mt_rand(100, 999); // 3 digit acak

        return "IMK" . $tanggal . $unik;
    }
    public function tindakLanjut(Request $request)
    {
        // dd($request);
        $cekTindakLanjut = TindakLanjut::where('id_permohonan_layanan', $request->id)->first();
        $data = [
            'id_permohonan_layanan' => $request->id,
            'id_users' => $request->id_staff,
            'catatan' => $request->catatan,
            'updated_at' => now(),
        ];
        if ($cekTindakLanjut) {
            TindakLanjut::where('id_permohonan_layanan', $request->id)->update($data);
        } else {
            // Jika tidak ada tindak lanjut sebelumnya, buat yang baru
            TindakLanjut::create($data);
        }
        $status = [
            'status' => 'diproses'
        ];
        PermohoanLayanan::where('id', $request->id)->update($status);
        //  return response()->json(['message' => 'Tindak lanjut berhasil']);
       // return redirect()->back()->with('success', 'Tindak lanjut berhasil');
       $staff = User::where('id', $request->id_staff)->first();
       $tiket = Tiket::where('id_permohonan_layanan', $request->id)->first();
        $this->kirimPesanFonnte($staff->phone, 'Halo '.$staff->name.', Anda ditugaskan untuk menindaklanjuti permohonan layanan dengan No Tiket: '.$tiket->no_tiket.'. Untuk memperlancar pelayanan silakan cek PADURAKSA untuk informasi lebih lanjut.');
        return redirect()->route('permohonanList')->with('success', 'Tindak lanjut berhasil');
    }
    public function cekTindakLanjut(Request $request)
    {
        $id = $request->input('id');


        $data = DB::table('tindak_lanjuts')
            ->join('users', 'tindak_lanjuts.id_users', '=', 'users.id')
            ->where('tindak_lanjuts.id_permohonan_layanan', $request->id_permohonan)
            ->select('tindak_lanjuts.catatan', 'tindak_lanjuts.file_lampiran', 'tindak_lanjuts.updated_at', 'tindak_lanjuts.created_at', 'users.name','users.phone')
            ->first();

        return response()->json($data);
    }
    function kirimPesanFonnte($target, $message, $countryCode = '62')
{
    try {
        $response = Http::withHeaders([
            'Authorization' => env('FONNTE_TOKEN'), // ambil token dari .env
        ])->asForm()->post('https://api.fonnte.com/send', [
            'target' => $target,
            'message' => $message,
            'countryCode' => $countryCode,
        ]);

        if ($response->successful()) {
            return [
                'status' => true,
                'data' => $response->json(),
            ];
        } else {
            return [
                'status' => false,
                'error' => $response->body(),
                'code' => $response->status(),
            ];
        }
    } catch (\Exception $e) {
        return [
            'status' => false,
            'error' => $e->getMessage(),
        ];
    }
}
}
