<?php

namespace App\Http\Controllers;

use App\Http\Requests\SongStoreRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Illuminate\Support\Facades\Log;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieve all songs
        $songs = Song::paginate(10);

        return SongResource::collection($songs)->response()->getData(true);
    }

    /**
     * Display a listing of the resource.
     */
    public function albumSongs(Album $album)
    {
        // retrieve all songs owned by an album
        $songs = Song::where('album_id', $album->id)->get();

        return response()->json(new SongCollection($songs), ResponseAlias::HTTP_OK);
    }

    /**
     * Display a listing of the resource.
     */
    public function songsByGenre(Request $request)
    {
        // retrieve all songs by selected genre
        $songs = Song::where('genre', $request->genre)->get();

        return response()->json(new SongCollection($songs), ResponseAlias::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SongStoreRequest $request)
    {
        $data = $request->validated();

        try {
            $song = Song::create($data);

            return response()->json([
                'message' => 'Song Created Successfully!!'
            ],
                ResponseAlias::HTTP_CREATED);
        } catch (\Exception $e) {

            Log::error($e->getMessage());

            return response()->json([
                'message' => 'Something went wrong while creating song!!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Song $song)
    {
        return new SongResource($song);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SongUpdateRequest $request, Song $song)
    {
        $data = $request->validated();

        try {

            $song->fill($data)->update();

            return response()->json(new SongResource($song), ResponseAlias::HTTP_OK);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while updating song!!'
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Song $song)
    {
        try {
            $song->delete();
            return response()->json([
                'message' => 'Song Deleted Successfully!!'
            ], ResponseAlias::HTTP_NO_CONTENT);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a album!!'
            ]);
        }
    }
}
