<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlbumStoreRequest;
use App\Models\Album;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieve all albums
        $albums = Album::all();

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
            $imageName = Str::random() . '.' . $request->cover_image_url->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('albums/image', $request->cover_image_url, $imageName);
            $data['cover_image_url'] = $imageName;
            Album::create($data);

            return response()->json([
                'message' => 'Album Created Successfully!!'
            ]);

        } catch (\Exception $e) {

            Log::error($e->getMessage());

            return response()->json([
                'message' => 'Something went wrong while creating album!!'
            ], 500);
        }
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
    public function update(Request $request, Album $album)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'cover_image_url' => 'nullable'
        ]);

        try {

            $album->fill($request->post())->update();

            if ($request->hasFile('cover_image_url')) {

                // remove old cover_image_url
                if ($album->cover_image_url) {
                    $exists = Storage::disk('public')->exists("albums/image/{$album->cover_image_url}");
                    if ($exists) {
                        Storage::disk('public')->delete("albums/image/{$album->cover_image_url}");
                    }
                }

                $imageName = Str::random() . '.' . $request->cover_image_url->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/cover_image_url', $request->cover_image_url, $imageName);
                $album->cover_image_url = $imageName;
                $album->save();
            }

            return response()->json([
                'message' => 'Album Updated Successfully!!'
            ]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while updating album!!'
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
