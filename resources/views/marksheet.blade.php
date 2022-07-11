@extends('layouts.app')

<link href="{{ mix('css/marksheet.css') }}" rel="stylesheet">

@section('content')
    <div class="container">
        <div class="selections">
            <p>Введите номер группы:</p>
            <input type="text" id="groupname">
        </div>
    </div>
@endsection

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
<script src="{{ mix('js/marksheet.js') }}" defer></script>

