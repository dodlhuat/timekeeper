<?php

namespace App\Transformers\Users;

use App\Transformers\AbstractBaseTransformer;

class TrackedWorkingTimeTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['start', 'end'];

    protected $availableIncludes = ['users', 'work-type'];
}
