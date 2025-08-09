<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_layanan',
        'deskripsi',
        'kategori_pengguna',
        'status',
    ];

    /**
     * Relasi ke persyaratan layanan.
     */
    public function persyaratan()
{
    return $this->hasMany(PersyaratanLayanan::class, 'id_layanan');
}

}
