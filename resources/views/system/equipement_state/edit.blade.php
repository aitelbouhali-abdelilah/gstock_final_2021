@extends('system.templates.main')

@section('content')

    <br>
    <div class="card">
        <h1>{{ __('messages.edit equipement details') }}</h1>
        <br>
        <form method="POST" action="{{ route('system.equipement_state.update', [$system_type, $equipement_state->id]) }}">
            @method('PATCH')
            @include('system.equipement_state.partials.form')
        </form>
    </div>

    <script src="{{ asset('js/search.js') }}"></script>


@endsection
