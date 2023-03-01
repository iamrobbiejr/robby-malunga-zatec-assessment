<?php

namespace App\Http\Controllers;

use App\Http\Requests\SongStoreRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieve all songs
        $songs = Song::all();

        return response()->json([
            'message' => 'All songs',
            'data' => $songs
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SongStoreRequest $request)
    {
        $data = $request->validated();

        try {
            Song::create($data);

            return response()->json([
                'message' => 'Song Created Successfully!!'
            ]);
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
        return $song;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SongUpdateRequest $request, Song $song)
    {
        $data = $request->validated();

        try {

            $song->fill($data)->update();

            return response()->json([
                'message' => 'Song Updated Successfully!!'
            ]);

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
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a album!!'
            ]);
        }
    }
}
