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


use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;


class PermohoanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
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
        return Inertia::render('Profile/Ptsp/Dashboard',[
            'title'=>'Dashboard',
            'data' => $data,
        ]);
    }
    public function list()
    {
            $staff = User::where('role', 'staff')->get();
        //
     $data = DB::table('permohonan_layanans')
    ->join('layanans', 'permohonan_layanans.id_layanan', '=', 'layanans.id')
    ->join('tikets', 'permohonan_layanans.id', '=', 'tikets.id_permohonan_layanan')
    ->leftJoin('users', 'permohonan_layanans.id_users', '=', 'users.id')
    ->leftJoin('feedback', 'permohonan_layanans.id', '=', 'feedback.id_permohonan_layanan')
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
        'permohonan_layanans.status',
        'permohonan_layanans.file_lampiran',
        'layanans.nama_layanan',
        'tikets.no_tiket',
        'tikets.keterangan_tiket',
        'users.name',
        DB::raw('((feedback.kecepatan + feedback.kesesuaian + feedback.kemudahan) / 3) as rating')
    )
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
    if( !$request->kategori_pengguna ){
        $validated['kategori_pengguna'] = 'mahasiswa';
    }else{
        $validated['kategori_pengguna'] = $request->kategori_pengguna;
    }
    

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
    public function terima(Request $request){
        $data=[
            'status'=> 'diterima',
            'id_users'=>$request->idUser,
            'updated_at' => now(),
        ];
        PermohoanLayanan::where('id',$request->id)->update($data);
        return redirect()->back()->with('message', 'Data berhasil diupdate');

    }

    public function tolak(Request $request)
    {
        //
       $data =[
        'status'=> 'ditolak',
        'id_users'=>$request->idUser,
        'updated_at' => now(),
       ];
       $tiket =[
        'keterangan_tiket'=>$request->keterangan_tiket,
        'updated_at' => now(),
       ];

       PermohoanLayanan::where('id',$request->id)->update($data);
       Tiket::where('id_permohonan_layanan',$request->id)->update($tiket);
     //  dd($request);
        $permohonan = PermohoanLayanan::find($request->id);
        $tiketing = Tiket::where('no_tiket', $request->no_tiket)->first();
        
       // dd($tiketing);
       Mail::to($request->email)->send(new PermohonanTertolak($permohonan, $tiketing));
       return redirect()->back()->with('message', 'Data berhasil ditolak');
    }
    function generateNoTiket(){
        $tanggal = now()->format('dmy'); // ddmmyy
        $unik = mt_rand(100, 999); // 3 digit acak

        return "IMK".$tanggal . $unik;
    }
     public function tindakLanjut(Request $request){
       // dd($request);
       $cekTindakLanjut = TindakLanjut::where('id_permohonan_layanan', $request->id)->first();
        $data = [
            'id_permohonan_layanan'=> $request->id,
            'id_users'=> $request->id_staff,
            'catatan'=> $request->catatan,
            'updated_at' => now(),
        ];
     if($cekTindakLanjut){
        TindakLanjut::where('id_permohonan_layanan', $request->id)->update($data);
    } else {
        // Jika tidak ada tindak lanjut sebelumnya, buat yang baru
       TindakLanjut::create($data);
    }
        $status = [
            'status'=>'diproses'
        ];
       PermohoanLayanan::where('id',$request->id)->update($status);

     }
     public function cekTindakLanjut(Request $request){
         $id = $request->input('id');
       

        $data = DB::table('tindak_lanjuts')
            ->join('users', 'tindak_lanjuts.id_users', '=', 'users.id')
            ->where('tindak_lanjuts.id_permohonan_layanan', $request->id_permohonan)
            ->select('tindak_lanjuts.catatan', 'tindak_lanjuts.file_lampiran', 'tindak_lanjuts.updated_at','tindak_lanjuts.created_at', 'users.name')
            ->first();

        return response()->json($data);
     }
    
}
