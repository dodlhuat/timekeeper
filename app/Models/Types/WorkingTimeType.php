<?php

namespace App\Models\Types;

use App\Models\Users\WorkingTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkingTimeType extends Model
{
    use HasFactory;

    public function workingTimes() {
        return $this->belongsToMany(WorkingTime::class);
    }
}
