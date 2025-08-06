<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('layanans', function (Blueprint $table) {
        $table->id();
        $table->string("nama_layanan");
        $table->text("deskripsi");

        // Menggunakan enum untuk tipe pengguna layanan
       $table->enum('kategori_pengguna', ['mahasiswa', 'alumni', 'dosen', 'umum']);

        // Tambahkan created_at dan updated_at secara otomatis
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanans');
    }
};
