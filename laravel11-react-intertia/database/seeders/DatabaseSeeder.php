<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use App\Models\Comment;
use App\Models\Project;
use App\Models\TeamUser;
use App\Models\ActivityLog;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Users
        User::factory(10)->create();

        // Create Teams
        Team::factory(5)->create()->each(function ($team) {
            $team->users()->attach(User::inRandomOrder()->take(3)->pluck('id'));
        });

        // Seed data for TeamUser pivot table
        TeamUser::factory()->count(50)->create();

        // Create Projects
        Project::factory(5)->create();

        // Create Tasks
        Task::factory(20)->create();

        // Create Comments
        Comment::factory(50)->create();

        // Create Activity Logs
        ActivityLog::factory(50)->create();
    }
}
