<?php

namespace Database\Seeders;

use App\Models\PersyaratanLayanan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersyaratanLayananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        PersyaratanLayanan::factory()->count(5)->create();
    }
}
