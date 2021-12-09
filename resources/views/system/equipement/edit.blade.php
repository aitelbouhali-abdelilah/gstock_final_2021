@extends('system.templates.main')

@section('content')

    <br>
    <div class="card">
        <h1>{{ __('messages.edit equipments') }} ({{ $system_type }})</h1>
        <br>
        <form method="POST" action="{{ route('system.equipement.update', [$system_type, $equipement->id]) }}">
            @method('PATCH')
            @include('system.equipement.partials.form')
        </form>
    </div>

    <script src="{{ asset('js/search.js') }}"></script>


@endsection
