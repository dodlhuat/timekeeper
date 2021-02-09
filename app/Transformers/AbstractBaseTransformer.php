<?php

namespace App\Transformers;

use Illuminate\Database\Eloquent\Model;
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


            $collectionData = $model->$method;
            return $this->collection($collectionData, transformerClass($collectionData));
        }
    }
}
