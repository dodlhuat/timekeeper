<?php

namespace App\Models\Users;

use App\Models\Types\WorkingTimeType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkingTime extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function type()
    {
        return $this->hasOne(WorkingTimeType::class);
    }
}
