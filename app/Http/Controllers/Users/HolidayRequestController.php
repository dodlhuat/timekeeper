<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerInterface;
use App\Models\Users\HolidayRequest;
use Illuminate\Http\Request;

class HolidayRequestController extends Controller implements ControllerInterface
{
    //
    public function index() {
        return $this->getIndexForModel(HolidayRequest::class);
    }

    public function show($id) {
        return $this->getShowForModel(HolidayRequest::class, $id);
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
