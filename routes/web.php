<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotesController;

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

/*Mostrar*/
Route::get('/mostrar', [NotesController::class, 'mostrarNotes']);

Route::post('/shows', [NotesController::class, 'filtrarNotesAjax']);

/*Crear*/
Route:: post('crear', [NotesController::class, 'crearNotes']);

/*Actualizar*/
Route::put('modificar', [NotesController::class, 'modificarNotes']);

/*Eliminar*/
Route::delete('/eliminar/{id}', [NotesController::class, 'eliminarNotes']);