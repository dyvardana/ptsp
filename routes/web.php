<?php

use App\Http\Controllers\AuthApiController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\PermohoanLayananController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Homepage');
})->name('beranda');
// Route::get('/homepage', function () {
//     return Inertia::render('Homepage');
// });

//Route::get('/layanan', function (){ return Inertia::render('InputLayanan');})->name('layanan');
Route::post('/layanan', [LayananController::class, 'index'])->name('layanan');
Route::get('/layanan', function () {
    return redirect('/');
});

Route::get('/layanan/mahasiswa', [LayananController::class, 'getLayananMahasiswa'])->name('layananmahasiswa');
Route::post('/permohonan-layanan',[PermohoanLayananController::class, 'store'])->name('permohonanlayanan');
//Route::get('/lihatPengajuan',[PermohoanLayananController::class, 'index'])->name('lihatpengajuan');
Route::get('/dashboard', [PermohoanLayananController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/proxy-login', function (Request $request) {
    $response = Http::asForm()->post('https://stahnmpukuturan.ac.id/api/login.php', [
        'username' => $request->input('username'),
        'password' => $request->input('password'),
    ]);

    return response()->json($response->json(), $response->status());
});
require __DIR__.'/auth.php';
