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

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/', [App\Http\Controllers\WelcomeController::class, 'index'])->name('welcome');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::resource('marksheet', \App\Http\Controllers\StudentController::class);

//Route::get('search', [SearchController::class, 'index'])->name('search');
//Route::get('autocomplete', [SearchController::class, 'autocomplete'])->name('autocomplete');

Route::get('search', [Search::class, 'render'])->name('search');

//Route::resource('student', \App\Http\Controllers\StudentController::class);

Route::get('/Student', function () {
    return view('welcomeStudent');})->name('Student');

Route::get('/Teacher', function () {
    return view('welcomeTeacher');
})->name('Teacher');

Route::resource('/ScheduleTeacher','ScheduleController')->names('ScheduleTeacher');

Route::get('/Room', function () {
    return view('welcomeRoom');
})->name('room');

Route::get('/Marksheet', 'MarksheetController@index');

Route::get('/Search2', 'Search2Controller@index');

Route::fallback(function () {
    return 'Резервный маршрут';
});

Route::get('/clear', function() {

    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('view:clear');

    return "Cleared!";

});
