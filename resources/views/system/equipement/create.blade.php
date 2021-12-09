@extends('system.templates.main')

@section('content')

    <br>

    <div class="card">
        <h1>{{ __('messages.add equipments') }} </h1>
        <br>
        <form method="POST" action="{{ route('system.equipement_store') }}">
            @include('system.equipement.partials.form', ['create' => true])
        </form>
    </div>

    <script src="{{ asset('js/search.js') }}"></script>


@endsection
