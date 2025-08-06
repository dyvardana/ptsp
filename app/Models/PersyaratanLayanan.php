<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersyaratanLayanan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_layanan',
        'persyaratan',
    ];

    /**
     * Relasi ke model Layanan.
     */
    public function layanan()
    {
        return $this->belongsTo(Layanan::class, 'id_layanan');
        
    }
}
