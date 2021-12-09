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
        <label for="model" class="form-label">{{ __('messages.model') }}</label>
        <input name="model" type="text" class="form-control @error('model') is-invalid @enderror" id="nom"
            aria-describedby="nom" value="@isset($model){{ $model->name }}@else{{ old('model') }}@endisset">
            @error('model')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>


        <div class="mb-3">
            <label for="type" class="form-label">{{ __('messages.type') }}</label>

            <select id="types" class="form-select @error('type') is-invalid @enderror" name="type">

                @if (old('type') != null)
                    <option selected hidden value="{{ old('type') }}">
                        @if (\App\Models\EquipementType::where('id', '=', old('type'))->first() != null)
                            {{ \App\Models\EquipementType::where('id', '=', old('type'))->first()->name }}

                        @endif

                    </option>

                @else
                    <option selected hidden value="">{{ __('messages.select type') }}</option>
                @endif
                @foreach (\App\Models\EquipementType::all() as $type)
                    <option value="{{ $type->id }}">{{ $type->name }}</option>
                @endforeach

            </select>
            @error('type')
                <span class="invalid-feedback" role="alert">
                    {{ $message }}
                </span>
            @enderror
        </div>

        <br>
        <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>


        <button type="submit" class="btn  btn-primary" role="button"
            onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>

    @else
        <div class="mb-3">
            <label for="model" class="form-label">{{ __('messages.model') }}</label>
            <input name="model" type="text" class="form-control @error('model') is-invalid @enderror" id="nom"
                aria-describedby="nom" value="@isset($model){{ $model->name }}@else{{ old('model') }}@endisset">
                @error('model')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>

            <div class="mb-3">
                <label for="type" class="form-label">{{ __('messages.type') }}</label>

                <select id="types" class="form-select @error('type') is-invalid @enderror" name="type">
                    @isset($type)
                        @if ($type != null)
                            <option selected hidden value="{{ $type->id }}">{{ $type->name }}</option>
                        @endif
                    @else
                        <option selected hidden value="">{{ __('messages.select type') }}</option>
                    @endisset

                    @foreach (\App\Models\EquipementType::all() as $type)
                        <option value="{{ $type->id }}">{{ $type->name }}</option>
                    @endforeach

                </select>
                @error('type')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                @enderror
            </div>
            <br>

            <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>


            <button type="submit" class="btn  btn-primary" role="button"
                onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>
        @endisset
