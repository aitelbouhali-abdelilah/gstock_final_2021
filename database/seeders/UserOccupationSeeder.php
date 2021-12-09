<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserOccupationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_occupations')->insert([
            'occupation' => 'Engineer'
        ]);
        DB::table('user_occupations')->insert([
            'occupation' => 'Technician'
        ]);
        DB::table('user_occupations')->insert([
            'occupation' => 'Management/Superior'
        ]);
        DB::table('user_occupations')->insert([
            'occupation' => 'Client'
        ]);
        
        
    }
}
