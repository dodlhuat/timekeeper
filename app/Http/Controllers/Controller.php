<?php

namespace App\Http\Controllers;

use App\Transformers\AbstractBaseTransformer;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use League\Fractal\Resource\Collection;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getIndexForModel(string $className)
    {
        $transformer = $this->getTransformer($className);
        $resource = new Collection(app($className)->all(), $transformer);

        $fractal = new Manager();

        // add includes
        if (isset($_GET['include'])) {
            $fractal->parseIncludes($_GET['include']);
        }
        return $fractal->createData($resource)->toJson();
    }

    public function getShowForModel(string $className)
    {

    }

    /**
     * Get Transformer
     *
     * @param string $className
     * @return AbstractBaseTransformer
     */
    private function getTransformer(string $className)
    {
        $transformer_name = str_replace('App\\Models\\', 'App\\Transformers\\', $className) . 'Transformer';
        return new $transformer_name;
    }
}
