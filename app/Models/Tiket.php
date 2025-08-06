<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
class Tiket extends Model
{
    //
     use HasFactory;
     protected $table = 'tikets'; 
    protected $fillable = [
    'id_permohonan_layanan',
    'no_tiket',
    'keterangan_tiket'
    ];
    public function permohonan()
{
    return $this->belongsTo(PermohoanLayanan::class, 'id_permohonan_layanan');
}

}
