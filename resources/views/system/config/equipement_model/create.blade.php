@extends('system.config.templates.main')

@section('config')


    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <h2>{{ __('messages.add model') }}</h2>
            </div>


            <form method="POST" action="{{ route('system.equipement_model_store') }}">
                @csrf
                @include('system.config.equipement_model.partials.form', ['create' => true])

            </form>
        </div>
    @endsection
