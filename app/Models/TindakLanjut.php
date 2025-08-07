<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class TindakLanjut extends Model
{
    //
    

      use HasFactory;
    protected $table = 'tindak_lanjuts'; 
    protected $fillable = [
    'id_permohonan_layanan',
    'catatan',
    'id_users',
    'file_lampiran'
    ];
}
