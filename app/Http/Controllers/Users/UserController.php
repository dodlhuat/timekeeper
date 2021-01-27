<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerInterface;
use App\Models\Users\User;
use Illuminate\Http\Request;

class UserController extends Controller implements ControllerInterface
{
    //
    public function index() {
        return $this->getIndexForModel(User::class);
        return User::all();
    }

    public function show($id) {
        return User::find($id);
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
