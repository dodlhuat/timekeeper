<?php

namespace App\Transformers\Users;

use App\Transformers\AbstractBaseTransformer;

class AbsenceTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['minutes', 'date'];

    protected $availableIncludes = ['users'];

    protected $defaultIncludes = ['type'];
}
