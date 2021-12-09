@extends('admin.products.templates.main')
@section('content')
    <br>
    <div class="card">
        <div class="row">
            <div class="col-12">
            <h1>{{ __('messages.edit product') }}</h1>
            </div>
        </div>
        <form method="POST" action="{{ route('admin.products.update', $product->id) }}">
            @method('PATCH')
            @include('admin.products.partials.form')
        </form>
    </div>

@endsection
