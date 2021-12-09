@extends('system.templates.main')
@section('content')
    <style>
        .hover {
            background-color: #bbbbbb;
        }

        #moveBtn {
            padding: 4px;
            margin-left: 5px;
            background-color: darkblue;
            border-radius: 25px;
            font-size: 28px;
            color: white;
        }

    </style>
    @can('is-user')
        <div id="delete-equipementstate-modal" class="modal fade" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <div class="icon-box">
                            <i class="material-icons">&#xE5CD;</i>
                        </div>
                        <h4 class="modal-title w-100"> {{ __('messages.modal delete message head') }}</h4>
                    </div>
                    <div class="modal-body">
                        <p>{{ __('messages.modal delete message body') }}</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary"
                            onclick="$('.modal').modal('hide');$('#showEquipementState'+document.getElementById('equipement_to_be_shown').value).modal('show');">
                            {{ __('messages.cancel') }} </button>
                        <button type="button" class="btn btn-danger"
                            onclick="get_action(); document.getElementById('delete-equipement_state-form').submit();this.disabled=true; this.value='Sending…';">
                            {{ __('messages.delete') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="history-equipementstate-modal" aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            {{ __('messages.history') }}</h5>
                        <div class="col-10">
                            <div id="print_history_button" class="float-end ms-1"></div>

                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onclick="$('.modal').modal('hide');$('#showEquipementState'+document.getElementById('equipement_to_be_shown').value).modal('show');"></button>
                    </div>
                    <div class="modal-body" id="equipement_state_history">
                    </div>
                </div>
            </div>
        </div>
        <div id="move-equipementstate-modal" class="modal fade" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <div class="icon-box" style="border-color: darkblue">
                            <i class="material-icons" style="color: darkblue">compare_arrows</i>
                        </div>
                        <h4 class="modal-title w-100"> {{ __('messages.modal move message head') }}</h4>
                    </div>
                    <div class="modal-body">
                        <p>{{ __('messages.modal move message body') }}</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary"
                            onclick="$('.modal').modal('hide');$('#showEquipementState'+document.getElementById('equipement_to_be_shown').value).modal('show');">
                            {{ __('messages.cancel') }} </button>

                        <button type="button" style="background: darkblue" class="btn"
                            onclick="get_action(); document.getElementById('move-equipement_state-form'+$('#equipement_to_be_shown').val()).submit();this.disabled=true; this.value='Sending…';">
                            {{ __('messages.move') }}</button>
                    </div>
                </div>
            </div>
        </div>
    @endcan
    <input type="text" id="equipement_state_to_be_deleted" value="" hidden>
    <input type="text" id="equipement_to_be_shown" value="" hidden>
    <input type="text" id="system_type" value="{{ $system_type }}" hidden>

    <form id="delete-equipement_state-form" action="#" method="post">
        @csrf
        @method("delete")
    </form>
    <br>
    <div class="card">
        <div class="row">
        </div>
        <div class="row">
            <div class="col-sm-8">
                <h2>{{ __('messages.equipments') }} ({{ $system_type }})</h2>
            </div>
            <div class="col-sm-4">
                <div class="input-group flex-nowrap">
                    <select id="equipement_type_id" name="type" required="" class="form-select">
                        @if ($type != '')
                            <option value="{{ $type_id }}" hidden>{{ $type }}</option>
                        @else
                            <option value="" hidden>{{ __('messages.search by equipment type') }}</option>
                        @endif

                        @foreach ($types as $type)
                            <option value="{{ $type->id }}">{{ $type->name }}</option>
                        @endforeach
                    </select>
                    <button onclick="goto_url_search_type('{{ route('system.equipement.index', $system_type) }}')"
                        type="submit" id="search_by_equipement_type" class="btn btn-sm btn-primary pt-2"><i
                            class="material-icons">&#xE8B6;</i></button>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col">
                <div class="input-group flex-nowrap">
                    <select name="forma" onchange="location = this.value;" class="form-select">
                        @if ($system_type != null)
                            <option selected hidden value="{{ $system_type }}">{{ $system_type }}</option>
                        @else
                            <option selected hidden value=""> {{ __('messages.products') }}</option>
                        @endif
                        @foreach ($products as $product)
                            @if ($system_type == $product->name)
                                <option class="nav-item"
                                    value="{{ route('system.equipement.index', $product->name) }}">
                                    <a class="nav-link"
                                        href="{{ route('system.equipement.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                                </option>
                            @else
                                <option class="nav-item"
                                    value="{{ route('system.equipement.index', $product->name) }}">
                                    <a class="nav-link"
                                        href="{{ route('system.equipement.index', $product->name) }}">{{ Str::upper($product->name) }}</a>
                                </option>
                            @endif
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="col">
                <div class="input-group flex-nowrap">
                    <select name="site" onchange="location = this.value;" class="form-select">

                        <option value="" hidden>{{ __('messages.search by city') }}</option>
                        @isset($status)
                            <option value="{{ url(URL::current()) }}?status={{ $status }}">{{ __('messages.all') }}
                            </option>
                        @else
                            <option value="{{ url(URL::current()) }}">{{ __('messages.all') }}</option>
                        @endisset
                        @foreach ($product_sites as $site)
                            @php
                                $filter = '?';
                                if (isset($status)) {
                                    $filter .= '&status=' . $status;
                                }
                            @endphp

                            <option class="nav-item"
                                value="{{ url(URL::current()) . $filter }}&site={{ $site->id }}"
                                @if (isset($selected_site) && $selected_site == $site->id) selected hidden @endif>
                                <a class="nav-link"
                                    href="{{ url(URL::current()) . $filter }}&site={{ $site->id }}">{{ Str::upper($site->signifi) }}</a>
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="col">
                <div class="input-group flex-nowrap">
                    <select name="status" onchange="location = this.value;" class="form-select">
                        @php
                            $filter = '?';
                            if (isset($selected_site)) {
                                $filter .= '&site=' . $selected_site;
                            }
                        @endphp
                        <option class="nav-item" value="{{ url(URL::current()) . $filter }}&status=ONLINE"
                            @isset($status) @if ($status == 'ONLINE') hidden selected @endif @endisset>{{ __('messages.ONLINE') }}</option>
                        <option class="nav-item" value="{{ url(URL::current()) . $filter }}&status=SPARE"
                            @isset($status) @if ($status == 'SPARE') hidden selected @endif @endisset>{{ __('messages.SPARE') }}</option>

                        <option class="nav-item" value="{{ url(URL::current()) . $filter }}&status=ALL"
                            @isset($status) @if ($status == 'ALL') hidden selected @endif @endisset>{{ __('messages.all') }}</option>

                    </select>
                </div>

            </div>

        </div>
        <br>

        <div class="row">
            <div class="col-12 float-end w-100">
                <a onclick="location.reload();" type="button" class="btn btn-outline-primary float-start ms-1"
                    role="button"><i class="fa fa-refresh "></i> {{ __('messages.refresh') }}</a>
                @if (isset($selected_site) || isset($status))
                    <a href="{{ route('system.equipement.exportPDF', ['system_type' => $system_type, 'site' => $selected_site, 'status' => $status, 'type' => $type_id]) }}"
                        type="button" class="btn btn-outline-primary float-end ms-1" role="button"><i
                            class="fa fa-download"></i> PDF</a>
                    <a href="{{ route('system.equipement.exportCSV', ['system_type' => $system_type, 'site' => $selected_site, 'status' => $status, 'type' => $type_id]) }}"
                        type="button" class="btn btn-outline-primary float-end ms-1" role="button"><i
                            class="fa fa-download"></i> CSV</a>
                @else
                    <a href="{{ route('system.equipement.exportPDF', $system_type) }}" type="button"
                        class="btn btn-outline-primary float-end ms-1" role="button"><i class="fa fa-download"></i> PDF</a>
                    <a href="{{ route('system.equipement.exportCSV', $system_type) }}" type="button"
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
                        <th>{{ __('messages.type') }}</th>
                        <th>{{ __('messages.model') }}</th>
                        <th>{{ __('messages.status') }}</th>
                        <th>{{ __('messages.quantity in stock') }}</th>
                        <th>{{ __('messages.created at') }}</th>
                        <th>{{ __('messages.updated at') }}</th>
                        <th>{{ __('messages.details') }}</th>
                        <th>{{ __('messages.description') }}</th>

                        @can('is-user')
                            <th>{{ __('messages.action') }}</th>
                        @endcan
                    </tr>
                </thead>
                <script>
                    document.selectedRows = new Object();
                </script>
                @foreach ($equipements as $equipement)
                    <script>
                        document.selectedRows['<?php echo $equipement->id; ?>'] = [];
                    </script>
                    <tbody id="table_body">
                        <tr>
                            @php $this_model = \App\Models\EquipementModel::find($equipement->model) @endphp
                            <td>{{ $equipement->site->signifi }}</td>
                            <td>{{ $this_model->type->name }}</td>
                            <td>{{ $this_model->name }}</td>
                            <td> {{ $equipement->status }}</td>
                            <td>{{ count($equipement->equipement_dts) }}</td>
                            <td>{{ $equipement->created_at }}</td>
                            <td>{{ $equipement->updated_at }}</td>
                            <td>
                                @can('is-user')
                                    <a href="{{ route('system.equipement_state.create', [$system_type]) . '/' . $equipement->id }}"
                                        class="add" title="Add" data-toggle="tooltip"><i
                                            class="material-icons">&#xE03B;</i></a>
                                @endcan

                                <div class="modal fade" id="showEquipementState{{ $equipement->id }}"
                                    aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel">
                                                    {{ __('messages.equipment details') }}</h5>
                                                <div class="float-end d-flex align-items-center ms-auto">
                                                    <a href="{{ route('system.equipement_state.exportPDF', [$system_type, $equipement->id]) }}"
                                                        type="button" class="btn btn-outline-primary float-end ms-1"
                                                        role="button"><i class="fa fa-download"></i> PDF</a>
                                                    <a href="{{ route('system.equipement_state.exportCSV', [$system_type, $equipement->id]) }}"
                                                        type="button" class="btn btn-outline-primary float-end ms-1"
                                                        role="button"><i class="fa fa-download"></i> CSV</a>
                                                </div>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    style="margin-left: 25px !important" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-header">
                                                <div class="float-end w-100 d-flex  align-items-baseline">
                                                    <div class="col">
                                                        <div class="form-text">
                                                            <input type="text"
                                                                placeholder="{{ __('messages.search') }} ..."
                                                                class="input-medium search-query"
                                                                id="search{{ $equipement->id }}" />
                                                        </div>
                                                    </div>
                                                    @can('is-user')
                                                        <div id="move-container{{ $equipement->id }}"
                                                            class="col-6 d-flex align-items-center">

                                                            <form id="move-equipement_state-form{{ $equipement->id }}"
                                                                action="#" method="post" class="col-10 d-flex"
                                                                style="display: none !important;">
                                                                @csrf
                                                                @method("put")
                                                                <input type="text" name="dts"
                                                                    id="equipement_dts_to_be_moved{{ $equipement->id }}"
                                                                    value="" hidden>

                                                                <select id="move_site{{ $equipement->id }}" name="site"
                                                                    class="site form-select" required="">
                                                                    <option hidden value="">
                                                                        {{ __('messages.select site') }}
                                                                    </option>
                                                                    @foreach (\App\Models\Site::all() as $site)
                                                                        <option value="{{ $site->id }}"
                                                                            @if ($site->id == $equipement->id_site) hidden @endif>
                                                                            {{ $site->signifi }}
                                                                        </option>
                                                                    @endforeach
                                                                </select>
                                                                {{--  --}}

                                                                <select id="move_user{{ $equipement->id }}" name="user"
                                                                    class="user form-select" required="">
                                                                    @if (old('user') != null)
                                                                        <option selected hidden value="{{ old('user') }}">
                                                                            {{ old('user') }}</option>
                                                                    @else
                                                                        <option selected hidden value="">
                                                                            {{ __('messages.users') }}
                                                                        </option>
                                                                    @endif
                                                                </select>


                                                                <a href="#">
                                                                    <i class="material-icons"
                                                                        onclick="moveDts({{ $equipement->id }})"
                                                                        id="moveBtn">compare_arrows</i>
                                                                </a>
                                                            </form>

                                                        </div>
                                                    @endcan

                                                    @isset($equipement->status)
                                                        @if ($equipement->status == 'ONLINE')
                                                            <div class="col-2">
                                                                <div class="form-text">
                                                                    <select name="terminal_search" class="form-select"
                                                                        id="terminal_search{{ $equipement->id }}">
                                                                        <option value="" hidden selected>
                                                                            {{ __('messages.terminal') }}</option>
                                                                        <option value="">ALL</option>
                                                                        @foreach (\App\Models\Products::where('name', '=', $system_type)->first()->getSiteUserTerminals($equipement->id_site, Auth::user()->id)
            as $terminal)
                                                                            <option value="{{ $terminal->id }}">
                                                                                {{ $terminal->name }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        @endif
                                                    @endisset
                                                    @can('is-user')
                                                        <div class="float-end d-flex align-items-center">
                                                            <a href="#" type="checkbox" id="movebutton{{ $equipement->id }}"
                                                                onclick="ShowHideFunction({{ $equipement->id }});"
                                                                class="btn btn-outline-primary float-end ms-1" role="button"><i
                                                                    class="fa fa-arrows">
                                                                </i> {{ __('messages.move') }}
                                                            </a>

                                                            <script>
                                                                function ShowHideFunction(id) {
                                                                    if ($('#movebutton' + id).hasClass('active')) {
                                                                        $('#movebutton' + id).removeClass("active");
                                                                        $('#move-equipement_state-form' + id).attr('style', 'display:none !important');

                                                                    } else {
                                                                        $('#movebutton' + id).addClass("active");
                                                                        $('#move-equipement_state-form' + id).show();
                                                                    }
                                                                }
                                                            </script>
                                                        </div>
                                                    @endcan
                                                </div>
                                            </div>
                                            @can('is-user')
                                                <script>
                                                    $("#move_user<?php echo $equipement->id; ?>").change(function() {
                                                        var selectedUser = $(this).children("option:selected").val();
                                                        var selectedSitee = $('#move_site<?php echo $equipement->id; ?>').children("option:selected").val();
                                                        $.get("/system/" + '<?php echo $system_type; ?>' + "/equipement/getSiteUserTerminals/" + selectedSitee + "/" +
                                                            selectedUser,
                                                            function(data, message, xhr) {
                                                                $('#move_terminal<?php echo $equipement->id; ?>')
                                                                    .find('option')
                                                                    .not(':first')
                                                                    .remove();
                                                                if (message === 'success') {
                                                                    $.each(data, function(k, v) {
                                                                        var option = $('<option>');
                                                                        option.val(v.id);
                                                                        option.text(v.name);
                                                                        $('#move_terminal<?php echo $equipement->id; ?>').append(option);
                                                                    });
                                                                }
                                                            }, 'json');
                                                    });

                                                    $('#move_site<?php echo $equipement->id; ?>').change(function() {
                                                        var selectedSite = $(this).children("option:selected").val();
                                                        $.get("/system/" + '<?php echo $system_type; ?>' + "/equipement/getUsersBySite/" + selectedSite,
                                                            function(data, message, xhr) {
                                                                $('#move_user<?php echo $equipement->id; ?>')
                                                                    .find('option')
                                                                    .not(':first')
                                                                    .remove();
                                                                if (message === 'success') {
                                                                    $.each(data, function(k, v) {
                                                                        var option = $('<option>');
                                                                        option.val(v.id);
                                                                        option.text(v.name);
                                                                        $('#move_user<?php echo $equipement->id; ?>').append(option);
                                                                    });
                                                                }
                                                            }, 'json');
                                                    });
                                                </script>
                                            @endcan
                                            <div class="modal-body">
                                                @if (count($equipement->equipement_dts))
                                                    {{--  --}}

                                                    <div class="main-box{{ $equipement->id }}">

                                                        <div id="equipement_dts_data{{ $equipement->id }}">
                                                            @include('pages.eqpt_data')
                                                        </div>
                                                    </div>
                                                @else
                                                    <div class="alert alert-warning" role="alert">
                                                        {{ __('messages.not available') }}
                                                    </div>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a class="view" title="View" id="view{{ $equipement->id }}"
                                    value="{{ $equipement->id }}" data-bs-toggle="modal"
                                    href="#showEquipementState{{ $equipement->id }}" role="button"><i
                                        class="material-icons">&#xE417;</i></a>
                            </td>
                            <td>{{ $equipement->description }}</td>
                            @can('is-user')
                                <td>
                                    <a href="{{ route('system.equipement.edit', [$system_type, $equipement->id]) }}"
                                        class="edit" title="Edit" data-toggle="tooltip"><i
                                            class="material-icons">&#xE254;</i></a>
                                    <div id="delete-equipement-{{ $equipement->id }}" class="modal fade"
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
                                                        aria-label="Close">
                                                        {{ __('messages.cancel') }} </button>
                                                    <button type="button" class="btn btn-danger"
                                                        onclick="return document.getElementById('delete-equipement-form-{{ $equipement->id }}').submit();this.disabled=true; this.value='Sending…';">
                                                        {{ __('messages.delete') }} </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" class="delete" title="Delete" data-toggle="tooltip"
                                        data-bs-toggle="modal" data-bs-target="#delete-equipement-{{ $equipement->id }}"><i
                                            class="material-icons">&#xE872;</i></a>

                                    <form id="delete-equipement-form-{{ $equipement->id }}"
                                        action="{{ route('system.equipement.destroy', [$system_type, $equipement->id]) }}"
                                        method="post">
                                        @csrf
                                        @method("delete")
                                    </form>
                                </td>
                            @endcan
                        </tr>
                        <input type="text" id="viewi{{ $equipement->id }}" value="{{ $equipement->id }}" hidden>
                        <script>
                            $('#view<?php echo $equipement->id; ?>').ready(function() {
                                var id = $('#viewi<?php echo $equipement->id; ?>').val();
                                getMoreEqpts(1, id, '', );
                                $(document).on('click', '#button' + id + ' .pagination a', function(event) {
                                    var id = $('#viewi<?php echo $equipement->id; ?>').val();
                                    event.preventDefault();
                                    var page = $(this).attr('href').split('page=')[1];
                                    var search = $('#search<?php echo $equipement->id; ?>').val();
                                    var selectedTerminal = $('#terminal_search<?php echo $equipement->id; ?>').val();
                                    if (!selectedTerminal) {
                                        getMoreEqpts(page, id, search, '');
                                    } else {
                                        getMoreEqpts(page, id, search, $selectedTerminal);
                                    }
                                });

                                $('#search<?php echo $equipement->id; ?>').on('keyup', function() {
                                    $value = $(this).val();
                                    getMoreEqpts(1, id, $value, '');
                                });

                                $('#terminal_search<?php echo $equipement->id; ?>').on('change', function() {
                                    $selectedTerminal = $(this).val();
                                    $value = $('#search<?php echo $equipement->id; ?>').val();
                                    getMoreEqpts(1, id, $value, $selectedTerminal);
                                });

                            });

                            function getMoreEqpts(page, id, search, terminal) {
                                $.ajax({
                                    type: "GET",
                                    data: {
                                        'search_query': search,
                                        'search_terminal': terminal,
                                    },
                                    url: "{{ route('system.equipement_state.get-more-eqpts') }}" + "?eqpt=" + id + "&page=" + page +
                                        "&product={{ $system_type }}",
                                    success: function(data) {
                                        $('#equipement_dts_data' + id).html(data);
                                        $('.clickable-row :checkbox').each((index, data) => {
                                            if (document.selectedRows[id].includes(data.value)) {
                                                data.checked = true;
                                                $(data).parent().parent().parent().addClass('hover');
                                            }
                                        });
                                    }
                                });
                            }
                        </script>
                    </tbody>
                @endforeach
            </table>
        </div>
        <div id="pagination">
            {{ $equipements->links() }}
            @if (isset($selected_site) && isset($status))
                <input type="hidden" name="" id="selected_site" value="{{ $selected_site }}">
                <input type="hidden" name="" id="status" value="{{ $status }}">
                <script>
                    $(".page-item .page-link").on("click", function(event) {
                        $(this).attr("href", $(this).attr("href") + "&site=" + $('#selected_site').val() +
                            "&status=" + $('#status').val());
                    });
                </script>
            @endif
            @if (isset($selected_site) && !isset($status))
                <input type="hidden" name="" id="selected_site" value="{{ $selected_site }}">
                <script>
                    $(".page-item .page-link").on("click", function(event) {
                        $(this).attr("href", $(this).attr("href") + "&site=" + $('#selected_site').val());
                    });
                </script>
            @endif
            @if (isset($status) && !isset($selected_site))
                <input type="hidden" name="" id="status" value="{{ $status }}">
                <script>
                    $(".page-item .page-link").on("click", function(event) {
                        $(this).attr("href", $(this).attr("href") + "&status=" + $('#status').val());
                    });
                </script>
            @endif

        </div>
    </div>

    <script src="{{ asset('js/search.js') }}"></script>

@endsection
