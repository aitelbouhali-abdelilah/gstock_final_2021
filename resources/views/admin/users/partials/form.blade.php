@csrf
<div class="mb-3">
    <label for="name" class="form-label">{{ __('messages.name') }}</label>
    <input name="name" type="text" class="form-control @error('name') is-invalid @enderror" id="name"
    aria-describedby="name" value="@isset($user){{ $user->name }} @else {{ old('name') }}@endisset">
    @error('name')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror

</div>
<div class="mb-3">
    <label for="email" class="form-label">{{ __('messages.email') }}</label>
    <input name="email" type="email" class="form-control @error('email') is-invalid @enderror" id="email"
        aria-describedby="email" value="@isset($user){{ $user->email }} @else {{ old('email') }} @endisset">
    @error('email')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>
@isset($create)
    <div class="mb-3">
        <label for="password" class="form-label">{{ __('messages.password') }}</label>
        <input name="password" type="password" class="form-control @error('password') is-invalid @enderror" id="password">
        @error('password')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    <div class="mb-3">
        <label for="password_confirmation" class="form-label">{{ __('messages.password confirmation') }}</label>
        <input name="password_confirmation" type="password"
            class="form-control @error('password_confirmation') is-invalid @enderror" id="password_confirmation">
        @error('password_confirmation')
            <span class="invalid-feedback" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
@endisset
<div class="mb-3">
    <label for="role" class="form-label">{{ __('messages.role') }}</label>
    <select class="form-select @error('role') is-invalid @enderror" name="role">
        @if (old('role') != null)
            <option selected hidden value="{{ old('role') }}">{{ $roles->find(old('role'))->name }}</option>
        @else
            <option hidden value="">{{ __('messages.select role') }}</option>
        @endif
        @foreach ($roles as $role)
            <option value="{{ $role->id }}" @isset($user) @if ($role->id == $user->role->id)  selected @endif @endisset>{{ $role->name }}
            </option>

        @endforeach
    </select>
    @error('role')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>
<div class="mb-3">
    <label for="occupation" class="form-label">{{ __('messages.function') }}</label>
    <select class="form-select @error('occupation') is-invalid @enderror" name="occupation">
        @if (old('occupation') != null)
            <option selected hidden value="{{ old('occupation') }}">
                {{ $occupations->find(old('occupation'))->occupation }}</option>
        @else
            <option hidden value="">{{ __('messages.select function') }}</option>
        @endif
        @foreach ($occupations as $occupation)
            <option value="{{ $occupation->id }}" @isset($user) @if ($occupation->id == $user->occupation->id)) selected @endif @endisset>
                {{ $occupation->occupation }}

            </option>


        @endforeach
    </select>
    @error('occupation')
        <span class="invalid-feedback" role="alert">
            {{ $message }}
        </span>
    @enderror
</div>
<script>
    function eventCheckBox() {
        checkboxs = document.getElementsByClassName('sites');
        for (let index = 0; index < checkboxs.length; index++) {
            if (document.getElementById('checkall').checked) {
                checkboxs[index].checked = true;
            } else {
                checkboxs[index].checked = false;

            }
        }
        checkboxschilds = document.getElementsByClassName('terminal');

        for (let index = 0; index < checkboxschilds.length; index++) {
            if (document.getElementById('checkall').checked) {
                checkboxschilds[index].checked = true;
            } else
                checkboxschilds[index].checked = false;
        }

    }
</script>
<style>
    .list-group-flush>.list-group-item {
        border-width: 0 0 0px;
    }

</style>
@if($errors->first('terminal')!==null)
            <span class="invalid-feedback" role="alert">
                {{$errors->first('terminal')}}
            </span>
        @endif
@if (count(App\Models\Site::all()))

    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="checkall" onclick="eventCheckBox();">
        <label class="form-check-label" for="checkall">
            {{ __('messages.select all') }}
        </label>
    </div>
    <div class="mb-3">

        <ul class="list-group list-group-flush">
            @foreach (App\Models\Site::all() as $site)
                <li class="list-group-item  col-2">
                    <div class="form-check">
                        <input class="sites form-check-input  @error('sites') is-invalid @enderror" name="sites[]"
                            onclick="hide('id+{{ $site->signifi }}','{{ $site->signifi }}')" type="checkbox"
                            value="{{ $site->id }}" id="{{ $site->signifi }}" @isset($user)
                            @if (in_array($site->id, $user->sites->pluck('id')->toArray())) checked @endif @endisset />
                        <label class="form-check-label" for="{{ $site->signifi }}">
                            {{ $site->signifi }}
                        </label>
                    </div>
                    
                    <div id="id+{{ $site->signifi }}" style="display:none;" class="terminaldiv">
                        <ul>
                            <li class="list-group-item ">
                                @foreach (App\Models\Terminal::where('id_site', '=', $site->id)->get() as $terminal)
                                    <div class="form-check">
                                        <input
                                            class="terminal form-check-input  @error('terminal') is-invalid @enderror"
                                            name="terminal[]" type="checkbox" value="{{ $terminal->id }}"
                                            id="{{ $terminal->id }}" @isset($user) @if (in_array($terminal->id, $user->terminals->pluck('id')->toArray())) checked @endif
                                            @endisset>
                                        <label class="form-check-label" for="{{ $terminal->id }}">
                                            {{ $terminal->name }}
                                        </label>

                                    </div>
                                @endforeach
                            </li>
                        </ul>

                        

                    </div>

                </li>


            @endforeach
        </ul>
        
        @error('sites')
            <span class="invalid-feedback" style="display: block" role="alert">
                {{ $message }}
            </span>
        @enderror
        @error('terminal')
            <span class="invalid-feedback" style="display: block" role="alert">
                {{ $message }}
            </span>
        @enderror
    </div>
    <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>


    <button type="submit" class="btn btn-primary"
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
        {{ __('messages.you have no sites') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <a onclick="window.history.back()" class="btn btn-secondary">{{ __('messages.Back') }}</a>

    <button type="submit" class="btn btn-primary"
        onclick="this.form.submit(); this.disabled=true; this.value='Sending…'; ">{{ __('messages.submit') }}</button>

@endif

<script>
    window.onload = function() {
        const checkBoxes = document.getElementsByClassName('sites');
        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                var x = document.getElementById('id+' + checkBoxes[i].id);
                x.style.display = "block";

            }
        }
    }


    function hide($id, $site_id) {
        var x = document.getElementById($id);
        checkboxschilds = document.getElementById($id).getElementsByClassName("terminal");
        if (document.getElementById($site_id).checked) {
            x.style.display = "block";
            for (let index = 0; index < checkboxschilds.length; index++) {
                checkboxschilds[index].checked = true;
            }
        } else {
            x.style.display = "none";
            for (let index = 0; index < checkboxschilds.length; index++) {
                checkboxschilds[index].checked = false;
            }

        }
    }
</script>
