<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_login(): void
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

        $response = $this->post('/api/login', [
            "email" => $user->email,
            "password" => 'Test@1234'
        ]);

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     */
    public function testUserIsCreatedSuccessfully()
    {

        $payload = [
            "name" => $this->faker->name,
            "email" => $this->faker->email,
            "password" => "Test@1234",
            "password_confirmation" => "Test@1234"

        ];
        $this->json('post', 'api/signup', $payload)
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure(
                [
                    'data' => [
                        'id',
                        'name',
                        'email',
                        'created_at'
                    ]
                ]
            );
        $this->assertDatabaseHas('users', $payload);
    }
}
