@csrf
<div class="mb-3">
    <label for="nom" class="form-label">{{ __('messages.name') }}</label>
    <input name="nom" type="text" class="form-control @error('nom') is-invalid @enderror" id="nom" aria-describedby="nom"
        value="@isset($site){{ $site->nom }}@else{{ old('nom') }}@endisset">
        @error('nom')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="signifi" class="form-label">{{ __('messages.signification') }}</label>
        <input name="signifi" type="text" class="form-control @error('signifi') is-invalid @enderror" id="signifi"
            aria-describedby="signifi" value="@isset($site){{ $site->signifi }}@else{{ old('signifi') }}@endisset">
            @error('signifi')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>

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

        <div class="mb-3">
            <label for="terminal" class="form-label">{{ __('messages.terminal') }} </label>
            <br>
            <span class="text-info">{{ __('messages.put a comma to enter many elements') }} </span>
            <br>
            {{-- <a onclick="add()" class="btn btn-info">+</a>
                <a onclick="remove()" class="btn btn-info">-</a>
                <div id="new_chq" class="col-2"></div>
                <input type="hidden" value="1" id="total_chq">

                <script>
                    function add() {
                        var new_chq_no = parseInt($('#total_chq').val()) + 1;
                        var new_input = "<input type='text' data-role='infoinput' name='terminal[]' class='form-control' id='new_" +
                            new_chq_no + "'>";
                        $('#new_chq').append(new_input);
                        $('#total_chq').val(new_chq_no)
                    }

                    function remove() {
                        var last_chq_no = $('#total_chq').val();
                        if (last_chq_no > 1) {
                            $('#new_' + last_chq_no).remove();
                            $('#total_chq').val(last_chq_no - 1);
                        }
                    }
                </script> --}}
            <input type="text" data-role="tagsinput" name="terminal"
                class="form-control @error('terminal') is-invalid @enderror @error('terminal.*') is-invalid @enderror" aria-describedby="terminal" 
                value="@isset($terminal) @foreach ($terminal as $tr) ,{{ $tr->name }} @endforeach @else {{ old('terminal') }}@endisset">
                @error('terminal')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
                @error('terminal.*')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>


            {{-- <div class="mb-3">
                    <label for="terminal" class="form-label">{{ __('messages.terminal') }} </label>
                    <br>


                    @isset($terminal)
                        @foreach ($terminal as $tr)
                            <input type="text" data-role="terminalinput" name="terminal[]"
                                class="form-control @error('terminal') is-invalid @enderror" aria-describedby="terminal"
                                value="{{ $tr->name }}"><br>
                        @endforeach
                    @endisset

                    @error('terminal')
                        <span class="invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div> --}}


            <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

            <button type="submit" class="btn btn-primary"
                onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>
