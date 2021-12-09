@csrf
<script>
    $(function() {
        $("#types").change(function() {
            var selectedProduct = $('#product').children("option:selected").val();
            var selectedType = $(this).children("option:selected").val();
            $.get("/system/" + selectedProduct + "/equipement/getModels/" + selectedType, function(data,
                message,
                xhr) {
                $('#models')
                    .find('option')
                    .not(':first')
                    .remove();
                if (message === 'success') {
                    $.each(data, function(k, v) {
                        // create option
                        var option = $('<option>');
                        // set its value
                        option.val(v.id);
                        // set its text
                        option.text(v.name);
                        // append it to select element
                        $("#models").append(option);
                    });
                }
            }, 'json');

        });

        $("#sites").change(function() {
            var selectedProduct = $('#product').children("option:selected").val();
            var selectedSite = $("#sites").children("option:selected").val();
            $.get("/system/" + selectedProduct + "/equipement/getProductTerminals/" + selectedSite,
                function(data,
                    message, xhr) {
                    $('#terminal')
                        .find('option')
                        .not(':first')
                        .remove();
                    if (message === 'success') {
                        $.each(data, function(k, v) {
                            // create option
                            var option = $('<option>');
                            // set its value
                            option.val(v.id);
                            // set its text
                            option.text(v.name);
                            // append it to select element
                            $("#terminal").append(option);
                        });
                    }
                }, 'json');
        });
    });
</script>
@isset($create)

    <div class="mb-3">
        <label for="product" class="form-label">{{ __('messages.products') }}</label>
        <select name="product" id="product" class="form-select @error('product') is-invalid @enderror">
            <option selected hidden value="">{{ __('messages.select product') }}</option>

            @foreach (Auth::user()->products() as $product)
                <option class="nav-item" value="{{ $product->id }}">{{ $product->name }}
                </option>
            @endforeach
        </select>
        @error('product')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>



    <script>
        $("#product").change(function() {
            var selectedProduct = $(this).children("option:selected").val();
            $.get("/system/" + selectedProduct + "/equipement/getProductSites", function(data, message, xhr) {
                $('#sites')
                    .find('option')
                    .not(':first')
                    .remove();
                if (message === 'success') {
                    $.each(data, function(k, v) {
                        // create option
                        var option = $('<option>');
                        // set its value
                        option.val(v.id);
                        // set its text
                        option.text(v.signifi);
                        // append it to select element
                        $("#sites").append(option);
                    });
                }
            }, 'json');
            $.get("/system/" + selectedProduct + "/equipement/getTypes", function(data, message, xhr) {
                $('#types')
                    .find('option')
                    .not(':first')
                    .remove();
                $('#models')
                    .find('option')
                    .not(':first')
                    .remove();
                if (message === 'success') {
                    $.each(data, function(k, v) {
                        // create option
                        var option = $('<option>');
                        // set its value
                        option.val(v.id);
                        // set its text
                        option.text(v.name);
                        // append it to select element
                        $("#types").append(option);
                    });
                }
            }, 'json');


        });
    </script>

    <div class="mb-3">
        <label for="site" class="form-label">{{ __('messages.sites') }}</label>
        <select name="site" id="sites" class="form-select @error('product') is-invalid @enderror">
            @if (old('site') != null)
                <option selected hidden value="{{ old('site') }}">{{ \App\Models\Site::find(old('site'))->signifi }}
                </option>

            @else
                <option selected hidden value="">{{ __('messages.select site') }}</option>
            @endif
        </select>
        @error('sites')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>
    {{--  --}}
    <div class="mb-3">
        <label for="status" class="form-label">{{ __('messages.status') }}</label><br>

        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check status @error('status') is-invalid @enderror" name="status" id="ONLINE"
                value="ONLINE" autocomplete="off" checked>
            <label class="btn btn-outline-primary" for="ONLINE"> {{ __('messages.ONLINE') }}</label>

            <input type="radio" class="btn-check status @error('status') is-invalid @enderror" name="status" id="SPARE"
                value="SPARE" autocomplete="off">
            <label class="btn btn-outline-primary" for="SPARE"> {{ __('messages.SPARE') }}</label>
            
            @error('status')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
    </div>
    {{-- <div class="mb-3">
        <label for="terminal" class="form-label">{{ __('messages.terminal') }}</label>
        <select id="terminal" class="form-select @error('type') is-invalid @enderror" name="terminal">
            @if (old('terminal') != null)
                <option selected hidden value="{{ old('terminal') }}">
                    {{ \App\Models\Terminal::find(old('terminal'))->name }}
                </option>
            @else
                <option selected hidden value="">{{ __('messages.select terminal') }}</option>
            @endif
        </select>
        @error('terminal')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div> --}}
    {{--  --}}
    <div class="mb-3">
        <label for="type" class="form-label">{{ __('messages.type') }}</label>

        <select id="types" class="form-select @error('type') is-invalid @enderror" name="type">

            @if (old('type') != null)
                <option selected hidden value="{{ old('type') }}">
                    {{ \App\Models\EquipementType::find(old('type'))->name }}</option>

            @else
                <option selected hidden value="">{{ __('messages.select type') }}</option>
            @endif

        </select>
        @error('type')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>


    <div class="mb-3">
        <label for="model" class="form-label">{{ __('messages.model') }}</label>

        <select id="models" class="form-select @error('model') is-invalid @enderror" name="model">
            @if (old('model') != null)
                <option selected hidden value="{{ old('model') }}">
                    {{ \App\Models\EquipementModel::find(old('model'))->model }}</option>

            @else
                <option selected hidden value="">{{ __('messages.select model') }}</option>
            @endif

        </select>
        @error('model')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>



    <div class="mb-3">
        <label for="description" class="form-label">{{ __('messages.description') }}</label>
        <input name="description" type="text" class="form-control @error('description') is-invalid @enderror"
            id="description" aria-describedby="description"
        value="@isset($equipement){{ $equipement->description }} @else {{ old('description') }}@endisset">
        @error('description')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>

    <div class="mb-3">
        <label for="alert_stock" class="form-label">{{ __('messages.running out of stock alert') }}</label>
        <input name="alert_stock" type="number" min="0" class="form-control @error('alert_stock') is-invalid @enderror"
            id="alert_stock" value="{{ auth()->user()->alert_stock_consomable }}">
        @error('alert_stock')
            <span class=" invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>



@else
    <select name="product" id="product" hidden>
        <option class="nav-item" value="{{ \App\Models\Products::where('name', '=', $system_type)->first()->id }}"
            selected>
        </option>
    </select>
    <div class="mb-3">
        <label for="site" class="form-label">{{ __('messages.sites') }}</label><br>
        <select name="site" id="sites" class="form-select @error('site') is-invalid @enderror">

            @if (old('site') != null)
                <option selected hidden value="{{ old('site') }}">{{ \App\Models\Site::find(old('site'))->nom }}
                </option>

            @else
                <option selected hidden value="">{{ __('messages.select site') }}</option>
            @endif
            @foreach ($sites as $site)
                <option class="nav-item" value="{{ $site->id }}" @if ($site->id == $equipement->id_site) selected @endif>{{ $site->signifi }}
                </option>
            @endforeach
        </select>
        @error('sites')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>


    <div class="mb-3" hidden>
        <label for="status" class="form-label">{{ __('messages.status') }}</label><br>

        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check status @error('status') is-invalid @enderror" name="status" id="ONLINE"
                value="ONLINE" autocomplete="off" @isset($equipement) @if ($equipement->status == 'ONLINE') checked @endif @endisset>
            <label class="btn btn-outline-primary" for="ONLINE"> {{ __('messages.ONLINE') }}</label>

            <input type="radio" class="btn-check status @error('status') is-invalid @enderror" name="status" id="SPARE"
                value="SPARE" autocomplete="off" @isset($equipement) @if ($equipement->status == 'SPARE') checked @endif @endisset>
            <label class="btn btn-outline-primary" for="SPARE"> {{ __('messages.SPARE') }}</label>
            @error('status')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
    </div>
    {{-- <div class="mb-3">
        <label for="terminal" class="form-label">{{ __('messages.terminal') }}</label>
        <select name="terminal" id="terminal" class="form-select @error('terminal') is-invalid @enderror">

            @if (old('terminal') != null)
                <option selected hidden value="{{ old('terminal') }}">
                    {{ \App\Models\Terminal::find(old('terminal'))->name }}</option>

            @else
                <option selected hidden value="">{{ __('messages.select terminal') }}</option>
            @endif
            @foreach ($terminals as $terminal)
                <option class="nav-item" value="{{ $terminal->id }}" @if ($terminal->id == $equipement->id_terminal) selected @endif>
                    {{ $terminal->name }}
                </option>
            @endforeach
        </select>
        @error('terminal')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div> --}}
    {{--  --}}

    <div class="mb-3">
        <label for="type" class="form-label">{{ __('messages.type') }}</label>

        <select class="form-select @error('type') is-invalid @enderror" name="type" id="types">

            @if (old('type') != null)
                <option selected hidden value="{{ old('type') }}">
                    {{ \App\Models\EquipementType::find(old('type'))->name }}</option>

            @else
                <option selected hidden value="">{{ __('messages.select type') }}</option>
            @endif

            @if (old('type') == null)
                @foreach ($equipement_types as $equipement_type)
                    <option value="{{ $equipement_type->id }}" @isset($equipement) @if ($equipement_type->id == $equipement_models->id_type) selected @endif @endisset>
                        {{ $equipement_type->name }}</option>
                @endforeach
            @endif

        </select>
        @error('type')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="model" class="form-label">{{ __('messages.model') }}</label>

        <select id="models" class="form-select @error('model') is-invalid @enderror" name="model">
            @if (old('model') != null)
                <option hidden value="{{ old('model') }}">{{ \App\Models\EquipementModel::find(old('model'))->name }}
                </option>

            @else
                <option hidden value="">{{ __('messages.select model') }}</option>
            @endif
            @if (isset($equipement) && old('model') == null)
                <option value="{{ $equipement_models->id }}" selected hidden>
                    {{ $equipement_models->name }}</option>
            @endif
        </select>
        @error('model')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>



    <div class="mb-3">
        <label for="description" class="form-label">{{ __('messages.description') }}</label>
        <input name="description" type="text" class="form-control @error('description') is-invalid @enderror"
            id="description" aria-describedby="description"
        value="@isset($equipement){{ $equipement->description }} @else {{ old('description') }}@endisset">
        @error('description')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>

    <div class="mb-3">
        <label for="alert_stock" class="form-label">{{ __('messages.running out of stock alert') }}</label>
        <input name="alert_stock" type="number" min="0" class="form-control @error('alert_stock') is-invalid @enderror"
            id="alert_stock" value="{{ $equipement->alert_stock }}">
        @error('alert_stock')
            <span class=" invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

@endisset



<a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

<button type="submit" class="btn btn-primary"
    onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>
