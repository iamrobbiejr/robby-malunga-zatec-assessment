<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

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
    public function dashboardIndex()
    {
//        get authorized user
        $user = Auth::user();

        // retrieve all albums owned by user
        $albums = Album::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response([
            'message' => 'All albums available',
            'data' => $albums
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Album $album)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Album $album)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album)
    {
        //
    }
}
