<?php

use App\Http\Controllers\AuthApiController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\PermohoanLayananController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TiketController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', fn () =>
    Inertia::render('HomePageKonten', [
        'title' => 'PTSP IMK',
    ])
)->name('beranda');

Route::post('/layanan', [LayananController::class, 'select'])->name('layanan');
Route::get('/layanan', fn () => redirect('/'));
Route::get('/layanan/mahasiswa', [LayananController::class, 'getLayananMahasiswa'])->name('layananmahasiswa');
Route::get('/layanan/alumni', [LayananController::class, 'getLayananAlumni'])->name('layananalumni');

Route::post('/permohonan-layanan', [PermohoanLayananController::class, 'store'])->name('permohonanlayanan');
Route::post('/cekTiket', [TiketController::class, 'index'])->name('cekTiket');
Route::get('/cekTiket/{no_tiket}', [TiketController::class, 'show'])->name('detailTiket');
Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback');

/*
|--------------------------------------------------------------------------
| Tindak Lanjut & Cek Status
|--------------------------------------------------------------------------
*/
Route::post('/tindakLanjut', [PermohoanLayananController::class, 'tindakLanjut'])->name('tindakLanjut');
Route::post('/tindak.lanjut_staff', [StaffController::class, 'TindakLanjutStaff'])->name('tindak_lanjut_staff');
Route::post('/cekTindakLanjut', [PermohoanLayananController::class, 'cekTindakLanjut'])->name('cekTindakLanjut');

Route::middleware(['auth', 'verified', 'role:ptsp'])->group(function () {
    Route::post('/tolak', [PermohoanLayananController::class, 'tolak'])->name('tolak');
    Route::post('/terima', [PermohoanLayananController::class, 'terima'])->name('terima');
});

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:ptsp'])->group(function () {
    Route::get('/dashboard', [PermohoanLayananController::class, 'index'])->name('dashboard');
    Route::get('/permohonanList', [PermohoanLayananController::class, 'list'])->name('permohonanList');

    Route::get('/listLayanan', [LayananController::class, 'show'])->name('listLayanan');
    Route::post('/listLayanan', [LayananController::class, 'store'])->name('layananStore');
    Route::put('/layanans/{id}', [LayananController::class, 'update'])->name('layanans.update');
    Route::get('/layananget/{id}', [LayananController::class, 'persyaratan'])->name('persyaratan');
    Route::delete('/layanans/{id}', [LayananController::class, 'destroy'])->name('layanansDestroy');

    Route::get('/kelolastaff', [StaffController::class, 'listuser'])->name('kelolaStaff');
    Route::delete('/hapusStaff/{id}', [StaffController::class, 'destroy'])->name('hapusStaff');
});

Route::middleware(['auth', 'role:staff'])->group(function () {
    Route::get('/dashboard_staff', [StaffController::class, 'index'])->name('dashboard_staff');
});

/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Proxy Login (API External)
|--------------------------------------------------------------------------
*/
Route::post('/proxy-login', function (Request $request) {
    $response = Http::asForm()->post(
        'https://stahnmpukuturan.ac.id/api/login.php',
        [
            'username' => $request->input('username'),
            'password' => $request->input('password'),
        ]
    );

    return response()->json($response->json(), $response->status());
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__ . '/auth.php';
