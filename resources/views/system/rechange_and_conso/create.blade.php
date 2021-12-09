@extends('system.templates.main')

@section('content')

    <br>
    <div class="card">
        <h1>{{ __('messages.add consomable') }}</h1>
        <br>
        <form method="POST" action="{{ route('system.rechange_and_conso_store') }}">
            @include('system.rechange_and_conso.partials.form', ['create' => true])
        </form>
    </div>

    <script src="{{ asset('js/search.js') }}"></script>


@endsection
