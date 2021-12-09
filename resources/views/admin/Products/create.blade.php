@extends('admin.products.templates.main')
@section('content')
    <br>
    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1>{{ __('messages.add product') }}</h1>
            </div>
        </div>
        <form method="POST" action="{{ route('admin.products.store') }}">
            @include('admin.products.partials.form', ['create' => true])
        </form>
    </div>

@endsection
