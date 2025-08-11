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
Route::get('/', function () {
    return Inertia::render('Konten', [
        'title' => 'PTSP IMK',
      
    ]);
})->name('beranda');

Route::post('/layanan', [LayananController::class, 'index'])->name('layanan');

Route::get('/layanan', function () {
    return redirect('/');
});
Route::get('/layanan/mahasiswa', [LayananController::class, 'getLayananMahasiswa'])->name('layananmahasiswa');

Route::post('/permohonan-layanan', [PermohoanLayananController::class, 'store'])->name('permohonanlayanan');
Route::post('/cekTiket', [TiketController::class, 'index'])->name('cekTiket');
Route::get('/cekTiket/{no_tiket}', [TiketController::class, 'show'])->name('detailTiket');
Route::post('/feedback',[FeedbackController::class,'store'])->name('feedback');


/*
|--------------------------------------------------------------------------
| Tindak Lanjut & Cek Status
|--------------------------------------------------------------------------
*/
Route::post('/tindakLanjut', [PermohoanLayananController::class, 'tindakLanjut'])->name('tindakLanjut');
Route::post('/tindak.lanjut_staff', [StaffController::class, 'TindakLanjutStaff'])->name('tindak_lanjut_staff');
Route::post('/cekTindakLanjut', [PermohoanLayananController::class, 'cekTindakLanjut'])->name('cekTindakLanjut');

Route::post('/tolak', [PermohoanLayananController::class, 'tolak'])
    ->middleware(['auth', 'verified', 'role:ptsp'])
    ->name('tolak');

Route::post('/terima', [PermohoanLayananController::class, 'terima'])
    ->middleware(['auth', 'verified', 'role:ptsp'])
    ->name('terima');

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', [PermohoanLayananController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:ptsp'])
    ->name('dashboard');
Route::get('/permohonanList', [PermohoanLayananController::class, 'list'])
    ->middleware(['auth', 'verified', 'role:ptsp'])
    ->name('permohonanList');

Route::get('/dashboard_staff', [StaffController::class, 'index'])
    ->middleware(['auth', 'role:staff'])
    ->name('dashboard_staff');

Route::get('/listLayanan',[LayananController::class, 'show'])->middleware(['auth','verified','role:ptsp'])->name('listLayanan');
Route::post('/listLayanan',[LayananController::class, 'store'])->middleware(['auth','verified','role:ptsp'])->name('layananStore');
// routes/web.php
Route::put('/layanans/{id}', [LayananController::class, 'update'])->name('layanans.update');
Route::get('/layananget/{id}', [LayananController::class,'persyaratan'])->name('persyaratan');
Route::delete('/layanans/{id}', [LayananController::class, 'destroy'])->name('layanansDestroy');
Route::get('/kelolastaff', [StaffController::class, 'listuser'])
    ->middleware(['auth', 'verified', 'role:ptsp'])
    ->name('kelolaStaff');
/*
|--------------------------------------------------------------------------
| Profile Routes (Protected)
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
    $response = Http::asForm()->post('https://stahnmpukuturan.ac.id/api/login.php', [
        'username' => $request->input('username'),
        'password' => $request->input('password'),
    ]);

    return response()->json($response->json(), $response->status());
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';
