@extends('templates.main')

@section('content')

    <style>
        .card {
            padding: 0;
        }

    </style>

    <main class="container">

        <br>
        <br>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="mb-0">{{ __('messages.password reset') }}</h3>
                    </div>
                    <div class="card-body">
                        @if (session('status'))
                            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                <symbol id="check-info-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </symbol>
                            </svg>
                            <div class="alert alert-success alert-dismissible fade show align-items-center mx-auto"
                                style="width: fit-content;" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                                    <use xlink:href="#check-info-fill" />
                                </svg>
                                {{ session('status') }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                            </div>
                        @endif
                        <form class="form" role="form" action="{{ route('forget.password.post') }}"
                            method="POST" autocomplete="off">
                            @csrf
                            <div class="form-group">
                                <label for="inputResetPasswordEmail"> {{ __('messages.email') }} </label>
                                <input type="email" class="form-control" name="email" id="inputResetPasswordEmail"
                                    required="">
                                @if ($errors->has('email'))
                                    <span class="text-danger">{{ $errors->first('email') }}</span>
                                @endif
                                <span id="helpResetPasswordEmail" class="form-text small text-muted">
                                    {{ __('messages.reset message') }}
                                </span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-success btn-lg float-right">
                                    {{ __('messages.reset button') }} </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
    </main>
@endsection
