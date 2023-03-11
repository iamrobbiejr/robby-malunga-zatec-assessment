<?php

namespace App\Http\Resources;

use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SongCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'version' => '0.0.1',
            'author' => 'Robby Malunga',
            'description' => 'Zatec Assessment',
            'data' => $this->collection,
        ];
    }
}
