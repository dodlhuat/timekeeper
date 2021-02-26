<?php

use App\Transformers\AbstractBaseTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Transformer Class
 *
 * @param $model
 * @return AbstractBaseTransformer
 */
function transformerClass($model): AbstractBaseTransformer {
    if (!$model || ($model instanceof Collection && $model->isEmpty())) {
        return new class extends AbstractBaseTransformer {
        };
    }

    $model = ($model instanceof Collection ? $model->first() : $model);

    $modelName = ($model instanceof Model ? get_class($model) : $model);
    $transformerName = (str_replace('App\\Models\\', 'App\\Transformers\\', $modelName) . 'Transformer');

    return new $transformerName;
}
