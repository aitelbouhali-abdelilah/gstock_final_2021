@extends('system.config.templates.main')

@section('config')
    <style>
        .nav-tabs {
            border-bottom: 0px solid #dee2e6;
        }

        .card {
            box-shadow: unset;
            border: 0;
        }

        .nav-tabs .nav-link {
            background-color: #0095da;
            color: white;
        }

    </style>
    <ul class="nav nav-tabs justify-content-center">

        <li class="nav-item">
            <a class="nav-item nav-link me-2 active"
                href="{{ route('system.config.equipement_type.index', $system_type) }}">{{ __('messages.types management') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-item nav-link me-2"
                href="{{ route('system.config.equipement_model.index', $system_type) }}">{{ __('messages.models mangement') }}</a>
        </li>

    </ul>

    <div class="card">
        <div class="row">
            <div class="col-12">
                <h2 class="float-start">{{ __('messages.types management') }} ({{ $system_type }})</h2>

                <a href="{{ Route('system.config.equipement_type.create', $system_type) }}" type="button"
                    class="btn btn-outline-info float-end ms-1" role="button"><i class="fa fa-plus"></i>
                    {{ __('messages.create') }}</a>
            </div>
        </div>
        <br>

        <div class="col-sm-4">
            <div class="input-group flex-nowrap ">
                <select name="forma" onchange="location = this.value;" class="form-select" style="">
                    @if ($system_type != null)
                        <option selected hidden value="{{ $system_type }}">{{ $system_type }}</option>

                    @else
                        <option selected hidden value="">{{ __('messages.products') }} </option>
                    @endif

                    @foreach ($products as $product)
                        @if ($system_type == $product->name)
                            <option class="nav-item"
                                value="{{ route('system.config.equipement_type.index', $product->name) }}">
                                <a class="nav-link"
                                    href="{{ route('system.config.equipement_type.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                            </option>
                        @else

                            <option class="nav-item"
                                value="{{ route('system.config.equipement_type.index', $product->name) }}">
                                <a class="nav-link"
                                    href="{{ route('system.config.equipement_type.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                            </option>
                        @endif
                    @endforeach
                </select>
            </div>
        </div>

        {{--  --}}
        <div class="row justify-content-md-end">

            <div class="col-md-4">
                <div class="input-group flex-nowrap float-end">
                    <input type="text" value="@isset($search_word){{ $search_word }} @endisset" class="form-control"
                        placeholder="{{ __('messages.search') }}" id="type_name" aria-label="type_name">
                    <button
                        onclick="goto_url_search_admin_type('{{ route('system.config.equipement_type.index', $system_type) }}')"
                        type="submit" id="search_by_equipement_type" class="btn btn-sm btn-primary pt-2"><i
                            class="material-icons">&#xE8B6;</i></button>
                </div>
            </div>
        </div>
        {{--  --}}
        <br>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>{{ __('messages.type') }}</th>
                        <th>{{ __('messages.action') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($equipementTypes as $equipementType)
                        <tr>
                            <td>
                                {{ $equipementType->name }}
                            </td>
                            <td class="col-sm-1">
                                <a href="{{ route('system.config.equipement_type.edit', ['system_type' => $system_type, 'equipement_type' => $equipementType->id]) }}"
                                    class="edit" title="Edit" data-toggle="tooltip"><i
                                        class="material-icons">&#xE254;</i></a>

                                <div id="delete-equipement_type{{ $equipementType->id }}" class="modal fade"
                                    data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-confirm">
                                        <div class="modal-content">
                                            <div class="modal-header flex-column">
                                                <div class="icon-box">
                                                    <i class="material-icons">&#xE5CD;</i>
                                                </div>
                                                <h4 class="modal-title w-100">
                                                    {{ __('messages.modal delete message head') }}
                                                </h4>
                                            </div>
                                            <div class="modal-body">
                                                <p>{{ __('messages.modal delete message body') }}</p>
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                    aria-label="Close"> {{ __('messages.cancel') }} </button>
                                                <button type="button" class="btn btn-danger"
                                                    onclick="return document.getElementById('delete-equipement-type-form-{{ $equipementType->id }}').submit()">
                                                    {{ __('messages.delete') }} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" class="delete" title="Delete" data-toggle="tooltip"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete-equipement_type{{ $equipementType->id }}"><i
                                        class="material-icons">&#xE872;</i></a>


                                <form id="delete-equipement-type-form-{{ $equipementType->id }}"
                                    action="{{ route('system.config.equipement_type.destroy', ['system_type' => $system_type, 'equipement_type' => $equipementType->id]) }}"
                                    method="post">
                                    @csrf
                                    @method("delete")
                                </form>
                            </td>
                        </tr>
                    @endforeach

                </tbody>
            </table>

        </div>
        {{ $equipementTypes->links() }}
        <script src="{{ asset('js/search.js') }}"></script>

    </div>

@endsection
