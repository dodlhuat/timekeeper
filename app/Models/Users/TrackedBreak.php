<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackedBreak extends Model
{
    use HasFactory;

    public function trackedWorkingTime()
    {
        return $this->hasOne(TrackedWorkingTime::class);
    }
}
