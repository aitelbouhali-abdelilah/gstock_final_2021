@extends('system.templates.main')

@section('content')

    <br>
    <div class="card">
        <h1> {{ __('messages.edit consomable') }} ({{ $system_type }})</h1>
        <br>
        <form method="POST" action="{{ route('system.rechange_and_conso.update', [$system_type, $piece->id]) }}">
            @method('PATCH')
            @include('system.rechange_and_conso.partials.form')
        </form>
    </div>

    <script src="{{ asset('js/search.js') }}"></script>


@endsection
