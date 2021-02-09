<?php

namespace App\Models\Types;

use App\Models\Users\Absence;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceType extends Model
{
    use HasFactory;

    public function workingTimes() {
        return $this->belongsToMany(Absence::class);
    }
}
