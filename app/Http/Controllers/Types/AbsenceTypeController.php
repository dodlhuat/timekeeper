<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerInterface;
use App\Models\Types\AbsenceType;
use Illuminate\Http\Request;

class AbsenceTypeController extends Controller implements ControllerInterface
{
    //
    public function index() {
        return $this->getIndexForModel(AbsenceType::class);
    }

    public function show($id) {
        return $this->getShowForModel(AbsenceType::class, $id);
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
