@extends('system.config.templates.main')

@section('config')
<style>
    .nav-tabs {
    border-bottom: 0px solid #dee2e6;
    }
    .card {
        box-shadow: unset;
        border: 0;
    }
    .nav-tabs .nav-link {
        background-color: #0095da;
        color: white;
    }
</style>
    <ul class="nav nav-tabs justify-content-center">

        <li class="nav-item">
            <a class="nav-item nav-link me-2 active"
                href="{{ route('system.config.equipement_type.index', $system_type) }}">
                {{ __('messages.types management') }} </a>
        </li>
        <li class="nav-item">
            <a class="nav-item nav-link me-2" href="{{ route('system.config.equipement_model.index', $system_type) }}">
                {{ __('messages.models mangement') }} </a>
        </li>

    </ul>
    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <h2>{{ __('messages.edit type') }}</h2>
            </div>
            <form method="POST" action="{{ route('system.config.equipement_type.update', [$system_type, $type->id]) }}">
                @method('PATCH')
                @csrf
                @include('system.config.equipement_type.partials.form')

            </form>
        </div>
    @endsection
