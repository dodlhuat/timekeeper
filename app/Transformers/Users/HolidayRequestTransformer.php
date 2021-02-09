<?php

namespace App\Transformers\Users;

use App\Transformers\AbstractBaseTransformer;

class HolidayRequestTransformer extends AbstractBaseTransformer
{
    protected $attributes = ['date_from', 'date_to', 'minutes', 'accepted', 'reason'];

    protected $availableIncludes = ['users'];
}
