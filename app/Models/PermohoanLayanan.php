<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PermohoanLayanan extends Model
{
    use HasFactory;
     protected $table = 'permohonan_layanans'; 
    protected $fillable = [
    'id_layanan',
    'identitas_pengguna',
    'nama_pemohon',
    'email',
    'no_hp',
    'alamat',
    'kategori_pengguna',
    'judul_layanan',
    'keterangan_tambahan',
    'tanggal_pengajuan',
    'status',
    'smt_aktif',
    'file_lampiran',
    'id_users'
];
public function tiket()
{
    return $this->hasOne(Tiket::class, 'id_permohonan_layanan');
}
}
