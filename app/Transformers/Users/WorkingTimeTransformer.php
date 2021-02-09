<?php

namespace App\Transformers\Users;

use App\Transformers\AbstractBaseTransformer;

class WorkingTimeTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['active_at', 'minutes', 'day'];

    protected $availableIncludes = ['users'];

    protected $defaultIncludes = ['type'];
}
