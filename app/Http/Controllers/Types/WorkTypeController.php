<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerInterface;
use App\Models\Types\WorkType;
use Illuminate\Http\Request;

class WorkTypeController extends Controller implements ControllerInterface
{
    //
    public function index() {
        return $this->getIndexForModel(WorkType::class);
    }

    public function show($id) {
        return $this->getShowForModel(WorkType::class, $id);
    }

    public function store(Request $request) {
        // TODO: Implement store() method.
    }

    public function update($id, Request $request) {
        // TODO: Implement update() method.
    }

    public function delete($id) {
        // TODO: Implement delete() method.
    }
}
