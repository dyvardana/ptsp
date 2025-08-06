<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PermohonanTerkirim extends Mailable
{
    use Queueable, SerializesModels;

    public $permohonan;
    public $tiket;

    public function __construct($permohonan, $tiket)
    {
        $this->permohonan = $permohonan;
        $this->tiket = $tiket;
    }

    public function build()
    {
        return $this->subject('Permohonan Anda Telah Terkirim')
                    ->view('emails.permohonan_terkirim');
    }
}

