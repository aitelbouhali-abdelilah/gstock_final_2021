<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'id_occupation' => '1',
            //'id_site' => '1',
            'id_role' => '1',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456789')
        ]);
    }
}