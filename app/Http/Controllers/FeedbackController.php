<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        //dd($request);
        $rating = [
            'id_permohonan_layanan'=>$request->id_permohonan_layanan,
            'kecepatan'=>$request->kecepatan,
            'kesesuaian'=>$request->kesesuaian,
            'kemudahan'=>$request->kemudahan,
            'saran'=>$request->saran
        ];
        Feedback::create($rating);
        return to_route('detailTiket', ['no_tiket' => $request->no_tiket])
    ->with('message', 'Data berhasil diupdate');

    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feedback $feedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feedback $feedback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        //
    }
}
