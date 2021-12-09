@extends('system.templates.main')

@section('content')
    <div id="import-equipementstate-modal" class="modal fade" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog modal-confirm">
            <div class="modal-content">

                <div class="modal-header flex-column">

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    <h4 class="modal-title w-100"> {{ __('messages.import file') }} </h4>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <form method="POST"
                            action="{{ route('system.equipement_state.storeCSV', ['system_type' => $system_type, 'status' => $equiepemnt_status]) }}"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="form-group">
                                <div class="file-upload-wrapper">

                                    <input type="file" name="file" class="file-upload" />
                                    @error('file')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                    <input type="hidden" value="{{ $equipement_id }}" name="id_equipment"
                                        class="@error('file') is-invalid @enderror">
                                </div>
                                <br>
                                <br>
                                <button class="btn btn-primary"
                                    onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.import file') }}</button>

                            </div>

                        </form>
                    </div>

                </div>


            </div>
        </div>
    </div>
    </div>



    @if (isset($errors) && $errors->any())
        <div class="alert alert-danger">
            @foreach ($errors->all() as $error)
                {{ $error }} <br>
            @endforeach
        </div>

    @endif

    <br>
    <div class="card">
        <h1> {{ __('messages.add new equipments') }} </h1>

        @isset($equiepemnt_status)

            <a href="#" class="import" title="import" data-bs-dismiss="modal" data-bs-toggle="modal"
                data-bs-target="#import-equipementstate-modal"
                onclick="importEquipementState()">{{ __('messages.import file') }}</a>
            @if ($equiepemnt_status == 'ONLINE')
                <a href="{{ asset('FileCSV\EquipmentDetailOnline.xlsx') }}" download> {{ __('messages.fileToFill') }}</a>
                <span class="text-info"> {{ __('messages.terminals To use in this file') }}:
                    {{ Auth::user()->getUserSiteTerminals($site)->pluck('name') }}
                </span>
            @else
                <a href="{{ asset('FileCSV\EquipmentDetailSpare.xlsx') }}" download> {{ __('messages.fileToFill') }}</a>
            @endif

        @endisset

        <br>

        <form method="POST" action="{{ route('system.equipement_state.store', $system_type) }}">
            @include('system.equipement_state.partials.form', ['create' => true])
        </form>
    </div>





    <script src="{{ asset('js/search.js') }}"></script>


@endsection
