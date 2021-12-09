<?php

namespace App\Mail;

use App\Models\Equipement;
use App\Models\Piece;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class stockRunningOut extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $data;
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data = null;

        if($this->data['type']== 'equipement'){
            $data = Equipement::find($this->data['id']);

        }else{
            $data = Piece::find($this->data['id']);
        }
        return $this->view('emails.stock_running_out')
            ->with([
                'type' => $this->data['type'],
                'data' => $data
            ]);
    }
}
