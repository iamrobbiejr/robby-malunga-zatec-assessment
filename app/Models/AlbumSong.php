<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumSong extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = ['song_id', 'album_id'];
}
