@extends('admin.occupation.templates.main')
@section('content')
<br>
<div class="card">
    <div class="row">
        <div class="col-12">
            <h1>{{ __('messages.add function') }}</h1>
        </div>
   
        <form method="POST" action="{{ route('admin.occupation.store') }}">
            @include('admin.occupation.partials.form', ['create' => true])
        </form>
    </div>
</div>

@endsection
