<!-- resources/views/emails/permohonan_terkirim.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mohon Tindaklanjut</title>
</head>
<body>
    <h2>Mohon Untuk Ditindaklanjuti</h2>

    <p>Halo {{ $staff->name }},</p>

    <p>
        mohon untuk menindaklanjuti permohonan layanan dengan No Tiket: <strong>{{ optional($tiket)->no_tiket ?? '-' }}</strong>.
        
    <br>
        Silakan cek pada PADURAKSA dengan memasukkan kode tiket. Untuk memperlancar pelayanan, pastikan untuk segera menindaklanjuti permohonan tersebut. Terima kasih atas kerjasamanya.
    </p>



    <br>

    <p>Hormat kami,</p>
    <p><strong>PTSP IAHN Mpu Kuturan</strong></p>
</body>
</html>
