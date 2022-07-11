@extends('layouts.app')

<link href="{{ mix('css/search2.css') }}" rel="stylesheet">

@section('content')
    <div class="container">
        <div class="selections">
            <p>Введите фамилию, имя, логин, номер студенческого билета или номер зачётной книжки:</p>
            <input type="text" id="selector">
        </div>
    </div>
@endsection

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
<script src="{{ mix('js/search2.js') }}" defer></script>
