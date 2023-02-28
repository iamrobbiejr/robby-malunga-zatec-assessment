<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Song extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'songs';

    /**
     * @var array
     */
    protected $fillable = ['title', 'length', 'genre', 'album_id'];

    /**
     * Get the album which the songs belong to
     */
    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }
}
