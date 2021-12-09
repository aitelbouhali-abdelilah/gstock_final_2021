@extends('admin.Products.templates.main')
@section('content')
    <br>

    <div class="card">
        <div class="row">
            <div class="col-12">
                <h1 class="float-start">{{ __('messages.products') }}</h1>
                <a href="{{ route('admin.products.create') }}" type="button" class="btn btn-outline-info float-end ms-1"
                    role="button"><i class="fa fa-plus"></i> {{ __('messages.create') }}</a>
            </div>
        </div>
        {{--  --}}

        <div class="row justify-content-md-end">

            <div class="col-md-4">
                <div class="input-group flex-nowrap float-end">
                    <input type="text" class="form-control" placeholder="{{ __('messages.search') }}" id="product_name"
                        aria-label="product_name">
                    <button onclick="goto_url_search_product('{{ route('admin.products.index') }}')" type="submit"
                        id="search_by_equipement_type" class="btn btn-sm btn-primary pt-2"><i
                            class="material-icons">&#xE8B6;</i></button>
                </div>
            </div>
        </div>
        <br>
        {{--  --}}
        <div class="table-responsive">

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">{{ __('messages.products') }}</th>
                        <th scope="col">{{ __('messages.sites') }}</th>
                        <th scope="col">{{ __('messages.action') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($products as $product)
                        <tr>
                            <td>{{ $product->name }}</td>
                            <td>
                                @foreach ($product->sites as $site)
                                    <span href="#" data-toggle="tooltip" id="{{ $site->nom }}"
                                        title="                   @if (\App\Models\Terminal::where('id_site', '=' , $site->id)->whereIn('id',
                                        $product->terminals->pluck('id'))->first() !== null)
                                        {{ \App\Models\Terminal::where('id_site', '=', $site->id)->whereIn('id', $product->terminals->pluck('id'))->pluck('name') }}
                                        @endif">{{ $site->nom }},</span>
                                    <script>
                                        $('<?php echo $site->nom; ?>').tooltip();
                                    </script>
                                @endforeach
                            </td>
                            <td>
                                <a href="{{ route('admin.products.edit', $product->id) }}" class="edit"
                                    title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>

                                <div id="delete-product-{{ $product->id }}" class="modal fade"
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
                                                    onclick="return document.getElementById('delete-product-form-{{ $product->id }}').submit()">
                                                    {{ __('messages.delete') }} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" class="delete" title="Delete" data-toggle="tooltip"
                                    data-bs-toggle="modal" data-bs-target="#delete-product-{{ $product->id }}"><i
                                        class="material-icons">&#xE872;</i></a>

                                <form id="delete-product-form-{{ $product->id }}"
                                    action="{{ route('admin.products.destroy', $product->id) }}" method="post">
                                    @csrf
                                    @method("delete")
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

        </div>
        {{ $products->links() }}
    </div>
    <script src="{{ asset('js/search.js') }}"></script>

@endsection
