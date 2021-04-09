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

/**
 * Resource Key
 *
 * Returns the resouce key related to the input model
 *
 * @param $model
 * @return string|string[]
 */
function resourceKey($model)
{
    if (!$model || ($model instanceof Collection && $model->isEmpty())) {
        return '';
    }

    $tableName = '';
    if ($model instanceof Collection) {
        if ($model->first()) {
            $tableName = $model->first()->getTable();
        }
    } else {
        if ($model instanceof Model) {
            $tableName = $model->getTable();
        } else {
            $tableName = app($model)->getTable();
        }
    }

    return str_replace('_', '-', $tableName);
}
