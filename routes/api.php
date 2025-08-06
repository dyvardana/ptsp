<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthApiController;
use Illuminate\Support\Facades\Http;

Route::post('/proxy-login', [AuthApiController::class, 'login']);
Route::post('/mhs', [AuthApiController::class, 'mhs']);
// Route::post('/mhs', function (Request $request) {
//     $response = Http::asForm()->post('https://stahnmpukuturan.ac.id/api/cekmahasiswa.php', [
//         'nik' => $request->nik,
//         'nipd' => $request->nipd,
//     ]);

//     return response()->json($response->json());
// });
