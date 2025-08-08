<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Feedback extends Model
{
    //
    use HasFactory;
     protected $table = 'feedback'; 
    protected $fillable = [
        'id_permohonan_layanan',
        'kecepatan',
        'kesesuaian',
        'kemudahan',
        'saran',
    ];
}
