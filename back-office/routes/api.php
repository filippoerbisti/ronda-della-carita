<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ClotheController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ParamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);

    // User
    // Route::get('/user/email/{email}/psw/{password}', [UserController::class, 'anagrafica']);
    Route::get('/user', [UserController::class, 'anagrafica']);

    Route::get('/user/{id}', [UserController::class, 'id']);

    Route::get('/users', [UserController::class, 'list']);

    Route::get('/users/{filter}', [UserController::class, 'filter']);

    Route::post('/user/create', [UserController::class, 'create']);

    Route::delete('/user/delete/{id}', [UserController::class, 'delete']);

    Route::put('/user/edit/{id}', [UserController::class, 'edit']);


    // History
    Route::get('/history', [HistoryController::class, 'list']);

    Route::get('/history/{id}', [HistoryController::class, 'id']);

    Route::get('/history/filt/{filter}', [HistoryController::class, 'filter']);

    Route::get('/history/accessi/count', [HistoryController::class, 'countAccessi']);

    Route::get('/history/accessi/today', [HistoryController::class, 'todayAccessi']);

    Route::post('/history/create', [HistoryController::class, 'create']);


    // Param
    Route::get('/param/gender', [ParamController::class, 'gender']);

    Route::get('/param/type_doc', [ParamController::class, 'type_doc']);

    Route::get('/param/order_status', [ParamController::class, 'order_status']);


    // Client
    Route::get('/clients', [ClientController::class, 'list']);

    Route::get('/client/{id}', [ClientController::class, 'id']);

    Route::get('/clients/{filter}', [ClientController::class, 'filter']);

    Route::post('/client/create', [ClientController::class, 'create']);

    Route::delete('/client/delete/{id}', [ClientController::class, 'delete']);

    Route::put('/client/edit/{id}', [ClientController::class, 'edit']);


    // Order
    Route::get('/orders', [OrderController::class, 'list']);

    Route::get('/order/{id}', [OrderController::class, 'id']);

    Route::get('/orders/filt/{status}/search/{search}', [OrderController::class, 'filter']);

    Route::post('/order/create', [OrderController::class, 'create']);

    Route::delete('/order/delete/{id}', [OrderController::class, 'delete']);

    Route::put('/order/edit/{id}', [OrderController::class, 'edit']);

    // Order Notification
    Route::get('/orders/daconf', [OrderController::class, 'countOrderDaConf']);

    Route::get('/orders/notif/daconf', [OrderController::class, 'orderDaConf']);

    Route::get('/orders/nondisp', [OrderController::class, 'countOrderNonDisp']);

    Route::get('/orders/notif/nondisp', [OrderController::class, 'orderNonDisp']);

    Route::get('/orders/inattesa', [OrderController::class, 'countOrderInAttesa']);

    Route::get('/orders/notif/inattesa', [OrderController::class, 'orderInAttesa']);


    // Clothe
    Route::get('/clothes', [ClotheController::class, 'list']);

    Route::get('/clothe/edit/{id}', [ClotheController::class, 'id']);


    // Card
    Route::get('/cards', [CardController::class, 'list']);

    Route::post('/card/create', [CardController::class, 'create']);

    Route::delete('/card/delete/{id}', [CardController::class, 'delete']);

    Route::put('/card/edit/{id}', [CardController::class, 'edit']);
});