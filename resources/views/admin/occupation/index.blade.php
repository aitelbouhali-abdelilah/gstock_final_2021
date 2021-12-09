@extends('admin.occupation.templates.main')
@section('content')
    <br>

    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1 class="float-start">{{ __('messages.functions') }}</h1>
                <a href="{{ route('admin.occupation.create') }}" type="button" class="btn btn-outline-info float-end ms-1"
                    role="button"><i class="fa fa-plus"></i> {{ __('messages.create') }}</a>
            </div>
        </div>
        <div class="table-responsive">

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">{{ __('messages.functions') }}</th>
                        <th scope="col">{{ __('messages.action') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($occupations as $occupation)
                        <tr>
                            <td>{{ $occupation->occupation }}</td>
                            <td>
                                <a href="{{ route('admin.occupation.edit', $occupation->id) }}" class="edit"
                                    title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>

                                <div id="delete-occupation-{{ $occupation->id }}" class="modal fade"
                                    data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-confirm">
                                        <div class="modal-content">
                                            <div class="modal-header flex-column">
                                                <div class="icon-box">
                                                    <i class="material-icons">&#xE5CD;</i>
                                                </div>
                                                <h4 class="modal-title w-100">
                                                    {{ __('messages.modal delete message head') }}</h4>
                                            </div>
                                            <div class="modal-body">
                                                <p>{{ __('messages.modal delete message body') }}</p>
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                    aria-label="Close">{{ __('messages.cancel') }}</button>
                                                <button type="button" class="btn btn-danger"
                                                    onclick="return document.getElementById('delete-occupation-form-{{ $occupation->id }}').submit()">
                                                    {{ __('messages.delete') }} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" class="delete" title="Delete" data-toggle="tooltip"
                                    data-bs-toggle="modal" data-bs-target="#delete-occupation-{{ $occupation->id }}"><i
                                        class="material-icons">&#xE872;</i></a>

                                <form id="delete-occupation-form-{{ $occupation->id }}"
                                    action="{{ route('admin.occupation.destroy', $occupation->id) }}" method="post">
                                    @csrf
                                    @method("delete")
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

        </div>
        {{ $occupations->links() }}
    </div>

@endsection
