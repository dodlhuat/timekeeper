<?php

namespace App\Transformers\Users;

use App\Models\Users\User;
use App\Transformers\AbstractBaseTransformer;

class UserTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['firstname', 'lastname'];

    protected $availableIncludes = ['user-role'];

    public function includeUserRole(User $user)
    {
        $userRole = $user->userRole;
        return $this->collection($userRole, new UserRoleTransformer);
    }
}
