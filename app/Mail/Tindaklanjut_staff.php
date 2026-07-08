<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Tindaklanjut_staff extends Mailable
{
    use Queueable, SerializesModels;

    public $staff;
    public $tiket;

    public function __construct($staff, $tiket)
    {
        $this->staff = $staff;
        $this->tiket = $tiket;
    }

    public function build()
    {
        return $this->subject('Mohon Tindaklanjut Permohonan Layanan')
                    ->view('emails.teruskan_layanan');
    }
}

