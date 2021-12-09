<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ __('messages.title') }}</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
        crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous">
    </script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>

<body class="antialiased">
    @include('menu.top_menu')

    <main class="container">
        <br>

        @include('partials.alerts')
        @yield('content')
        <br>
    </main>
</body>

</html>
