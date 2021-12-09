@csrf

<script>
    function eventCheckBox() {
        checkboxs = document.getElementsByClassName('products');
        for (let index = 0; index < checkboxs.length; index++) {
            if (document.getElementById('checkall').checked) {
                checkboxs[index].checked = true;
            } else
                checkboxs[index].checked = false;
        }

    }
</script>
<style>
    .list-group-flush>.list-group-item {
        border-width: 0 0 0px;
    }

</style>
@isset($create)

    <div class="mb-3">
        <label for="reference" class="form-label">{{ __('messages.referance') }} </label>
        <input name="reference" type="text" class="form-control @error('reference') is-invalid @enderror" id="reference"
            aria-describedby="reference" value="{{ old('reference') }}">
        @error('reference')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    <div class="mb-3">

        <label for="designation" class="form-label">{{ __('messages.description') }} </label>
        <input name="designation" type="text" class="form-control @error('designation') is-invalid @enderror"
            id="designation" aria-describedby="designation" value="{{ old('designation') }}">
        @error('designation')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    <div class="mb-3">

        <label for="supplier" class="form-label">{{ __('messages.supplier') }} </label>
        <input name="supplier" type="text" class="form-control @error('supplier') is-invalid @enderror" id="supplier"
            aria-describedby="supplier" value="{{ old('supplier') }}">
        @error('supplier')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    @if (count(App\Models\Products::all()))

        <div class="mb-3">
            <label for="products" class="form-label">{{ __('messages.products') }} </label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkall" onclick="eventCheckBox()">
                <label class="form-check-label" for="checkall">
                    Select All
                </label>
            </div>
            <ul class="list-group list-group-flush">
                @foreach (App\Models\Products::all() as $product)
                    <li class="list-group-item  col-2">
                        <div class="form-check">
                            <input class="products form-check-input  @error('products') is-invalid @enderror"
                                name="products[]" type="checkbox" value="{{ $product->id }}" id="{{ $product->name }}"
                                @isset($piecelist) @if (in_array($product->id, $piecelist->products->pluck('id')->toArray())) checked @endif @endisset>
                            <label class="form-check-label" for="{{ $product->name }}">
                                {{ $product->name }}
                            </label>
                        </div>
                    </li>
                @endforeach
            </ul>
            @error('products')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
        <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>
        <button type="submit" class="btn  btn-primary" role="button"
            onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>

    @else
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
        </svg>
        <div class="alert alert-danger alert-dismissible fade show align-items-center mx-auto" style="width: fit-content;"
            role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            {{ __('messages.you have no products') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

@else
    <div class="mb-3">
        <label for="ref_piece" class="form-label">{{ __('messages.ref piece') }} </label>
        <input name="ref_piece" type="text" class="form-control @error('ref_piece') is-invalid @enderror" id="ref_piece"
            aria-describedby="ref_piece"
            value="@isset($piecelist){{ $piecelist->ref_piece }}@else{{ old('ref_piece') }}@endisset">
            @error('ref_piece')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>
        <div class="mb-3">

            <label for="designation" class="form-label">{{ __('messages.description') }} </label>
            <input name="designation" type="text" class="form-control @error('designation') is-invalid @enderror"
                id="designation" aria-describedby="designation"
                value="@isset($piecelist){{ $piecelist->designation }}@else{{ old('designation') }}@endisset">
                @error('designation')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>

            <div class="mb-3">

                <label for="supplier" class="form-label">{{ __('messages.supplier') }} </label>
                <input name="supplier" type="text" class="form-control @error('supplier') is-invalid @enderror" id="supplier"
                    aria-describedby="supplier"
                    value="@isset($piecelist){{ $piecelist->supplier }}@else{{ old('supplier') }}@endisset">
                    @error('supplier')
                        <span class="invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="products" class="form-label">{{ __('messages.products') }} </label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="checkall" onclick="eventCheckBox()">
                        <label class="form-check-label" for="checkall">
                            {{ __('messages.select all') }}
                        </label>
                    </div>

                    <ul class="list-group list-group-flush">
                        @foreach ($products as $product)
                            <li class="list-group-item  col-2">
                                <div class="form-check">
                                    <input class="products form-check-input  @error('products') is-invalid @enderror" name="products[]"
                                        type="checkbox" value="{{ $product->id }}" id="{{ $product->name }}" @isset($piecelist)
                                        @if (in_array($product->id, $piecelist->products->pluck('id')->toArray())) checked @endif @endisset>
                                    <label class="form-check-label" for="{{ $product->name }}">
                                        {{ $product->name }}
                                    </label>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                    @error('products')
                        <span class="invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>
                <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

                <button type="submit" class="btn  btn-primary" role="button"
                    onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>

            @endisset
