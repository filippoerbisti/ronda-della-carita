<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/user", [UserController::class, "anagrafica"]);

Route::get("/user/{id}", [UserController::class, "id"]);

Route::get("/users", [UserController::class, "list"]);

Route::get("/users/{filter}", [UserController::class, "filter"]);

Route::post("/user/create", [UserController::class, "create"]);

Route::delete("/user/delete/{id}", [UserController::class, "delete"]);

Route::put("/user/edit/{id}", [UserController::class, "edit"]);


Route::get("/history", [HistoryController::class, "list"]);

Route::get("/history/{filter}", [HistoryController::class, "filter"]);

Route::get("/history/accessi/count", [HistoryController::class, "countAccessi"]);


Route::get("/clients", [ClientController::class, "list"]);

Route::get("/client/{id}", [ClientController::class, "id"]);

Route::get("/clients/{filter}", [ClientController::class, "filter"]);

Route::post("/client/create", [ClientController::class, "create"]);

Route::delete("/client/delete/{id}", [ClientController::class, "delete"]);

Route::put("/client/edit/{id}", [ClientController::class, "edit"]);


Route::get("/orders", [OrderController::class, "list"]);

Route::get("/order/{id}", [OrderController::class, "id"]);

Route::get("/orders/filt/{status}", [OrderController::class, "filter"]);

//Route::get("/orders/{fastsearch}", [OrderController::class, "fastSearch"]);

Route::get("/orders/nondisp", [OrderController::class, "countOrderNonDisp"]);

Route::get("/orders/inattesa", [OrderController::class, "countOrderInAttesa"]);

Route::post("/order/create", [OrderController::class, "create"]);

Route::delete("/order/delete/{id}", [OrderController::class, "delete"]);

Route::put("/order/edit/{id}", [OrderController::class, "edit"]);


Route::get("/cards", [CardController::class, "list"]);

Route::post("/card/create", [CardController::class, "create"]);

Route::delete("/card/delete/{id}", [CardController::class, "delete"]);

Route::put("/card/edit/{id}", [CardController::class, "edit"]);
