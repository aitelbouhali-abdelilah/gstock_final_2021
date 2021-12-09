<?php

namespace App\Jobs;

use App\Mail\Transfer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendTransferQueueEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $user;
    protected $data;
    protected $sender;
    protected $type;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user,$data,$sender,$type)
    {
        $this->user = $user;
        $this->data = $data;
        $this->sender = $sender;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->user)
        ->queue(new Transfer($this->data,$this->sender,$this->type));
    }
}
