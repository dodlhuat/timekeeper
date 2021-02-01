<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'user_role_action');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
