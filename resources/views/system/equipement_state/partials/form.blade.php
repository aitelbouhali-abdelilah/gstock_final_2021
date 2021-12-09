@csrf


<div class="mb-3">
    <label for="state" class="form-label">{{ __('messages.status') }}</label>
    <select class="form-select @error('state') is-invalid @enderror" id="state" name="state">
        @if (old('state') != null)
            <option selected hidden value="{{ old('state') }}">{{ old('state') }}</option>

        @else
            <option selected hidden value="">{{ __('messages.select an option') }}</option>
        @endif
        <option value="OK" @isset($equipement_state) @if ($equipement_state->status == 'OK') selected @endif @endisset>OK</option>
        <option value="NOK" @isset($equipement_state) @if ($equipement_state->status == 'NOK') selected @endif @endisset>NOK</option>
    </select>
    @error('state')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>

<div class="mb-3" @isset($equipement_state) @if ($equipement_state->status == 'OK') style="display: none" @endif @endisset>
    <label for="reparable" class="form-label">{{ __('messages.repairable') }}</label>
    <select id="reparable" class="form-select @error('reparable') is-invalid @enderror" name="reparable">
        @if (old('reparable') != null)
            <option selected hidden value="{{ old('reparable') }}">{{ old('reparable') }}</option>

        @else
            <option selected hidden value="">{{ __('messages.select an option') }}</option>
        @endif
        <option value="{{ __('messages.YES') }}" @isset($equipement_state) @if (in_array($equipement_state->reparable, ['YES', 'OUI'])) selected @endif @endisset>
            {{ __('messages.YES') }}</option>
        <option value="{{ __('messages.NO') }}" @isset($equipement_state) @if (in_array($equipement_state->reparable, ['NO', 'NON'])) selected @endif @endisset>
            {{ __('messages.NO') }}</option>
    </select>
    @error('reparable')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>

<script>
    $("#state").change(function() {
        var selectedState = $(this).children("option:selected").val();
        if (selectedState == "NOK") {
            $("#reparable").parent().show();
        } else {
            $('#reparable').parent().hide();
        }

    });
</script>

<div class="mb-3">
    <label for="observation" class="form-label">{{ __('messages.observation') }}</label>
    <input name="observation" type="text" class="form-control @error('observation') is-invalid @enderror"
        id="observation" aria-describedby="observation"
    value="@isset($equipement_state){{ $equipement_state->observation }} @else {{ old('observation') }}@endisset">
    @error('observation')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>

@isset($equiepemnt_status)
    @if ($equiepemnt_status == 'ONLINE')
        <div class="mb-3" hidden>
            <label for="status_online_spare" class="form-label">{{ __('messages.status') }}</label><br>

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check status_online_spare @error('status_online_spare') is-invalid @enderror"
                    name="status_online_spare" id="ONLINE" value="ONLINE" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="ONLINE"> {{ __('messages.ONLINE') }}</label>

                <input type="radio" class="btn-check status_online_spare @error('status_online_spare') is-invalid @enderror"
                    name="status_online_spare" id="SPARE" value="SPARE" autocomplete="off">
                <label class="btn btn-outline-primary" for="SPARE"> {{ __('messages.SPARE') }}</label>
                @error('status_online_spare')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>
        </div>
    @else
        <div class="mb-3" hidden>
            <label for="status_online_spare" class="form-label">{{ __('messages.status') }}</label><br>

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check status_online_spare @error('status_online_spare') is-invalid @enderror"
                    name="status_online_spare" id="ONLINE" value="ONLINE" autocomplete="off">
                <label class="btn btn-outline-primary" for="ONLINE"> {{ __('messages.ONLINE') }}</label>

                <input type="radio" class="btn-check status_online_spare @error('status_online_spare') is-invalid @enderror"
                    name="status_online_spare" id="SPARE" value="SPARE" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="SPARE"> {{ __('messages.SPARE') }}</label>
                @error('status_online_spare')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>
        </div>
    @endif
@else
    <div class="mb-3">
        <label for="status_online_spare" class="form-label">{{ __('messages.status') }}</label><br>

        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check status_online_spare @error('status_online_spare') is-invalid @enderror"
                name="status_online_spare" id="ONLINE" value="ONLINE" autocomplete="off"
                @isset($equipement_state->status_online_spare)
            @if ($equipement_state->status_online_spare == 'ONLINE') checked @endif @endisset>
            <label class="btn btn-outline-primary" for="ONLINE"> {{ __('messages.ONLINE') }}</label>

            <input type="radio" class="btn-check status_online_spare @error('status_online_spare') is-invalid @enderror"
                name="status_online_spare" id="SPARE" value="SPARE" autocomplete="off"
                @isset($equipement_state->status_online_spare)
            @if ($equipement_state->status_online_spare == 'SPARE') checked @endif @endisset>
            <label class="btn btn-outline-primary" for="SPARE"> {{ __('messages.SPARE') }}</label>
            @error('status_online_spare')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
    </div>
@endisset


{{--  --}}
<script>
    $(function() {
        ShowHideFields();
    });
    $(".status_online_spare").change(function() {
        ShowHideFields();
    });

    function ShowHideFields() {
        if ($('#ONLINE').is(':checked')) {
            $('#terminal_div,#zone_div,#airline_div,#counter_div').show();
        } else {
            $('#terminal_div,#zone_div,#airline_div,#counter_div').hide();
        }
    }
</script>

<div class="mb-3" id="terminal_div">
    <label for="terminal" class="form-label">{{ __('messages.terminal') }}</label>
    <select name="terminal" id="terminal" class="form-select @error('terminal') is-invalid @enderror">
        @isset($selected_terminal)
            @if ($selected_terminal != null)
                <option selected hidden value="{{ $selected_terminal->id }}">
                    {{ $selected_terminal->name }}</option>
            @endif
        @else
            @if (old('terminal') != null)
                <option selected hidden value="{{ old('terminal') }}">
                    {{ \App\Models\Terminal::find(old('terminal'))->name }}</option>
            @else
                <option selected hidden value="">{{ __('messages.select terminal') }}</option>
            @endif
        @endisset


        @isset($terminals)
            @foreach ($terminals as $terminal)
                <option class="nav-item" value="{{ $terminal->id }}">
                    {{ $terminal->name }}
                </option>
            @endforeach
        @endisset
        {{-- @if ($terminal->id == \App\Models\Equipement::find($equipement_id)->id_terminal) selected @endif --}}
    </select>
    @error('terminal')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror

</div>
<div class="mb-3" id="zone_div">
    <label for="zone" class="form-label">{{ __('messages.zone') }}</label>
    <input name="zone" type="text" class="form-control @error('zone') is-invalid @enderror" id="zone"
        aria-describedby="zone"
    value="@isset($equipement_state){{ $equipement_state->zone }} @else {{ old('zone') }}@endisset">
    @error('zone')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>
<div class="mb-3" id="airline_div">
    <label for="airline" class="form-label">{{ __('messages.airline') }}</label>
    <input name="airline" type="text" class="form-control @error('observation') is-invalid @enderror" id="airline"
        aria-describedby="airline"
    value="@isset($equipement_state){{ $equipement_state->airline }} @else {{ old('airline') }}@endisset">
    @error('airline')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>
<div class="mb-3" id="counter_div">
    <label for="counter" class="form-label">{{ __('messages.counter') }}</label>
    <input name="counter" type="text" class="form-control @error('counter') is-invalid @enderror" id="counter"
        aria-describedby="counter"
    value="@isset($equipement_state){{ $equipement_state->counter }} @else {{ old('counter') }}@endisset">
    @error('counter')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>


{{--  --}}
@isset($create)
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.1/css/bootstrap.min.css"
        integrity="sha256-aAr2Zpq8MZ+YA/D6JtRD3xtrwpEz2IqOS+pWD/7XKIw=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css"
        crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.js"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput-angular.min.js"
        crossorigin="anonymous"></script>
    <style type="text/css">
        <style type="text/css">.bootstrap-tagsinput {
            width: 100%;
        }

        .label-info {
            background-color: #17a2b8;

        }

        .label {
            display: inline-block;
            padding: .5em .4em;
            font-size: 100%;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25rem;
            transition: color .15s ease-in-out, background-color .15s ease-in-out,
                border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }

    </style>


    <span class="text-info">{{ __('messages.put a comma to enter many elements') }} </span>

    <div class="mb-3">
        <label for="serial" class="form-label">{{ __('messages.serial part number') }} </label>
        <br>
        <input type="text" data-role="tagsinput" name="serial" class="form-control @error('serial') is-invalid @enderror"
            aria-describedby="serial"
        value="@isset($equipement_state){{ $equipement_state->serial }} @else {{ old('serial') }}@endisset">
        @error('serial')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    <span class="text-info">{{ __('messages.put a comma to enter many elements') }} </span>

    <div class="mb-3">
        <label for="tag" class="form-label">{{ __('messages.asset tag') }}</label>
        <br>
        <input type="text" data-role="tagsinput" name="tag" class="form-control @error('tag') is-invalid @enderror"
            aria-describedby="serial"
        value="@isset($equipement_state){{ $equipement_state->tag }} @else {{ old('tag') }}@endisset">
        @error('tag')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>

        @enderror
    </div>
@else


    <div class="mb-3">

        <label for="serial" class="form-label">{{ __('messages.serial part number') }}
        </label>
        <input name="serial" type="text" class="form-control @error('serial') is-invalid @enderror" id="serial"
            aria-describedby="serial"
        value="@isset($equipement_state){{ $equipement_state->serial_part_number }} @else {{ old('serial') }}@endisset">
        @error('serial')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="tag" class="form-label">{{ __('messages.asset tag') }}</label>
        <input name="tag" type="text" class="form-control @error('tag') is-invalid @enderror" id="tag"
            aria-describedby="tag"
        value="@isset($equipement_state){{ $equipement_state->asset_tag }} @else {{ old('tag') }}@endisset">
        @error('tag')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

@endisset




<input type="hidden" name="id_equipement" value="{{ $equipement_id }}">
@error('id_equipement')
    <span class="invalid-feedback" role="alert">
        {{ $message }}
    </span>
@enderror
<a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

<button type="submit" class="btn btn-primary"
    onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>
