<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SearchController;
use App\Http\Livewire\Search;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::resource('marksheet', \App\Http\Controllers\StudentController::class);

//Route::get('search', [SearchController::class, 'index'])->name('search');
//Route::get('autocomplete', [SearchController::class, 'autocomplete'])->name('autocomplete');

Route::get('search', [Search::class, 'render'])->name('search');

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Auth::routes();
Route::get('/Student', function () {
    return view('welcomeStudent');})->name('Student');

Route::get('/Teacher', function () {
    return view('welcomeTeacher');
})->name('Teacher');

// Route::resource('/ScheduleTeacher','ScheduleController')->names('ScheduleTeacher');

Route::get('/room', function () {
    return view('welcomeRoom');
})->name('room');


Route::fallback(function () {
    return 'Резервный маршрут';
});
