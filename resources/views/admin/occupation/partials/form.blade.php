@csrf
<div class="mb-3">
    <label for="occupation" class="form-label">{{ __('messages.functions') }}</label>
    <input name="occupation" type="text" class="form-control @error('occupation') is-invalid @enderror" id="occupation"
        aria-describedby="occupation"
        value="@isset($occupation){{ $occupation->occupation }}@else{{ old('occupation') }}@endisset">
        @error('occupation')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>

    <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>


    <button type="submit" class="btn btn-primary"
        onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>
