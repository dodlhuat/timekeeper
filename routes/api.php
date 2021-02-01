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

/**
 * Authentication Routes
 */
/*
Route::group(['prefix' => 'auth/v1', 'middleware' => 'api'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
});
*/

Route::post('login', 'App\Http\Controllers\AuthController@login');
