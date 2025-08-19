<!-- resources/views/emails/permohonan_terkirim.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Permohonan Selesai</title>
</head>
<body>
    <h2>Permohonan Anda Telah Selesai</h2>
    <p>Halo {{ $permohonan->nama_pemohon }},</p>
    <p>Permohonan Anda untuk layanan <strong>{{ $permohonan->judul_layanan }}</strong> telah selesai.</p>
    <p>Nomor Tiket Anda: <strong>{{ $tiket['no_tiket'] }}</strong></p>
    <p>Silahkan cek pada halaman PTSP dengan memasukkan kode Tiket.</p>
    <br>
    <p>Hormat kami,</p>
    <p>PTSP IAHN Mpu Kuturan</p>
</body>
</html>
