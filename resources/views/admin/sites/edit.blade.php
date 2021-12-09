@extends('admin.sites.templates..main')
@section('content')
    <br>

    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1 class="float-start">{{ __('messages.edit site') }}</h1>
            </div>
        </div>
        <form method="POST" action="{{ route('admin.sites.update', $site->id) }}">
            @method('PATCH')
            @include('admin.sites.partials.form')
        </form>
    </div>

@endsection
