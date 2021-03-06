<?php

namespace App\Models\Users;

use App\Models\Types\WorkType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackedWorkingTime extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function workType()
    {
        return $this->belongsTo(WorkType::class, 'type_id');
    }
}
