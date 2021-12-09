@extends('admin.users.templates..main')
@section('content')

    <br>

    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1 class="float-start">{{ __('messages.edit user') }}</h1>
            </div>
        </div>
        <form method="POST" action="{{ route('admin.users.update', $user->id) }}">
            @method('PATCH')
            @include('admin.users.partials.form')
        </form>
    </div>

@endsection
