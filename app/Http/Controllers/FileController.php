<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function download($filename)
    {
        // hanya ambil nama file (hindari path traversal)
        $filename = basename($filename);

        // path file tetap
        $filePath = storage_path('app/public/lampiran/' . $filename);

        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan.');
        }

        // bersihkan output buffer
        if (ob_get_level()) {
            ob_end_clean();
        }

        return response()->streamDownload(function () use ($filePath) {
            readfile($filePath);
        }, $filename, [
            'Content-Type' => 'application/octet-stream',
        ]);
    }
}