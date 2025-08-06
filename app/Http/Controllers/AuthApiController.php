<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthApiController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $response = Http::post('https://stahnmpukuturan.ac.id/api/login.php', [
            'username' => $request->username,
            'password' => $request->password,
        ]);

        return response()->json([
            'status' => $response->status(),
            'data' => $response->json(),
        ]);
    }
    public function mhs(Request $request){
        $request->validate([
            'nik' => 'required',
            'nipd' => 'required',
        ]);
        $response = Http::post('https://stahnmpukuturan.ac.id/api/cekmahasiswa.php',[
            'nik' => $request->nik,
            'nipd' => $request->nipd,
        ]);
        return response()->json([
            'status' => $response->status(),
            'data' => $response->json(),
        ]);
    }

}


