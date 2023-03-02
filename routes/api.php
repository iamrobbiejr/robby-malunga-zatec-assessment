<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// public routes
Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/albums', [AlbumController::class, 'index']);
Route::get('/songs', [SongController::class, 'index']);
Route::get('/genre/{genre}', [SongController::class, 'songsByGenre']);

// private routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('album', AlbumController::class);
    Route::apiResource('song', SongController::class);
    Route::get('/songs/{album}', [SongController::class, 'albumSongs']);
    Route::get('/albums/{user}', [AlbumController::class, 'dashboardIndex']);
});

