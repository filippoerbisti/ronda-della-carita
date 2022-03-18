<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClotheController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

// Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/user-profile', [AuthController::class, 'me']); 

    Route::post('/logout', [AuthController::class, 'logout']);

    // User
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


    // Client
    Route::get('/clients', [ClientController::class, 'list']);

    Route::get('/client/{id}', [ClientController::class, 'id']);

    Route::get('/client/by_tessera/{tessera}', [ClientController::class, 'getClientByTessera']);

    Route::get('/clients/{filter}', [ClientController::class, 'filter']);

    Route::post('/client/create', [ClientController::class, 'create']);

    Route::delete('/client/delete/{id}', [ClientController::class, 'delete']);

    Route::put('/client/edit/{id}', [ClientController::class, 'edit']);


    // Order
    Route::get('/orders', [OrderController::class, 'list']);  //funzia

    Route::get('/order/{id}', [OrderController::class, 'id']);

    // Route::get('/order/{n_ordine}', [OrderController::class, 'n_ordine']);

    Route::get('/order/history/{id}', [OrderController::class, 'history']);

    Route::get('/orders/filt/{status}/search/{search}', [OrderController::class, 'filter']);

    Route::post('/order/create', [OrderController::class, 'create']);

    Route::delete('/order/delete/{id}', [OrderController::class, 'delete']);

    Route::put('/order/edit/{id}', [OrderController::class, 'edit']);

    Route::put('/order/confirm/{id}', [OrderController::class, 'confirm']);

    Route::get('/orderLabel/{id}', [OrderController::class, 'showLabel']);

    Route::get('/clothes/options', [OrderController::class, 'getOptions']);

    Route::get('/stages/options', [OrderController::class, 'getStagesOptions']);

    // Order Notification
    Route::get('/orders/daconf', [OrderController::class, 'countOrderDaConf']);

    Route::get('/orders/notif/daconf', [OrderController::class, 'orderDaConf']);

    Route::get('/orders/nondisp', [OrderController::class, 'countOrderNonDisp']);

    Route::get('/orders/notif/nondisp', [OrderController::class, 'orderNonDisp']);

    Route::get('/orders/inattesa', [OrderController::class, 'countOrderInAttesa']);

    Route::get('/orders/notif/inattesa', [OrderController::class, 'orderInAttesa']);

    // Download PDF
    Route::get('/download/pdf/{id}', [OrderController::class, 'createPDF']);


    // Clothe
    Route::get('/clothes', [ClotheController::class, 'list']);

    Route::get('/clothe/edit/{id}', [ClotheController::class, 'id']);

    // Email
    Route::get('/sendmail/{id}', [MailController::class, 'sendEmail']);

// });