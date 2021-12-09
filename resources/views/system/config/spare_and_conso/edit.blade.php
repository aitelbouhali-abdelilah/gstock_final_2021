@extends('system.config.templates.main')

@section('config')


    <br>
    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <h2>{{ __('messages.edit consomable') }}</h2>
            </div>
            <form method="POST"
                action="{{ route('system.config.spare_and_conso.update', [$system_type, $piecelist->id]) }}">
                @method('PATCH')
                @csrf
                @include('system.config.spare_and_conso.partials.form')

            </form>
        </div>
    @endsection
