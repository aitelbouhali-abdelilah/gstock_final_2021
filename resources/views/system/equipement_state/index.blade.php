@extends('system.templates.main')

@section('content')
    <nav class="nav nav-pills nav-fill">
        <a class="nav-item nav-link"
            href="{{ route('system.equipement.index', $system_type) }}">{{ __('messages.equipements') }}</a>
        <a class="nav-item nav-link active"
            href="{{ route('system.rechange_and_conso.index', $system_type) }}">{{ __('messages.rechanges') }}</a>
        @can('is-admin')
            <a class="nav-item nav-link"
                href="{{ route('system.config.equipement_type.index', $system_type) }}">{{ __('messages.configuration') }}</a>
        </nav>
    @endcan
    </nav>
    <br>
    <div class="card">
        <div class="row">
            <div class="col-4">
                <div class="input-group flex-nowrap">

                    <select id="city_id" name="site_filtre" required="" class="form-select">
                        <option value="">{{ __('messages.search by city') }}</option>
                        @foreach ($sites as $site)
                            <option value="{{ $site->id }}">{{ $site->signifi }}</option>
                        @endforeach
                    </select>

                    <button onclick="goto_url_search('{{ route('system.equipement_state.index', $system_type) }}')"
                        type="submit" id="search_by_city"
                        class="btn btn-sm btn-primary">{{ __('messages.search') }}</button>
                </div>
            </div>
            <div class="col-8">
                <a href="{{ route('system.equipement_state.create', $system_type) }}" type="button"
                    class="btn btn-sm btn-success float-end ms-1" role="button">{{ __('messages.create') }}</a>
                <a href="{{ route('system.equipement_state.create', $system_type) }}" type="button"
                    class="btn btn-sm btn-success float-end ms-1" role="button">{{ __('messages.exportPDF') }}</a>
                <a href="{{ route('system.equipement_state.create', $system_type) }}" type="button"
                    class="btn btn-sm btn-success float-end ms-1" role="button">{{ __('messages.exportCSV') }}</a>
            </div>
        </div>
        <br>

        <div class="table-responsive">

            <table class="table">
                <thead>
                    <tr>
                        <th>{{ __('messages.type') }}</th>
                        <th>{{ __('messages.model') }}</th>
                        <th>{{ __('messages.state') }}</th>
                        <th>{{ __('messages.repairable') }}</th>
                        <th>{{ __('messages.sites') }}</th>
                        <th>{{ __('messages.observation') }}</th>
                        <th>{{ __('messages.action') }}</th>

                    </tr>
                </thead>
                <tbody id="table_body">
                    @foreach ($equipementstates as $equipementstate)
                        <tr>
                            <td>{{ $equipementstate->equipement->type_eqpt }}</td>
                            <td>{{ $equipementstate->equipement->modele }}</td>
                            <td>{{ $equipementstate->status }}</td>
                            <td>{{ $equipementstate->reparable }}</td>
                            <td>{{ $equipementstate->equipement->site->signifi }}</td>
                            <td>{{ $equipementstate->observation }}</td>

                            <td>
                                <a href="{{ route('system.equipement_state.edit', [$system_type, $equipementstate->id]) }}"
                                    class="btn btn-sm btn-primary" role="button">{{ __('messages.edit') }}</a>
                                <button type="button" class="btn btn-sm btn-danger"
                                    onclick="this.disabled=true; this.value='Sending…';return document.getElementById('delete-equipement_state-form-{{ $equipementstate->id }}').submit()">
                                    {{ __('messages.delete') }}
                                </button>
                                <form id="delete-equipement_state-form-{{ $equipementstate->id }}"
                                    action="{{ route('system.equipement_state.destroy', [$system_type, $equipementstate->id]) }}"
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
        {{ $equipementstates->links() }}
    </div>

    <script src="{{ asset('js/search.js') }}"></script>

@endsection
