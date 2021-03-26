<?php

use Illuminate\Support\Facades\Auth;
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

Route::get('/unauthorized', function () {
    return response(['error' => 'Unauthorized', 'code' => 401], 401)->header('Content-Type', 'text/json');
})->name('unauthorized');


    Route::get('/token-check', function () {
        return response()->json(['valid' => Auth::guard('api')->check()]);
    });


Route::group(['prefix' => 'users', 'middleware' => 'auth:api'], function () {
    Route::get('/', 'App\Http\Controllers\Users\UserController@index');
    Route::get('/current', function () {
        return ['data' => ['id' => auth()->user()->id]];
    });
    Route::get('/{id}', 'App\Http\Controllers\Users\UserController@show');
});

Route::group(['prefix' => 'user-roles', 'middleware' => 'auth:api'], function () {
    Route::get('/', 'App\Http\Controllers\Users\UserRoleController@index');
    Route::get('/{id}', 'App\Http\Controllers\Users\UserRoleController@show');
});

Route::group(['prefix' => 'actions', 'middleware' => 'auth:api'], function () {
    Route::get('/', 'App\Http\Controllers\Users\ActionController@index');
    Route::get('/{id}', 'App\Http\Controllers\Users\ActionController@show');
});

/**
 * Authentication Routes
 */
Route::post('login', 'App\Http\Controllers\AuthController@login');
