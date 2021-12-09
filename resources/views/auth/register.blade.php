@extends('templates.main')

@section('content')
    <br>
    <h1>{{ __('messages.register') }}</h1>
    <br>

    <form method="POST" action="{{ route('register') }}">
        @csrf

        <div class="mb-3">
            <label for="name" class="form-label">{{ __('messages.name') }}</label>
            <input name="name" type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                aria-describedby="name" value="{{ old('name') }}">
            @error('name')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">{{ __('messages.email') }}</label>
            <input name="email" type="email" class="form-control @error('email') is-invalid @enderror" id="email"
                aria-describedby="email" value="{{ old('email') }}">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">{{ __('messages.password') }}</label>
            <input name="password" type="password" class="form-control @error('password') is-invalid @enderror"
                id="password">
            @error('password')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
        <div class="mb-3">
            <label for="password_confirmation" class="form-label">{{ __('messages.password') }}</label>
            <input name="password_confirmation" type="password" class="form-control" id="password_confirmation">
        </div>
        <button type="submit" class="btn btn-primary">{{ __('messages.submit') }}</button>
    </form>
@endsection
