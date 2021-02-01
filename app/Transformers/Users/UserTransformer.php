<?php

namespace App\Transformers\Users;

use App\Models\Users\User;
use App\Transformers\AbstractBaseTransformer;

class UserTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['firstname', 'lastname'];

    protected $availableIncludes = ['user-roles'];

    public function includeUserRoles(User $user)
    {
        $userRoles = $user->userRoles;
        return $this->collection($userRoles, new UserRoleTransformer);
    }
}
