<?php

namespace App\Transformers\Users;

use App\Transformers\AbstractBaseTransformer;

class TrackedBreakTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['start', 'end'];

    protected $defaultIncludes = ['tracked-working-time'];
}
