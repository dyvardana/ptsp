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
    Schema::create('permohonan_layanans', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_layanan');
        $table->string('identitas_pengguna')->nullable();
        $table->string('nama_pemohon');
        $table->string('email');
        $table->string('no_hp');
        $table->string('alamat');
        $table->enum('kategori_pengguna', ['mahasiswa', 'alumni', 'dosen', 'umum']);
        $table->string('judul_layanan');
        $table->text('keterangan_tambahan')->nullable();
        $table->date('tanggal_pengajuan');
        $table->enum('status', ['menunggu', 'diproses', 'selesai', 'ditolak'])->default('menunggu');
        $table->string('file_lampiran')->nullable();
        $table->timestamps();

        // Optional: foreign key constraint
        $table->foreign('id_layanan')->references('id')->on('layanans')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohoan_layanans');
    }
};
