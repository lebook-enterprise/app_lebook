<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics',    'description' => 'Devices and gadgets'],
            ['name' => 'Office Supply',  'description' => 'Stationery and office materials'],
            ['name' => 'Furniture',      'description' => 'Desks, chairs and storage'],
            ['name' => 'Cleaning',       'description' => 'Cleaning products and supplies'],
            ['name' => 'Food & Beverage', 'description' => 'Consumables and drinks'],
            ['name' => 'Tools',          'description' => 'Hand tools and equipment'],
            ['name' => 'Clothing',       'description' => 'Uniforms and workwear'],
            ['name' => 'Medical',        'description' => 'First aid and medical supplies'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                ['description' => $category['description']]
            );
        }
    }
}
