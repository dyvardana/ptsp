<!-- resources/views/emails/permohonan_terkirim.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Permohonan Tertolak</title>
</head>
<body>
    <h2>Permohonan Anda Ditolak</h2>
    <p>Halo {{ $permohonan->nama_pemohon }},</p>
    <p>Permohonan Anda untuk layanan <strong>{{ $permohonan->judul_layanan }}</strong> tertolak .</p>
    <p>Nomor Tiket Anda: <strong>{{ $tiket['no_tiket'] }}</strong> dengan alasan : </p>
    <p><i>{{$tiket['keterangan_tiket']}}</i></p>
    <p>Terimakasih telah menggunakan layanan PTSP Online.</p>
    <br>
    <p>Hormat kami,</p>
    <p>PTSP IAHN Mpu Kuturan</p>
</body>
</html>
