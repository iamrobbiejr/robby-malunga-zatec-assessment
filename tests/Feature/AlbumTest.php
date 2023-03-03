<?php

namespace Tests\Feature;

use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Response;
use Tests\TestCase;

class AlbumTest extends TestCase
{

    /**
     * A basic feature test example.
     */
    public function testAlbumIsCreatedSuccessfully()
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

        $payload = [
            "cover_image_url" => $this->faker->cover_image_url,
            "title" => $this->faker->title,
            "description" => $this->faker->description,
            "release_date" => $this->faker->release_date,
            "user_id" => $user->id,

        ];
        $this->json('post', 'api/user', $payload)
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure(
                [
                    'data' => [
                        'id',
                        'title',
                        'description',
                        'release_date',
                    ]
                ]
            );
        $this->assertDatabaseHas('users', $payload);
    }

    /**
     * A basic feature test example.
     */
    public function testUpdateAlbumReturnsCorrectData()
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
            "cover_image_url" => $this->faker->cover_image_url,
            "title" => $this->faker->title,
            "description" => $this->faker->description,
            "release_date" => $this->faker->release_date,
            "user_id" => $user->id,
        ];

        $this->json('put', "api/album/$album->id", $payload)
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson(
                [
                    'data' => [
                        'id' => $album->id,
                        'title' => $payload['title'],
                        'description' => $payload['description'],
                        'release_date' => $payload['release_date'],
                    ]
                ]
            );
    }


    /**
     * A basic feature test example.
     */
    public function testAlbumIsDestroyed()
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

        $this->json('delete', "api/album/$album->id")
            ->assertNoContent();
        $this->assertDatabaseMissing('albums', $albumData);
    }

}
