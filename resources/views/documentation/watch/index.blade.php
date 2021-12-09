@extends('templates.main')
@section('content')
   
    <section class="container">
        <br>
        <div class="card">
            <h1>{{ __('messages.watch demo') }}</h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur eveniet esse illum dignissimos est sint id? Fuga, ducimus quis placeat dolor ex quae animi qui, nisi debitis eveniet incidunt.</p>
            
            <div class="col-12 d-flex justify-content-center">
                <video width="900" controls>
                    <source src="{{ route('getVideo')  }}" type="video/mp4">
                    Your browser does not support HTML video.
                </video>
            </div>
            
        </div>
    </section>

@endsection