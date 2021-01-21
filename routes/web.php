<?php

use App\Http\Controllers\AngularController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// this will allow angular routes to work and only handle /api routes with laravel
Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api).*$');

Route::get('/', function () {
    return view('welcome');
});
