<?php

namespace App\Transformers\Types;

use App\Transformers\AbstractBaseTransformer;

class WorkTypeTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['name'];

    protected $availableIncludes = ['tracked-working-times'];
}
