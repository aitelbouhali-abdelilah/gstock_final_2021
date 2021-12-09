<?php

namespace App\Jobs;

use App\Mail\stockRunningOut;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendQueueEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $details;
    protected $users;
    public $timeout = 10; // 2 hours
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details,$users)
    {
        $this->details = $details;
        $this->users = $users;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->users)
        ->queue(new stockRunningOut($this->details));
    }
}
