<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    use HasFactory;

    protected $table = 'team_user';  // Define the table name if it's not following Laravel's naming convention

    // Disable timestamps if not needed
    public $timestamps = false;

    protected $fillable = ['team_id', 'user_id'];
}
