@extends('system.config.templates.main')

@section('config')



    <br>

    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <h2>{{ __('messages.add type') }} </h2>
            </div>

            <form method="POST" class="form" action="{{ route('system.equipement_type_store') }}">
                @csrf
                @include('system.config.equipement_type.partials.form', ['create' => true])

            </form>
            <br>

        </div>

    @endsection
