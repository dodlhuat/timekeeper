<?php

namespace App\Models\Users;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userRoles()
    {
        return $this->belongsToMany(UserRole::class);
    }

    public function workingTimes()
    {
        return $this->belongsToMany(WorkingTime::class);
    }

    public function trackedWorkingTimes()
    {
        return $this->hasMany(TrackedWorkingTime::class);
    }

    public function absences()
    {
        return $this->belongsToMany(Absence::class);
    }

    public function holidayRequests()
    {
        return $this->belongsToMany(HolidayRequest::class);
    }
}
