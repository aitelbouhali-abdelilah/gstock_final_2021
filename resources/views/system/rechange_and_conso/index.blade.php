@extends('system.templates.main')

@section('content')

    <br>


    <div class="card">
        <div class="row">
            <div class="col-sm-8">
                <h2> {{ __('messages.consomables') }} ({{ $system_type }})</h2>
            </div>
            @can('is-admin')
                <div class="col-sm-4">
                    <div class="input-group flex-nowrap">
                        <select id="city_id" name="site_filtre" required="" class="form-select">
                            @if ($site != '')
                                <option value="" hidden>{{ $site }}</option>
                            @else
                                <option value="" hidden>{{ __('messages.search by city') }}</option>
                            @endif

                            @foreach ($sites as $site)
                                <option value="{{ $site->id }}">{{ $site->signifi }}</option>
                            @endforeach
                        </select>
                        <button onclick="goto_url_search('{{ route('system.rechange_and_conso.index', $system_type) }}')"
                            type="submit" id="search_by_city" class="btn btn-sm btn-primary pt-2"><i
                                class="material-icons">&#xE8B6;</i></button>
                    </div>
                </div>
            @endcan

        </div>
        <br>
        <div class="col-12 d-flex justify-content-between">
            <div class="col-3">
                <div class="input-group flex-nowrap">
                    <select name="forma" onchange="location = this.value;" class="form-select">
                        @if ($system_type != null)
                            <option selected hidden value="{{ $system_type }}">{{ $system_type }}</option>

                        @else
                            <option selected hidden value="">{{ __('messages.products') }}</option>
                        @endif
                        @foreach ($products as $product)
                            @if ($system_type == $product->name)
                                <option class="nav-item"
                                    value="{{ route('system.rechange_and_conso.index', $product->name) }}">
                                    <a class="nav-link"
                                        href="{{ route('system.rechange_and_conso.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                                </option>
                            @else

                                <option class="nav-item"
                                    value="{{ route('system.rechange_and_conso.index', $product->name) }}">
                                    <a class="nav-link"
                                        href="{{ route('system.rechange_and_conso.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                                </option>
                            @endif
                        @endforeach
                    </select>
                </div>

            </div>
            <div class="col-3">
                <div class="input-group flex-nowrap">
                    <select name="site" onchange="location = this.value;" class="form-select">

                        <option value="" hidden>{{ __('messages.search by city') }}</option>
                        <option value="{{ url(URL::current()) }}">{{ __('messages.all') }}</option>
                        @foreach ($product_sites as $site)
                            @if (isset($selected_site) && $selected_site == $site->id)
                                <option class="nav-item" selected
                                    value="{{ url(URL::current()) }}?site={{ $site->id }}">
                                    <a class="nav-link"
                                        href="{{ url(URL::current()) }}?site={{ $site->id }}">{{ Str::upper($site->signifi) }}</a>
                                </option>
                            @else

                                <option class="nav-item"
                                    value="{{ url(URL::current()) }}?site={{ $site->id }}">
                                    <a class="nav-link"
                                        href="{{ url(URL::current()) }}?site={{ $site->id }}">{{ Str::upper($site->signifi) }}</a>
                                </option>
                            @endif
                        @endforeach
                    </select>
                </div>
            </div>

            {{--  --}}
            <div class="col-3">
                <div class="input-group flex-nowrap">
                    <select name="terminal" onchange="location = this.value;" class="form-select">

                        <option value="" hidden>{{ __('messages.terminal') }}</option>
                        @isset($selected_terminal)
                            <option value="{{ url(URL::current()) }}?site={{ $selected_site }}">ALL</option>
                        @endisset
                        @foreach ($terminals as $t)
                            @if (isset($selected_terminal) && $selected_terminal == $t->id)
                                <option class="nav-item" selected
                                    value="{{ url(URL::current()) }}?site={{ $selected_site }}&ter={{ $t->id }}">
                                    <a class="nav-link"
                                        href="{{ url(URL::current()) }}?site={{ $selected_site }}&ter={{ $t->id }}">{{ $t->name }}</a>
                                </option>
                            @else

                                <option class="nav-item"
                                    value="{{ url(URL::current()) }}?site={{ $selected_site }}&ter={{ $t->id }}">
                                    <a class="nav-link"
                                        href="{{ url(URL::current()) }}?site={{ $selected_site }}&ter={{ $t->id }}">{{ $t->name }}</a>
                                </option>
                            @endif
                        @endforeach
                    </select>
                </div>
            </div>

            {{--  --}}

        </div>
        <br>
        <div class="row">
            <div class="col-12">
                <a onclick="location.reload();" type="button" class="btn btn-outline-primary float-start ms-1"
                    role="button"><i class="fa fa-refresh "></i> {{ __('messages.refresh') }}</a>
                @if (isset($selected_site))
                    <a href="{{ route('system.rechange_and_conso.exportPDF', ['system_type' => $system_type, 'site' => $selected_site, 'ter' => $selected_terminal]) }}"
                        type="button" class="btn btn-outline-primary float-end ms-1" role="button"><i
                            class="fa fa-download"></i> PDF</a>
                    <a href="{{ route('system.rechange_and_conso.exportCSV', ['system_type' => $system_type, 'site' => $selected_site, 'ter' => $selected_terminal]) }}"
                        type="button" class="btn btn-outline-primary float-end ms-1" role="button"><i
                            class="fa fa-download"></i> CSV</a>
                @else
                    <a href="{{ route('system.rechange_and_conso.exportPDF', $system_type) }}" type="button"
                        class="btn btn-outline-primary float-end ms-1" role="button"><i class="fa fa-download"></i> PDF</a>
                    <a href="{{ route('system.rechange_and_conso.exportCSV', $system_type) }}" type="button"
                        class="btn btn-outline-primary float-end ms-1" role="button"><i class="fa fa-download"></i> CSV</a>
                @endif


            </div>
        </div>
        <br>
        <div class="table-responsive">

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>{{ __('messages.sites') }}</th>
                        <th>{{ __('messages.terminal') }}</th>
                        <th>{{ __('messages.ref piece') }}</th>
                        <th>{{ __('messages.quantity in stock') }}</th>
                        <th>{{ __('messages.serial part number') }}</th>
                        <th>{{ __('messages.created at') }}</th>
                        <th>{{ __('messages.updated at') }}</th>
                        <th>{{ __('messages.description') }}</th>
                        <th>{{ __('messages.supplier') }}</th>


                        @can('is-user')
                            <th>{{ __('messages.action') }}</th>
                        @endcan

                    </tr>
                </thead>
                <tbody>
                    @foreach ($pieces as $piece)
                        <tr>
                            <td>{{ $piece->site->signifi }}</td>
                            <td>{{ $piece->terminal->name }}</td>
                            <td>{{ $piece->pieceList->ref_piece }}</td>
                            <td>{{ $piece->stock }}</td>
                            <td>{{ $piece->part_number }}</td>
                            <td>{{ $piece->created_at }}</td>
                            <td>{{ $piece->updated_at }}</td>
                            <td>{{ $piece->pieceList->designation }}</td>
                            <td>

                                <script>
                                    $(".top").tooltip({
                                        placement: "top"
                                    });
                                </script>
                                <span class="top"
                                    title="{{ $piece->pieceList->supplier }}">{{ strlen($piece->pieceList->supplier) > 7 ? substr($piece->pieceList->supplier, 0, 7) . '...' : $piece->pieceList->supplier }}</span>

                            </td>

                            @can('is-user')
                                <td class="d-flex">

                                    <a href="{{ route('system.rechange_and_conso.edit', [$system_type, $piece->id]) }}"
                                        class="edit" title="Edit" data-toggle="tooltip"><i
                                            class="material-icons">&#xE254;</i></a>

                                    <div id="delete-rechange_and_conso-{{ $piece->id }}" class="modal fade"
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
                                                        onclick="this.disabled=true; this.value='Sending…';return document.getElementById('delete-rechange_and_conso-form-{{ $piece->id }}').submit()">
                                                        {{ __('messages.delete') }} </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <i class="material-icons" data-bs-dismiss="modal" data-bs-toggle="modal"
                                            data-bs-target="#move-consumable-modal{{ $piece->id }}"
                                            id="moveBtn">compare_arrows</i>
                                    </a>
                                    <a href="#" class="delete" title="Delete" data-toggle="tooltip"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete-rechange_and_conso-{{ $piece->id }}"><i
                                            class="material-icons">&#xE872;</i></a>

                                    <form id="delete-rechange_and_conso-form-{{ $piece->id }}"
                                        action="{{ route('system.rechange_and_conso.destroy', [$system_type, $piece->id]) }}"
                                        method="post">
                                        @csrf
                                        @method("delete")
                                    </form>


                                    {{--  --}}
                                    <a href="#" class="history" title="history" data-bs-dismiss="modal"
                                        data-bs-toggle="modal" data-bs-target="#history-consumable-modal{{ $piece->id }}"
                                        onclick="historyConsomable({{ $piece->consumableHistory->pluck('messages') }},{{ $piece }})">
                                        <i class="material-icons">&#xe889;</i>
                                    </a>
                                    {{--  --}}

                                    <div class="modal fade" id="history-consumable-modal{{ $piece->id }}"
                                        aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">
                                                        {{ __('messages.history') }}</h5>
                                                    <div class="col-10">
                                                        <a href="{{ route('system.rechange_and_conso.exportPDFHistory', [$system_type, $piece]) }}"
                                                            type="button" class="btn btn-outline-primary float-end ms-1"
                                                            role="button"><i class="fa fa-download"></i>
                                                            {{ __('messages.print history') }}</a>

                                                    </div>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close" onclick="$('.modal').modal('hide');"></button>
                                                </div>
                                                <div class="modal-body" id="consumable_history{{ $piece->id }}">

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {{--  --}}
                                    {{-- <a href="{{ route('system.rechange_and_conso.exportPDFHistory', [$system_type, $piece]) }}"
                                        type="" class="" role=""><i class="material-icons">&#xe161;</i>
                                    </a> --}}
                                    <div id="move-consumable-modal{{ $piece->id }}" class=" modal fade"
                                        aria-hidden="true" tabindex="-1">
                                        <div class="modal-dialog modal-confirm">
                                            <div class="modal-content">
                                                <div class="modal-header flex-column">
                                                    <div class="icon-box" style="border-color: darkblue">
                                                        <i class="material-icons" style="color: darkblue">compare_arrows</i>
                                                    </div>
                                                    <h4 class="modal-title w-100">
                                                        {{ __('messages.modal move message head') }}</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>{{ __('messages.modal move consumable message body') }}</p>
                                                    <form id="move-consumable-form{{ $piece->id }}"
                                                        action="{{ route('system.consumable.move', ['system_type' => $system_type, 'id' => $piece->id]) }}"
                                                        method="post" class="">
                                                        @csrf
                                                        @method("put")
                                                        <input type="text" name="consumable" value="{{ $piece->id }}"
                                                            hidden>
                                                        <div>
                                                            <div class="mb-3 d-flex justify-content-between">
                                                                <label for="stock" class="form-label"
                                                                    style="padding: 8px 0 0px 0px;width: 75px;">{{ __('messages.quantity in stock') }}
                                                                    : </label>
                                                                <input name="stock" style="width: 75px;" type="number" min="1"
                                                                    class="form-control" id="stock" aria-describedby="stock"
                                                                    value="1">
                                                                    <select id="move_site{{ $piece->id }}" name="site"
                                                                        class="sites form-select" required style="max-width:140px">
                                                                        <option hidden value="">{{ __('messages.select site') }}
                                                                        </option>
                                                                        @foreach (\App\Models\Site::all() as $sitemodel)
                                                                            <option value="{{ $sitemodel->id }}"
                                                                                @if ($sitemodel->id == $piece->id_site) hidden @endif>
                                                                                {{ $sitemodel->signifi }}
                                                                            </option>
                                                                        @endforeach
                                                                    </select>
                                                            </div>
                                                            
                                                            <select id="move_user{{ $piece->id }}" name="user"
                                                                class="user form-select" required="">
                                                                <option hidden value="">{{ __('messages.select user') }}
                                                                </option>
                                                                @if (old('user') != null)
                                                                    <option selected hidden value="{{ old('user') }}">
                                                                        {{ old('user') }}</option>
                                                                @else
                                                                    <option selected hidden value="">
                                                                        {{ __('messages.users') }}
                                                                    </option>
                                                                @endif
                                                            </select>
                                                            <br>
                                                            <select id="move_terminal{{ $piece->id }}"
                                                                class="terminal form-select @error('terminal') is-invalid @enderror"
                                                                name="terminal">
                                                                <option hidden value="">{{ __('messages.terminal') }}
                                                                </option>
                                                                @if (old('terminal') != null)
                                                                    <option selected hidden value="{{ old('terminal') }}">
                                                                        {{ old('terminal') }}</option>
                                                                @else
                                                                    <option selected hidden value="">
                                                                        {{ __('messages.select terminal') }}
                                                                    </option>
                                                                @endif
                                                            </select>
                                                        </div>

                                                    </form>
                                                </div>

                                                <div class="modal-footer justify-content-center">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                        {{ __('messages.cancel') }} </button>

                                                    <button type="button" style="background: darkblue" class="btn"
                                                        onclick="if($('#move_site<?php echo $piece->id; ?>').val() != '' && $('#move_user<?php echo $piece->id; ?>').val() != '' && $('#move_terminal<?php echo $piece->id; ?>').val() != ''){this.disabled=true; this.value='Sending…';$('#move-consumable-form<?php echo $piece->id; ?>').submit()}">
                                                        {{ __('messages.move') }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {{--  --}}

                                    <script>
                                        $("#move_user<?php echo $piece->id; ?>").change(function() {
                                            var selectedUser = $(this).children("option:selected").val();
                                            var selectedSitee = $('#move_site<?php echo $piece->id; ?>').children("option:selected").val();
                                            $.get("/system/" + '<?php echo $system_type; ?>' + "/equipement/getSiteUserTerminals/" + selectedSitee + "/" +
                                                selectedUser,
                                                function(data, message, xhr) {
                                                    $('#move_terminal<?php echo $piece->id; ?>')
                                                        .find('option')
                                                        .not(':first')
                                                        .remove();
                                                    if (message === 'success') {
                                                        $.each(data, function(k, v) {
                                                            var option = $('<option>');
                                                            option.val(v.id);
                                                            option.text(v.name);
                                                            $('#move_terminal<?php echo $piece->id; ?>').append(option);
                                                        });
                                                    }
                                                }, 'json');
                                        });

                                        $('#move_site<?php echo $piece->id; ?>').change(function() {
                                            var selectedSite = $(this).children("option:selected").val();
                                            $.get("/system/" + '<?php echo $system_type; ?>' + "/equipement/getUsersBySite/" + selectedSite,
                                                function(data, message, xhr) {
                                                    $('#move_user<?php echo $piece->id; ?>')
                                                        .find('option')
                                                        .not(':first')
                                                        .remove();
                                                    if (message === 'success') {
                                                        $.each(data, function(k, v) {
                                                            var option = $('<option>');
                                                            option.val(v.id);
                                                            option.text(v.name);
                                                            $('#move_user<?php echo $piece->id; ?>').append(option);
                                                        });
                                                    }
                                                }, 'json');
                                        });
                                    </script>
                                    {{--  --}}


                                    {{--  --}}

                                </td>

                            @endcan

                        </tr>
                    @endforeach
                </tbody>
            </table>

        </div>
        {{ $pieces->links() }}
        @if (isset($selected_site) && !isset($selected_terminal))
            <input type="hidden" name="" id="selected_site" value="{{ $selected_site }}">
            <script>
                $(".page-item .page-link").on("click", function (event) {
                    $(this).attr("href", $(this).attr("href") + "&site=" + $('#selected_site').val());
                });
            </script>
        @elseif (isset($selected_site) && isset($selected_terminal))
            <input type="hidden" name="" id="selected_site" value="{{ $selected_site }}">
            <input type="hidden" name="" id="selected_terminal" value="{{ $selected_terminal }}">
            <script>
                $(".page-item .page-link").on("click", function (event) {
                    $(this).attr("href", $(this).attr("href") + "&site=" + $('#selected_site').val() + "&ter=" + $('#selected_terminal').val());
                });
            </script>
        @endif
    </div>

    <script src="{{ asset('js/search.js') }}"></script>

@endsection
