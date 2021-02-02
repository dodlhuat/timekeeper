<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'users'], function () {
    Route::get('/', 'App\Http\Controllers\Users\UserController@index');
    Route::get('/{id}', 'App\Http\Controllers\Users\UserController@show');
});

Route::group(['prefix' => 'user-roles'], function () {
    Route::get('/', 'App\Http\Controllers\Users\UserRoleController@index');
    Route::get('/{id}', 'App\Http\Controllers\Users\UserRoleController@show');
});

Route::group(['prefix' => 'actions'], function () {
    Route::get('/', 'App\Http\Controllers\Users\ActionController@index');
    Route::get('/{id}', 'App\Http\Controllers\Users\ActionController@show');
});

/**
 * Authentication Routes
 */
Route::post('login', 'App\Http\Controllers\AuthController@login');
