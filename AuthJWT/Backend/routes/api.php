<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::get('/profile', [AuthController::class,'profile']);
Route::post('/logout', [AuthController::class,'logout']);
Route::post('/refresh', [AuthController::class,'refresh']);

Route::get('/product', [ProductController::class, 'index']);
Route::post('/product/create', [ProductController::class, 'store']);
Route::put('/product/update', [ProductController::class, 'edit']);
Route::delete('/product/delete', [ProductController::class, 'delete']);
Route::put('/product/charge', [ProductController::class, 'charge']);

Route::get('/order', [OrderController::class, 'index']);
Route::get('/order/{user_id}', [OrderController::class, 'orderById']);
Route::post('/order/create', [OrderController::class, 'order']);
Route::put('/deposit/{user_id}', [OrderController::class, 'deposit']);
Route::put('/order/update', [OrderController::class, 'updateStatus']);
Route::get('/benefit', [OrderController::class, 'benefit']);


