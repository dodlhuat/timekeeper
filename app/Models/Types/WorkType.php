<?php

namespace App\Models\Types;

use App\Models\Users\TrackedWorkingTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkType extends Model
{
    use HasFactory;

    public function trackedWorkingTimes() {
        return $this->belongsToMany(TrackedWorkingTime::class);
    }
}
