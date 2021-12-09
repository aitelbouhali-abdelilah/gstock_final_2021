<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sites')->insert([
            'nom' => 'AGA',
            'signifi' => 'Agadir'
        ]);
        DB::table('sites')->insert([
            'nom' => 'CMN',
            'signifi' => 'Casablanca'
        ]);
        DB::table('sites')->insert([
            'nom' => 'TNG',
            'signifi' => 'Tanger'
        ]);
        DB::table('sites')->insert([
            'nom' => 'RAK',
            'signifi' => 'Marrakech'
        ]);
        DB::table('sites')->insert([
            'nom' => 'FEZ',
            'signifi' => 'Fes'
        ]);
        DB::table('sites')->insert([
            'nom' => 'NDR',
            'signifi' => 'Nador'
        ]);
        DB::table('sites')->insert([
            'nom' => 'RBA',
            'signifi' => 'Rabat'
        ]);
        DB::table('sites')->insert([
            'nom' => 'ESU',
            'signifi' => 'Essaouira'
        ]);
        DB::table('sites')->insert([
            'nom' => 'OZZ',
            'signifi' => 'Ouarzazate'
        ]);
        DB::table('sites')->insert([
            'nom' => 'AHU',
            'signifi' => 'Housseima'
        ]);
        DB::table('sites')->insert([
            'nom' => 'OUD',
            'signifi' => 'Oujada'
        ]);
        DB::table('sites')->insert([
            'nom' => 'EUN',
            'signifi' => 'Laayoune'
        ]);
        DB::table('sites')->insert([
            'nom' => 'VIL',
            'signifi' => 'Dakhla'
        ]);
    }
}
