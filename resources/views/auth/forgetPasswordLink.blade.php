@extends('templates.main')

@section('content')
    <style>
        .card {
            padding: 0;
        }

    </style>
    <main class="login-form">

        <br>
        <br>
        <div class="cotainer">

            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card card-outline-secondary">
                        <div class="card-header">
                            <h3 class="mb-0"> {{ __('messages.password reset') }} </h3>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('reset.password.post') }}" method="POST">
                                @csrf
                                <input type="hidden" name="token" value="{{ $token }}">
                                <div class="form-group">
                                    <label for="email_address"> {{ __('messages.email') }} </label>
                                    <input value="{{ old('email') }}" type="email" id="email_address"
                                        class="form-control @error('email') is-invalid @enderror" name="email" required>
                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            {{ $message }}
                                        </span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNew"> {{ __('messages.new password') }} </label>
                                    <input type="password" class="form-control  @error('password') is-invalid @enderror"
                                        id="inputPasswordNew" name="password" required="">
                                    <span class="form-text small text-muted">
                                        {{ __('messages.new password reset message') }}
                                    </span>
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            {{ $message }}
                                        </span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNewVerify"> {{ __('messages.verify') }} </label>
                                    <input type="password"
                                        class="form-control @error('password_confirmation') is-invalid @enderror"
                                        name="password_confirmation" id="inputPasswordNewVerify" required="">
                                    <span class="form-text small text-muted">
                                        {{ __('messages.to confirm, type the new password again') }}
                                    </span>
                                    @error('password_confirmation')
                                        <span class="invalid-feedback" role="alert">
                                            {{ $message }}
                                        </span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success btn-lg float-right">
                                        {{ __('messages.password reset') }} </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
    </main>
@endsection
