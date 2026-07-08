<!-- resources/views/emails/permohonan_terkirim.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Permohonan Selesai</title>
</head>
<body>
    <h2>Permohonan Anda Telah Selesai</h2>

    <p>Halo {{ $permohonan->nama_pemohon }},</p>

    <p>
        Permohonan Anda untuk layanan 
        <strong>{{ $permohonan->judul_layanan }}</strong> 
        telah selesai.
    </p>

    <p>
        Nomor Tiket Anda: 
        <strong>{{ $tiket['no_tiket'] }}</strong>
    </p>

    <p>
        Silakan cek pada PADURAKSA dengan memasukkan kode tiket.
    </p>

    <p>
        Atau bisa melalui link berikut:<br>
        <a href="https://paduraksa.mpukuturan.ac.id/cekTiket/{{ $tiket['no_tiket'] }}">
            https://paduraksa.mpukuturan.ac.id/cekTiket/{{ $tiket['no_tiket'] }}
        </a>
    </p>

    <br>

    <p>Hormat kami,</p>
    <p><strong>PTSP IAHN Mpu Kuturan</strong></p>
</body>
</html>
