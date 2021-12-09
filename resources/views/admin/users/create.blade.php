@extends('admin.users.templates.main')
@section('content')

    <br>

    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1 class="float-start">{{ __('messages.add user') }}</h1>
            </div>
        </div>
        <form method="POST" action="{{ route('admin.users.store') }}">
            @include('admin.users.partials.form', ['create' => true])
        </form>
    </div>

@endsection
