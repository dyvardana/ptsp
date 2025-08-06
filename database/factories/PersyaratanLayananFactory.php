<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersyaratanLayanan>
 */
class PersyaratanLayananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'id_layanan' =>$this->faker->randomElement([
                '1', '2', '3', '4'
            ]),
            'persyaratan' =>$this->faker->sentence(20),
            'created_at' => now(),
            'updated_at' => now(),


        ];
    }
}
