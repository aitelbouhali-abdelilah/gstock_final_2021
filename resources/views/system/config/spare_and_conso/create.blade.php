@extends('system.config.templates.main')
@section('config')



    <br>

    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <h2>{{ __('messages.add consomable') }} </h2>
            </div>
            <form method="POST" class="form" action="{{ route('system.spare_and_conso_store') }}">
                @csrf
                @include('system.config.spare_and_conso.partials.form', ['create' => true])

            </form>
            <br>

        </div>

    @endsection
