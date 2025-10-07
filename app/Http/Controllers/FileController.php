<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function download($filename)
    {
        // hanya ambil nama file (hindari path traversal)
        $filename = basename($filename);

        // path absolut ke storage/app/public/lampiran
        $filePath = storage_path('app/public/lampiran/' . $filename);

        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan.');
        }

        // kirim file ke user
        return response()->download($filePath, $filename);
    }
}
