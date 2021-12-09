@extends('admin.occupation.templates.main')
@section('content')
    <br>
    <div class="card">
    <div class="row">
        <div class="col-sm-8">
            <h1>{{ __('messages.edit function') }}</h1>
        </div>
        <form method="POST" action="{{ route('admin.occupation.update', $occupation->id) }}">
            @method('PATCH')
            @include('admin.occupation.partials.form')
        </form>
    </div>
    </div>

@endsection
