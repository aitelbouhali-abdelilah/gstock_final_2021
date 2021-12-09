<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ __('messages.title') }}</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous">
    </script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />

</head>

<body class="antialiased">
    @include('menu.top_menu')

    <br>

    <main class="container">
        @include('partials.alerts')

        <div class="text-center">
            <main class="form-signin" style="width: 100%;">
                <form method="POST" class="mx-auto" action="{{ route('login') }}">
                    @csrf

                    <img class="mb-4 mx-auto" src="/images/logo.svg" alt="" width="130" height="90">
                    <h1 class="h3 mb-3 fw-normal">{{ __('messages.please login') }}</h1>

                    <div class="form-floating">
                        <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                            id="floatingInput" placeholder="name@example.com" value="{{ old('email') }}">
                        <label for="floatingInput">{{ __('messages.email') }}</label>
                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>

                    <div class="form-floating">
                        <input type="password" name="password"
                            class="form-control @error('password') is-invalid @enderror" id="floatingPassword"
                            placeholder="password" value="{{ old('password') }}">
                        <label for="floatingPassword">{{ __('messages.password') }}</label>
                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div class="form-group row">
                        <div class="checkbox mb-3">
                            <label>
                                <a href="{{ route('forget.password.get') }}"> {{ __('messages.password reset') }}
                                </a>
                            </label>
                        </div>
                    </div>

                    <button class="w-100 btn btn-lg btn-primary" type="submit"> {{ __('messages.login') }} </button>
                    <p class="mt-5 mb-3 text-muted">© 2021</p>
                </form>
                <style>
                    form {
                        background-color: white;
                        border-radius: 70px 5px;
                        padding: 10px 25px;
                        max-width: 430px;
                        margin-top: 40px;
                    }

                </style>
            </main>
        </div>

    </main>
    <br>
    <br>

</body>

</html>
