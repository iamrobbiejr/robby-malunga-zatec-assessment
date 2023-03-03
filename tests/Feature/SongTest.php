<?php

namespace Tests\Feature;

use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\Response;
use Tests\TestCase;

class SongTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    /**
     * A basic feature test example.
     */
    public function testSongIsCreatedSuccessfully()
    {

        $userData =
            [
                "name" => $this->faker->name,
                "email" => $this->faker->email,
                "password" => "Test@1234",
                "password_confirmation" => "Test@1234"
            ];
        $user = User::create(
            $userData
        );

        $albumData =
            [
                "cover_image_url" => $this->faker->cover_image_url,
                "title" => $this->faker->title,
                "description" => $this->faker->description,
                "release_date" => $this->faker->release_date,
                "user_id" => $user->id,
            ];
        $album = Album::create(
            $albumData
        );


        $payload = [
            "title" => $this->faker->title,
            "length" => $this->faker->length,
            "genre" => $this->faker->genre,
            "album_id" => $album->id,

        ];
        $this->json('post', 'api/user', $payload)
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure(
                [
                    'data' => [
                        'title',
                        'genre',
                        'album_id',
                        'length'
                    ]
                ]
            );
        $this->assertDatabaseHas('users', $payload);
    }

    /**
     * A basic feature test example.
     */
    public function testUpdateSongReturnsCorrectData()
    {
        $userData =
            [
                "name" => $this->faker->name,
                "email" => $this->faker->email,
                "password" => "Test@1234",
                "password_confirmation" => "Test@1234"
            ];
        $user = User::create(
            $userData
        );

        $albumData =
            [
                "cover_image_url" => $this->faker->cover_image_url,
                "title" => $this->faker->title,
                "description" => $this->faker->description,
                "release_date" => $this->faker->release_date,
                "user_id" => $user->id,
            ];
        $album = Album::create(
            $albumData
        );

        $songData =
            [
                "title" => $this->faker->title,
                "length" => $this->faker->length,
                "genre" => $this->faker->genre,
                "album_id" => $album->id,
            ];
        $song = Song::create(
            $songData
        );

        $payload = [
            "title" => $this->faker->title,
            "length" => $this->faker->length,
            "genre" => $this->faker->genre,
            "album_id" => $album->id,
        ];

        $this->json('put', "api/song/$song->id", $payload)
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson(
                [
                    'data' => [
                        'id' => $song->id,
                        'title' => $payload['title'],
                        'length' => $payload['length'],
                        'genre' => $payload['genre'],
                    ]
                ]
            );
    }


    /**
     * A basic feature test example.
     */
    public function testSongIsDestroyed()
    {

        $userData =
            [
                "name" => $this->faker->name,
                "email" => $this->faker->email,
                "password" => "Test@1234",
                "password_confirmation" => "Test@1234"
            ];
        $user = User::create(
            $userData
        );

        $albumData =
            [
                "cover_image_url" => $this->faker->cover_image_url,
                "title" => $this->faker->title,
                "description" => $this->faker->description,
                "release_date" => $this->faker->release_date,
                "user_id" => $user->id,
            ];
        $album = Album::create(
            $albumData
        );

        $songData =
            [
                "title" => $this->faker->title,
                "length" => $this->faker->length,
                "genre" => $this->faker->genre,
                "album_id" => $album->id,
            ];
        $song = Song::create(
            $songData
        );

        $this->json('delete', "api/song/$song->id")
            ->assertNoContent();
        $this->assertDatabaseMissing('songs', $songData);
    }
}
