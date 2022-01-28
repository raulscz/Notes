<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotesController extends Controller
{
    /*Mostrar*/
    public function mostrarNotes(){
        $listaNotes = DB::table('tbl_notes')->get();
        return view('mostrar', compact('listaNotes'));
    }

    public function filtrarNotesAjax(Request $request){
        $listaNotes = DB::select('select * from tbl_notes where titulo_notes like ?',['%'.$request->input('nombre').'%']);
        return response()->json($listaNotes);
    }

    /*Crear*/
    public function crearNotes(Request $request){
        try{
            DB::insert('insert into tbl_notes (titulo_notes, desc_notes) values (?,?)',[$request->input('titulo_notes'),$request->input('desc_notes')]);
            return response()->json(array('resultado'=> 'OK'));
        }catch(\Throwable $th){
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }

    /*Actualizar*/
    public function modificarNotes(Request $request){
        try{
            DB::update('update tbl_notes set titulo_notes=?, desc_notes=? where id=?',[$request->input('titulo_notes'),$request->input('desc_notes'),$request->input('idRegis')]);
            return response()->json(array('resultado'=> 'OK'));
        }catch(\Throwable $th){
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }

    /*Eliminar*/
    public function eliminarNotes($id){
        try {
            DB::delete('delete from tbl_notes where id=?',[$id]);
            //return redirect()->route('clientes.index');
            return response()->json(array('resultado'=> 'OK'));
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notes  $notes
     * @return \Illuminate\Http\Response
     */
    public function show(Notes $notes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notes  $notes
     * @return \Illuminate\Http\Response
     */
    public function edit(Notes $notes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notes  $notes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notes $notes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notes  $notes
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notes $notes)
    {
        //
    }
}
