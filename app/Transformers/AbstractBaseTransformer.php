<?php

namespace App\Transformers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Collection;
use League\Fractal\TransformerAbstract;

abstract class AbstractBaseTransformer extends TransformerAbstract {
    /**
     * @var array contains all attributes that should be shown in the api response
     */
    protected $attributes = [];

    /**
     * @var string[] contains default attributes that will be in a api response if available
     */
    protected $defaultAttributes = ['id', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * @var array mapping of includes if needed
     */
    protected $typeMappings = [];

    public function transform($model) {
        $finalAttributes = [];
        // always add id
        $finalAttributes['id'] = (int)$model->id;
        $finalAttributes['visible'] = $model->deleted_at == null;
        $this->addAttributes($model, $finalAttributes);
        return $finalAttributes;
    }

    /**
     * Add Attributes
     *
     * add all attributes set in the array
     *
     * @param Model $model
     * @param array $attributes
     */
    private function addAttributes(Model $model, &$attributes = []) {
        foreach ($this->attributes as $attribute) {
            $attributes[$attribute] = $model->$attribute;
        }
    }

    // automatically create include function if called
    public function __call($name, $arguments) {
        if (strpos($name, 'include') === 0) {
            $model = $arguments[0];
            $method = lcfirst(str_replace('include', '', $name));


            $relationResponse = $model->{$method}();

            // get data via magic property if response of type MorphTo
            if ($relationResponse instanceof MorphTo) {
                $relationResponse = $model->{$method};
            } elseif ($relationResponse instanceof BelongsTo || $relationResponse instanceof HasOne || $relationResponse instanceof MorphOne || $relationResponse instanceof HasOneThrough) {
                // item returned - call first
                $relationResponse = $relationResponse->first();
            } elseif ($relationResponse instanceof Relation) {
                // collection return - call get
                $relationResponse = $relationResponse->get();
            }

            if ($relationResponse instanceof Collection) {
                return $this->collection($relationResponse, transformerClass($relationResponse), resourceKey($relationResponse));

                // input is item
            } else {
                // dont show relation if element not found
                if (!$relationResponse) {
                    return $this->null();
                }
                return $this->item($relationResponse, transformerClass($relationResponse), resourceKey($relationResponse));
            }

        }
    }
}
