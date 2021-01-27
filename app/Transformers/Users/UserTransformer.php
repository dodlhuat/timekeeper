<?php

namespace App\Transformers\Users;

use App\Transformers\AbstractBaseTransformer;

class UserTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['firstname', 'lastname'];
}
