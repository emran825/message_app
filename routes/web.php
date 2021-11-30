<?php

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/message/load-user', [App\Http\Controllers\MessageController::class, 'loadUser']);
Route::get('/message/view-user/{id}', [App\Http\Controllers\MessageController::class, 'userView']);
Route::post('/message/load-message', [App\Http\Controllers\MessageController::class, 'loadMessage']);
Route::post('/message/message-sent', [App\Http\Controllers\MessageController::class, 'newMsgSent']);
//Route::post('/message/message-sent',array('as'=>'message Sent', 'action_id'=>'128', 'uses' =>'MessageController@newMsgSent'));
// Route::post('/message/load-message',array('as'=>'Load Message', 'action_id'=>'127', 'uses' =>'MessageController@loadMessage'));
//Route::get('/message/view-user/{id}',array('as'=>'Get user View','action_id'=>'127', 'uses' =>'MessageController@userView'))->name('check');
//Route::get('/message/load-user',array('as'=>'Load User','action_id'=>'127', 'uses' =>'MessageController@loadUser'));
// Route::get('/message/load-user','MessageController@loadUser');
//
