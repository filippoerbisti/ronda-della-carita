<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/user", [UserController::class, "anagrafica"]);

Route::get("/users", [UserController::class, "list"]);

Route::get("/users/{filter}", [UserController::class, "filter"]);

Route::post("/user/create", [UserController::class, "create"]);

Route::delete("/user/delete", [UserController::class, "delete"]);

Route::put("/user/modify", [UserController::class, "modify"]);


Route::get("/history", [HistoryController::class, "list"]);

Route::get("/history/{filter}", [HistoryController::class, "filter"]);


Route::get("/clients", [ClientController::class, "list"]);

Route::get("/clients/{filter}", [ClientController::class, "filter"]);

Route::post("/client/create", [ClientController::class, "create"]);

Route::delete("/client/delete", [ClientController::class, "delete"]);

Route::put("/client/modify", [ClientController::class, "modify"]);


Route::get("/orders", [OrderController::class, "list"]);

Route::get("/orders/{pass}", [OrderController::class, "filter"]);

Route::post("/order/create", [OrderController::class, "create"]);

Route::delete("/order/delete", [OrderController::class, "delete"]);

Route::put("/order/modify", [OrderController::class, "modify"]);


Route::get("/cards", [CardController::class, "list"]);

Route::post("/card/create", [CardController::class, "create"]);

Route::delete("/card/delete", [CardController::class, "delete"]);

Route::put("/card/modify", [CardController::class, "modify"]);
