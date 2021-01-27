<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

interface ControllerInterface {
    /**
     * Index
     *
     * show JSON response for a list of requested model
     *
     * @return string
     */
    public function index();

    /**
     * Show
     *
     * show JSON response for a given id
     *
     * @param $id
     * @return mixed
     */
    public function show($id);

    /**
     * Store
     *
     * create a model with the given data
     *
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request);

    /**
     * Update
     *
     * update an existing model
     *
     * @param $id
     * @param Request $request
     * @return mixed
     */
    public function update($id, Request $request);

    /**
     * Delete
     *
     * delete an existing model
     *
     * @param $id
     * @return mixed
     */
    public function delete($id);
}
