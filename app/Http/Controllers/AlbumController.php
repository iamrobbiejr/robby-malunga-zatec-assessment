<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlbumStoreRequest;
use App\Http\Requests\AlbumUpdateRequest;
use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieve all albums
        $albums = Album::paginate(6);

        foreach ($albums as $album) {
            $songs = Song::where('album_id', $album->id)->get();
            $album->songs = $songs;
        }

        return response([
            'message' => 'All albums available',
            'data' => $albums
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function dashboardIndex(User $user)
    {

        // retrieve all albums owned by user
        $albums = Album::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($albums as $album) {
            $songs = Song::where('album_id', $album->id)->get();
            $album->songs = $songs;
        }

        return response()->json([
            'message' => 'All albums available',
            'data' => $albums
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(AlbumStoreRequest $request)
    {
        $data = $request->validated();

        try {
            // Check if image was given and save on local file system
            if (isset($data['cover_image_url'])) {
                $relativePath = $this->saveImage($data['cover_image_url']);
                $data['cover_image_url'] = $relativePath;
            }

            Album::create($data);

            return response()->json([
                'message' => 'Album Created Successfully!!'
            ]);

        } catch (\Exception $e) {

            Log::error($e->getMessage());

            return response()->json([
                'message' => 'Something went wrong while creating album!!',
                "error" => $e,
            ], 500);
        }
    }

    /**
     * Save image in local file system and return saved image path
     *
     * @param $cover_image_url
     * @return string
     * @throws \Exception
     */
    private function saveImage($cover_image_url)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $cover_image_url, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($cover_image_url, strpos($cover_image_url, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/albums/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $album->user_id) {
            return abort(403, 'Unauthorized Action');
        }

        return $album;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(AlbumUpdateRequest $request, Album $album)
    {
        $data = $request->validated();

        try {
            //check if image was changed
            if ($request->cover_image_url !== $album->cover_image_url) {
                // If there is an old image, delete it
                if ($album->cover_image_url) {
                    $absolutePath = public_path($album->cover_image_url);
                    File::delete($absolutePath);
                }

                // save on local file system
                if (isset($data['cover_image_url'])) {

                    $relativePath = $this->saveImage($data['cover_image_url']);
                    $data['cover_image_url'] = $relativePath;
                }
            }

            $album->update($data);

            return response()->json([
                'message' => 'Album Updated Successfully!!'
            ]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while updating album!!',
                "error" => $e,
                'album' => $album,
                'request' => $request->all()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album, Request $request)
    {

        $user = $request->user();
        if ($user->id !== $album->user_id) {
            return abort(403, 'Unauthorized Action');
        }

        try {

            if ($album->cover_image_url) {
                $exists = Storage::disk('public')->exists("albums/image/{$album->cover_image_url}");
                if ($exists) {
                    Storage::disk('public')->delete("albums/image/{$album->cover_image_url}");
                }
            }

            $album->delete();

            return response()->json([
                'message' => 'Album Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a album!!'
            ]);
        }
    }
}
