@csrf
<script>
    $(function(){
        $("#sites").change(function() {
                var selectedProduct = $('#product').children("option:selected").val();
                var selectedSite = $("#sites").children("option:selected").val();
                $.get("/system/" + selectedProduct + "/equipement/getProductTerminals/" + selectedSite,
                    function(data, message, xhr) {
                        //alert(selectedSite);

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

            $.get("/system/" + selectedProduct + "/rechange_and_conso/getPiecesList", function(data, message, xhr) {
                if (message === 'success') {
                    $('#piecelist')
                        .find('option')
                        .not(':first')
                        .remove();
                    $.each(data, function(k, v) {
                        // create option
                        var option = $('<option>');
                        // set its value
                        option.val(v.id);
                        // set its text
                        option.text(v.selection);
                        // append it to select element
                        $("#piecelist").append(option);
                    });
                }
            }, 'json');


            


        });
    </script>

    <div class="mb-3">
        <label for="site" class="form-label">{{ __('messages.sites') }}</label>
        <select name="site" id="sites" class="form-select @error('product') is-invalid @enderror">
            @if (old('type') != null)
                <option selected hidden value="{{ old('site') }}">{{ \App\Models\Site::first(old('site')) }}</option>

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
        <label for="terminal" class="form-label">{{ __('messages.terminal') }}</label>
        <select id="terminal" class="form-select @error('terminal') is-invalid @enderror" name="terminal">
            @if (old('terminal') != null)
                <option selected hidden value="{{ old('terminal') }}">
                    {{ \App\Models\Terminal::find(old('terminal'))->name }}</option>
            @else
                <option selected hidden value="">{{ __('messages.select terminal') }}</option>
            @endif
        </select>
        @error('terminal')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    {{--  --}}


    <div class="mb-3">
        <label for="stock" class="form-label">{{ __('messages.quantity in stock') }}</label>
        <input name="stock" type="number" min="0" class="form-control @error('stock') is-invalid @enderror" id="stock"
            aria-describedby="stock" value="{{ old('stock') }}">
        @error('stock')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>
    <div class="mb-3">
        <label for="piece" class="form-label">{{ __('messages.ref piece') }}</label>
        <select id="piecelist" class="form-select @error('piece') is-invalid @enderror" name="piece">

            <option selected hidden value="">{{ __('messages.Select piece') }}</option>

        </select>
        @error('piece')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="part" class="form-label">{{ __('messages.serial part number') }}</label>
        <input name="part" type="text" class="form-control @error('part') is-invalid @enderror" id="part"
            aria-describedby="part" value="{{ old('part') }}">
        @error('part')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="alert_stock" class="form-label">{{ __('messages.running out of stock alert') }}</label>
        <input name="alert_stock" type="number" min="0" class="form-control @error('alert_stock') is-invalid @enderror"
            id="alert_stock" value="{{ auth()->user()->alert_stock_equipement }}">
        @error('alert_stock')
            <span class=" invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

    <button type="submit" class="btn btn-primary"
        onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>

@else

<select name="product" id="product" hidden>
    <option class="nav-item" value="{{ \App\Models\Products::where('name','=',$system_type)->first()->id }}" selected>
    </option>
</select>
    
    <div class="mb-3">
        <label for="site" class="form-label">{{ __('messages.sites') }}</label>
        <select name="site" id="sites" class="form-select @error('product') is-invalid @enderror">
            @if (old('type') != null)
                <option selected hidden value="{{ old('site') }}">{{ \App\Models\Site::first(old('site')) }}</option>

            @else
                <option selected hidden value="">{{ __('messages.select site') }}</option>
            @endif
            @foreach ($sites as $site)
                <option class="nav-item" value="{{ $site->id }}" @if ($site->id == $piece->id_site) selected @endif>{{ $site->signifi }}
                </option>
            @endforeach
        </select>
        @error('sites')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>
    <script>
        $(function() {
            myFunction();
        });
        $("#sites").change(function() {
            myFunction();
        });

        function myFunction() {
            var selectedSite = $("#sites").children("option:selected").val();
            $.get("/system/<?php echo $system_type; ?>/equipement/getProductTerminals/" + selectedSite,
                function(data, message, xhr) {
                    $('#terminal')
                        .find('option')
                        .not(':first')
                        .remove();
                    if (message === 'success') {
                        $.each(data, function(k, v) {
                            var option = $('<option>');
                            option.val(v.id);
                            option.text(v.name);
                            $("#terminal").append(option);
                        });
                    }
                }, 'json');

        }
    </script>

    {{--  --}}
    <div class="mb-3">
        <label for="terminal" class="form-label">{{ __('messages.terminal') }}</label>
        <select name="terminal" id="terminal" class="terminaledit form-select @error('terminal') is-invalid @enderror">
            @if ($selected_terminal != null)
                <option selected hidden value="{{ $selected_terminal }}">
                    {{ \App\Models\Terminal::find($selected_terminal)->name }}</option>

            @else
                <option selected hidden value="">{{ __('messages.select terminal') }}</option>
            @endif
            @isset($terminals)
                @foreach ($terminals as $terminal)
                    <option class="nav-item" value="{{ $terminal->id }}" @if ($terminal->id == $piece->id_terminal) selected @endif>
                        {{ $terminal->name }}
                    </option>

                @endforeach
            @endisset

        </select>
        @error('terminal')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>

    {{--  --}}


    <div class="mb-3">
        <label for="stock" class="form-label">{{ __('messages.quantity in stock') }}</label>
        <input name="stock" type="text" class="form-control @error('stock') is-invalid @enderror" id="stock"
        aria-describedby="stock" value="@isset($piece){{ $piece->stock }} @else {{ old('stock') }}@endisset">
        @error('stock')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror

    </div>

    <div class="mb-3">
        <label for="piece" class="form-label">{{ __('messages.ref consomable') }}</label>
        <select id="piecelist" class="form-select @error('piece') is-invalid @enderror" name="piece">
            @if (old('piece') != null)
                <option selected hidden value="{{ old('piece') }}">
                    {{ $piecelists->where('id', '=', old('piece'))->first()->designation }}</option>

            @else
                <option selected hidden value="">{{ __('messages.Select piece') }}</option>
            @endif

            @foreach ($piecelists as $piecelist)
                <option value="{{ $piecelist->id }}" @isset($piece) @if ($piecelist->id == $piece->piecelist->id) selected @endif @endisset>
                    {{ $piecelist->selection }}</option>
            @endforeach
        </select>
        @error('piece')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="part" class="form-label">{{ __('messages.serial part number') }}</label>
        <input name="part" type="text" class="form-control @error('part') is-invalid @enderror" id="part"
        aria-describedby="part" value="@isset($piece){{ $piece->part_number }} @else {{ old('part') }}@endisset">
        @error('part')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <div class="mb-3">
        <label for="alert_stock" class="form-label">{{ __('messages.running out of stock alert') }}</label>
        <input name="alert_stock" type="number" min="0" class="form-control @error('alert_stock') is-invalid @enderror"
            id="alert_stock" value="{{ $piece->alert_stock }}">
        @error('alert_stock')
            <span class=" invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

    <button type="submit" class="btn btn-primary"
        onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>

@endisset
