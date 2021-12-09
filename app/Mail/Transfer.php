<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Transfer extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $data;
    protected $sender;
    protected $type;
    public function __construct($data,$sender,$type)
    {
        $this->data = $data;
        $this->sender = $sender;
        $this->type = $type;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->view('emails.transfer')
            ->with([
                'data' => $this->data,
                'sender' => $this->sender,
                'type' => $this->type
            ]);
    }
}
