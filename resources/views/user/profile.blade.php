@extends('templates.main')

@section('content')

    <br>
    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1 class="float-start">{{ __('messages.Update profile') }}</h1>
            </div>
        </div>
        <form method="POST" action="{{ route('user.profile') }}">
            @csrf
            @method('PUT')
            <div class="mb-3">
                <label for="name" class="form-label">{{ __('messages.name') }}</label>
                <input name="name" type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                    aria-describedby="name" value="{{ auth()->user()->name }}">
                @error('name')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">{{ __('messages.email') }}</label>
                <input name="email" type="email" class="form-control @error('email') is-invalid @enderror" id="email"
                    aria-describedby="email" value="{{ auth()->user()->email }}">
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
                <label for="password_confirmation"
                    class="form-label">{{ __('messages.password confirmation') }}</label>
                <input name="password_confirmation" type="password"
                    class="form-control @error('password_confirmation') is-invalid @enderror" id="password_confirmation">
                @error('password_confirmation')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>
            @can('is-user')

                <div class="mb-3">
                    <label for="alert_stock_equipement"
                        class="form-label">{{ __('messages.Equipement running out of stock alert') }}</label>
                    <input name="alert_stock_equipement" type="number" min="0"
                        class="form-control @error('alert_stock_equipement') is-invalid @enderror" id="alert_stock"
                        value="{{ auth()->user()->alert_stock_equipement }}">
                    @error('alert_stock_equipement')
                        <span class=" invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="alert_stock_consomable"
                        class="form-label">{{ __('messages.Consomable running out of stock alert') }}</label>
                    <input name="alert_stock_consomable" type="number" min="0"
                        class="form-control @error('alert_stock_consomable') is-invalid @enderror" id="alert_stock_consomable"
                        value="{{ auth()->user()->alert_stock_consomable }}">
                    @error('alert_stock_consomable')
                        <span class=" invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>
            @endcan
            <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>
            <button type="submit" class="btn btn-primary">{{ __('messages.submit') }}</button>
        </form>
    </div>
@endsection
