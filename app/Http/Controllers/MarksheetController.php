<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MarksheetController
{
    public function index()
    {
        return view('marksheet');
    }
}
