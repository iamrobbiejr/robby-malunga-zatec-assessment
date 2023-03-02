<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AlbumUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        $album = $this->route('album');

//        only updated by owner of album
        if ($this->user()->id !== $album->user_id) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'cover_image_url' => 'required|string',
            'user_id' => 'exists:users,id',
            'release_date' => 'required|date|before:today'
        ];
    }
}
