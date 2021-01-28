<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerInterface;
use App\Models\Users\UserRole;
use Illuminate\Http\Request;

class UserRoleController extends Controller implements ControllerInterface
{
    //
    public function index() {
        return $this->getIndexForModel(UserRole::class);
    }

    public function show($id) {
        return UserRole::find($id);
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
