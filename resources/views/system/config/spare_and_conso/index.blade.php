@extends('system.config.templates.main')

@section('config')




    <div class="card">
        <div class="row">
            <div class="col-12">
                <h2 class="float-start">{{ __('messages.consomables management') }} ({{ $system_type }})</h2>

                <a href="{{ route('system.config.spare_and_conso.create', $system_type) }}" type="button"
                    class="btn btn-outline-info float-end ms-1" role="button"><i class="fa fa-plus"></i>
                    {{ __('messages.create') }}</a>
            </div>
        </div>



        <div class="col-4">
            <br>
            <div class="input-group flex-nowrap">
                <select name="forma" onchange="location = this.value;" class="form-select">
                    @if ($system_type != null)
                        <option selected hidden value="{{ $system_type }}">{{ $system_type }}</option>

                    @else
                        <option selected hidden value=""> {{ __('messages.products') }} </option>
                    @endif
                    @foreach ($products as $product)
                        @if ($system_type == $product->name)
                            <option class="nav-item"
                                value="{{ route('system.config.spare_and_conso.index', $product->name) }}">
                                <a class="nav-link"
                                    href="{{ route('system.config.spare_and_conso.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                            </option>
                        @else

                            <option class="nav-item"
                                value="{{ route('system.config.spare_and_conso.index', $product->name) }}">
                                <a class="nav-link"
                                    href="{{ route('system.config.spare_and_conso.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                            </option>
                        @endif
                    @endforeach
                </select>
            </div>
        </div>

        <div class="row justify-content-md-end">

            {{--  --}}
            <div class="col-4 ">
                <div class="input-group flex-nowrap">
                    <input type="text" value="@isset($search_word){{ $search_word }} @endisset" class="form-control"
                        placeholder="{{ __('messages.search') }}" id="consumable_name" aria-label="consumable_name">
                    <button
                        onclick="goto_url_search_admin_consumable('{{ route('system.config.spare_and_conso.index', $system_type) }}')"
                        type="submit" id="search_by_equipement_type" class="btn btn-sm btn-primary pt-2"><i
                            class="material-icons">&#xE8B6;</i></button>
                </div>
            </div>
            {{--  --}}
        </div>
        <br>
        <div class="table-responsive">

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>{{ __('messages.ref consomable') }}</th>
                        <th>{{ __('messages.designation') }}</th>
                        <th>{{ __('messages.supplier') }}</th>
                        <th>{{ __('messages.action') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($piecelists as $piecelist)
                        <tr>
                            <td>
                                {{ $piecelist->ref_piece }}
                            </td>
                            <td>
                                {{ $piecelist->designation }}
                            </td>
                            <td>
                                {{ $piecelist->supplier }}
                            </td>
                            <td>
                                <a href="{{ route('system.config.spare_and_conso.edit', [$system_type, $piecelist->id]) }}"
                                    class="edit" title="Edit" data-toggle="tooltip"><i
                                        class="material-icons">&#xE254;</i></a>

                                <div id="delete-equipement_list{{ $piecelist->id }}" class="modal fade"
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
                                                    aria-label="Close"> {{ __('messages.cancel') }} </button>
                                                <button type="button" class="btn btn-danger"
                                                    onclick="return document.getElementById('delete-piece_list-form-{{ $piecelist->id }}').submit()">
                                                    {{ __('messages.delete') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

        </div>
        <a href="#" class="delete" title="Delete" data-toggle="tooltip" data-bs-toggle="modal"
            data-bs-target="#delete-equipement_list{{ $piecelist->id }}"><i class="material-icons">&#xE872;</i> </a>

        <form id="delete-piece_list-form-{{ $piecelist->id }}"
            action="{{ route('system.config.spare_and_conso.destroy', [$system_type, $piecelist->id]) }}" method="post">
            @csrf
            @method("delete")
        </form>


        </td>
        </tr>
        @endforeach
        </tbody>
        </table>

    </div>
    {{ $piecelists->links() }}

    </div>
    <script src="{{ asset('js/search.js') }}"></script>

@endsection
