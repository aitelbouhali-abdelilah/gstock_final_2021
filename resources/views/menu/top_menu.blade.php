<link href="{{ asset('css/n_nav.css') }}" rel="stylesheet" />
<script src="{{ asset('FinalGstock/script.js') }}"></script>
<header class="">
    <div class="container">
        <div class="logoHolder ">
            <a href="/" title="SITA Logo">
                <img src="{{ asset('/FinalGstock/logo.svg') }}" alt="Easy and safe travel every step of the way"
                    title="Easy and safe travel every step of the way">
            </a>
        </div>

        <style>
            .dropbtn {
                width: 54px;
                font-family: monospace;
                text-align: left;
                color: #0095da;
                padding: 16px;
                font-size: 16px;
                border: none;
                cursor: pointer;
                background-color: transparent;
                border: 1px solid transparent;
                padding: 2px 10px;
                font-size: 16px;
                border-radius: .25rem;
                transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }

            .dropdown {
                position: relative;
                margin-left: 19px;
                padding: 0px;
                width: 54px;
                display: inline-block;
                cursor: pointer;
                border-radius: 30px;
                border: 2px solid #0095da;
                color: #0095da;
            }

            .dropdown::after {
                position: absolute;
                top: 11px;
                right: 9px;
                margin-left: -12px;
                font-size: 14px;
                content: "";
                border-top: .3em solid;
                border-right: .3em solid transparent;
                border-bottom: 0;
                border-left: .3em solid transparent;
            }

            .dropdown-content {
                cursor: pointer;
                display: none;
                min-width: 58px;
                position: absolute;
                background-color: #f9f9f9;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                z-index: 1;
                border-radius: 3px;
            }

            .dropdown-content a {
                color: #0095da !important;
                width: 100%;
                box-sizing: border-box;
                text-align: start;
                width: 100%;
                text-align: start;
                margin-top: 5px;
                margin-bottom: 5px;
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;

                display: inline-block;
                font-weight: 400;
                line-height: 1.5;
                color: #212529;
                text-decoration: none;
                vertical-align: middle;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
                background-color: transparent;
                border: 1px solid transparent;

                padding: 6px 12px;

                font-size: 1rem;
                transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }

            .dropdown-content a:hover {
                background-color: #cecece
            }

            .dropdown:hover .dropdown-content {
                display: block;
            }

            .dropdown a:hover .dropbtn {
                background-color: #3e8e41;
            }

            @media screen and (max-width: 1200px) and (min-width: 1000px) {
                header .container {
                    margin: 0;
                    max-width: 100%;
                }
            }

            @media (max-width: 1000px) {
                .dropdown {
                    padding-top: 2px !important;
                    margin-left: 0;
                    text-align: left;
                }

                .dropdown::after {
                    top: 13px;
                }

                header .menuBurger span {
                    margin: 8px;
                }

                header .menuBurger {
                    top: 3px;
                    right: 0;
                    padding: 15px 25px;
                }

                header .container {
                    text-align: center;
                }

                header nav ul .rightSection {
                    position: initial;
                }

                header .container nav {
                    overflow-x: auto;
                }
            }

        </style>
        <div class="dropdown">
            <button class="dropbtn">{{ Config::get('languages')[App::getLocale()] }}</button>
            <div class="dropdown-content">
                @foreach (Config::get('languages') as $lang => $language)
                    @if ($lang != App::getLocale())
                        <li>
                            <a href="{{ route('lang.switchLang', $lang) }}">
                                {{ $language }}
                            </a>
                        </li>
                    @endif
                @endforeach
            </div>
        </div>
        <nav>
            <ul>

                @can('is-admin')

                    <li class="hasSubMenu">
                        <a href="{{ route('admin.users.index') }}">
                            {{ __('messages.users') }}
                        </a>
                        <div class="subNav">
                            <div class="container">
                                <a href="{{ route('admin.users.index') }}" class="menuTitle">
                                    {{ __('messages.users') }}</a>
                                <div class="row noMargin">
                                    <div class="col-md-3">
                                        <div class="menuSubSection animated">
                                            <span></span>
                                            <ul>
                                                <li>
                                                    <a href="{{ route('admin.users.create') }}">
                                                        {{ __('messages.add user') }}</a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('admin.users.index') }}">
                                                        {{ __('messages.users management') }}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="menuSubSection animated">
                                            <div class="menu-text-image">
                                                <div class="textBlock">
                                                    <p> {{ __('messages.users messages') }} </p>
                                                </div>
                                                <div class="imagesBlock">
                                                    <img src="{{ asset('/FinalGstock/press-room-377x250.jpg') }}"
                                                        alt="Spare Parts" title="Spare Parts">


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="hasSubMenu">
                        <a href="{{ route('admin.sites.index') }}">
                            {{ __('messages.sites') }}
                        </a>
                        <div class="subNav">
                            <div class="container">
                                <a href="{{ route('admin.sites.index') }}" class="menuTitle">
                                    {{ __('messages.sites') }}</a>
                                <div class="row noMargin">
                                    <div class="col-md-3">
                                        <div class="menuSubSection">
                                            <span></span>
                                            <ul>
                                                <li>
                                                    <a href="{{ route('admin.sites.create') }}">
                                                        {{ __('messages.add site') }}</a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('admin.sites.index') }}">
                                                        {{ __('messages.sites management') }}</a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="menuSubSection animated">
                                            <div class="menu-text-image">
                                                <div class="textBlock">
                                                    <p> {{ __('messages.sites messages') }} </p>
                                                </div>
                                                <div class="imagesBlock">
                                                    <img src="{{ asset('/FinalGstock/press-room-377x250.jpg') }}"
                                                        alt="Spare Parts" title="Spare Parts">


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="hasSubMenu">
                        <a href="{{ route('admin.occupation.index') }}">
                            {{ __('messages.functions') }}
                        </a>
                        <div class="subNav">
                            <div class="container">
                                <a href="{{ route('admin.occupation.index') }}" class="menuTitle">
                                    {{ __('messages.functions') }}</a>
                                <div class="row noMargin">
                                    <div class="col-md-3">
                                        <div class="menuSubSection">
                                            <span></span>
                                            <ul>
                                                <li>
                                                    <a href="{{ route('admin.occupation.create') }}">
                                                        {{ __('messages.add function') }}</a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="{{ route('admin.occupation.index') }}">{{ __('messages.functions management') }}</a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="menuSubSection animated">
                                            <div class="menu-text-image">
                                                <div class="textBlock">
                                                    <p>{{ __('messages.Functions messages') }}</p>
                                                </div>
                                                <div class="imagesBlock">
                                                    <img src="{{ asset('/FinalGstock/press-room-377x250.jpg') }}"
                                                        alt="Spare Parts" title="Spare Parts">


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                @endcan
 @can('user-or-viewer')

                    <li class="hasSubMenu">

                        
                            <a
                                href="{{ route('barChart') }}">
                                {{ __('messages.dashboard') }}
                            </a>
                       

                    </li>

                @endcan
                @can('logged-in')

                    <li class="hasSubMenu ">
                        @can('is-admin')
                            <a href="{{ route('admin.products.index') }}">
                                {{ __('messages.products') }}
                            </a>
                        @endcan
                        @cannot('is-admin')
                            <a href="#">
                                {{ __('messages.products') }}
                            </a>
                        @endcannot



                        <div class="subNav">
                            <div class="container">
                                <a href="#" class="menuTitle">
                                    {{ __('messages.products') }}</a>

                                <div class="row noMargin">
                                    <div class="col-md-8">
                                        @cannot('is-admin')
                                            @if (Auth::user()->sites->first()->products->first() != null)

                                                <div class="menuSubSection">
                                                    <span>{{ __('messages.action') }}</span>
                                                    <ul>
                                                        <style>
                                                            header .menuSubSection a{
                                                                padding-right: 10px;
                                                            }
                                                            header .menuSubSection li{
                                                                color: #0095da;
                                                                border: 2px double #e1e1e1;
                                                                border-right: 0;
                                                                border-top: 0;
                                                                border-radius: 0 0 0 13px;
                                                                border-left: thin;
                                                                padding: 7px;
                                                                display: flex;
                                                                align-items: center;
                                                            }
                                                            .menuSubSection .form-select
                                                            {
                                                                height: 30px;
                                                                line-height: 1.5;
                                                                padding: 0;
                                                                padding-left: 5px;
                                                                padding-right: 20px;
                                                            }
                                                        </style>

                                                        @foreach (App\Models\Products::first()->getRelatedProducts() as $product)

                                                            <li>
                                                                <a
                                                                    href="{{ route('system.equipement.index', ['system_type' => $product->name]) }}">{{ Str::upper($product->name) }}</a>
                                                                    <select name="forma" onchange="location = this.value;" class="form-select">
                                                                        <option class="nav-item" value="" hidden>{{ __('messages.sites') }}</option>
                                                                        @foreach ($product->getRelatedProductsSites as $site)

                                                                        <option class="nav-item" value="{{ route('system.equipement.index', ['system_type' => $product->name,'site'=>$site->id]) }}"><strong>{{ $site->signifi }}</strong></option>
                                                                        @endforeach
                                                                    </select>
                                                            </li>

                                                        @endforeach
                                                    </ul>
                                                </div>
                                            @else
                                                {{ __('messages.you have no product') }}
                                            @endif
                                        @endcannot

                                        @can('is-user')

                                            <div class="menuSubSection">


                                            </div>
                                        @endcan
                                        @can('is-admin')

                                            <div class="menuSubSection">
                                                <span>{{ __('messages.action') }}</span>
                                                <ul>
                                                    <li>
                                                        <a href="{{ route('admin.products.create') }}">
                                                            {{ __('messages.add product') }} </a>
                                                    </li>
                                                    <li>
                                                        <a href="{{ route('admin.products.index') }}">
                                                            {{ __('messages.products management') }} </a>
                                                    </li>


                                                </ul>
                                            </div>
                                        @endcan


                                    </div>
                                    <div class="col-md-4">

                                        <div class="menuSubSection">
                                            <div style="background-color: transparent; opacity:1;" class="p-1 m-0">
                                                <div class="menu-text-image">
                                                    <img title="Products"
                                                        src="{{ asset('/FinalGstock/rsfather-and-son-out-walking-in-the-park-377-252.jpg') }}"
                                                        alt="Products" width="377" height="252">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="blueBar">
                                <div class="container">
                                    <div class="rightSection">
                                        <label>

                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>



                    <li class="hasSubMenu">

                        @cannot('is-admin')
                            @if (Auth::user()->sites->first()->products->first() != null)
                                <a
                                    href="{{ route(
    'system.equipement.index',
    Auth::user()->sites->first()->products->first()['name'],
) }}">
                                    {{ __('messages.equipements') }}
                                </a>
                            @else
                                <a href="#">
                                    {{ __('messages.equipements') }}
                                </a>
                            @endif
                        @endcannot
                        @can('is-admin')
                            @if (App\Models\Products::first() != null)
                                <a
                                    href="{{ route('system.config.equipement_model.index', App\Models\Products::first()->value('name')) }}">
                                    {{ __('messages.equipements') }}
                                </a>
                            @else
                                <a href="#">
                                    {{ __('messages.equipements') }}
                                </a>
                            @endif
                        @endcan



                        <div class="subNav">
                            <div class="container">
                                @if (App\Models\Products::get()->isEmpty())
                                    <a href="" class="menuTitle">{{ __('messages.equipements') }}
                                    @else
                                        <a href="" class="menuTitle">{{ __('messages.equipements') }}
                                @endif
                                </a>
                                <div class="row noMargin">
                                    <div class="col-md-3">
                                        <div class="menuSubSection">
                                            <span>{{ __('messages.action') }}</span>
                                            @can('is-user')
                                                <ul>
                                                    @if (Auth::user()->sites->first()->products->first() != null)
                                                        <li>
                                                            <a href="{{ route('system.equipement_create') }}">
                                                                {{ __('messages.add equipments') }}
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a
                                                                href="{{ route('system.equipement.index',Auth::user()->sites->first()->products->first()['name']) }}">
                                                                {{ __('messages.equipments management') }}
                                                            </a>

                                                        </li>
                                                    @else
                                                        {{ __('messages.you have no product') }}
                                                    @endif

                                                </ul>
                                            @endcan
                                            @can('is-admin')
                                                <ul>
                                                    @if (App\Models\Products::first() != null)
                                                        <li>
                                                            <a href="{{ route('system.equipement_type_create') }}">
                                                                {{ __('messages.add type') }} </a>
                                                        </li>

                                                        <li>
                                                            <a
                                                                href="{{ route('system.config.equipement_type.index', App\Models\Products::first()->value('name')) }}">{{ __('messages.types management') }}</a>
                                                        </li>

                                                        <li>
                                                            <a href="{{ route('system.equipement_model_create') }}">
                                                                {{ __('messages.add model') }} </a>
                                                        </li>

                                                        <li>
                                                            <a
                                                                href="{{ route('system.config.equipement_model.index', App\Models\Products::first()->value('name')) }}">
                                                                {{ __('messages.models mangement') }} </a>
                                                        </li>
                                                    @else
                                                        {{ __('messages.you have no product') }}
                                                    @endif
                                                </ul>

                                            @endcan
                                            @can('is-viewer')
                                                <ul>
                                                    @if (Auth::user()->sites->first()->products->first() != null)
                                                        <li>
                                                            <a
                                                                href="{{ route('system.equipement.index',Auth::user()->sites->first()->products->first()['name']) }}">{{ __('messages.view  equipements') }}</a>
                                                        </li>
                                                    @else
                                                        {{ __('messages.you have no product') }}
                                                    @endif
                                                </ul>
                                            @endcan

                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="menuSubSection animated">
                                            <div class="menu-text-image">
                                                <div class="textBlock">
                                                    @cannot('is-viewer')
                                                        <p>{{ __('messages.equipement message') }} </p>
                                                    @endcannot

                                                </div>
                                                <div class="imagesBlock">
                                                    <img src="{{ asset('/FinalGstock/press-room-377x250.jpg') }}"
                                                        alt="Spare Parts" title="Spare Parts">


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </li>





                    <li class="hasSubMenu">
                        @can('is-admin')
                            @if (App\Models\Products::first() != null)
                                <a
                                    href="{{ route('system.config.spare_and_conso.index', App\Models\Products::first()->value('name')) }}">
                                    {{ __('messages.consomables') }}
                                </a>
                            @else
                                <a href="#">
                                    {{ __('messages.consomables') }}
                                </a>
                            @endif
                        @endcan
                        @cannot('is-admin')
                            @if(Auth::user()->sites->first()->products->first() != null)
                                <a href="{{ route('system.rechange_and_conso.index', Auth::user()->sites->first()->products->first()['name']) }}">
                                    {{ __('messages.consomables') }}
                                </a>
                            @else
                                <a href="#">
                                    {{ __('messages.consomables') }}
                                </a>
                            @endif
                        @endcannot
                        <div class="subNav">
                            <div class="container">
                                <a href="" class="menuTitle">{{ __('messages.consomables') }}</a>
                                <div class="row noMargin">
                                    <div class="col-md-3">
                                        <div class="menuSubSection">
                                            <span>{{ __('messages.action') }}</span>
                                            @can('is-user')
                                                <ul>
                                                    @if (Auth::user()->sites->first()->products->first() != null)
                                                        <li>
                                                            <a
                                                                href="{{ route('system.rechange_and_conso_create') }}">{{ __('messages.add consomable') }}</a>
                                                        </li>


                                                        <li>
                                                            <a
                                                                href="{{ route('system.rechange_and_conso.index',Auth::user()->sites->first()->products->first()['name']) }}">{{ __('messages.consomables management') }}</a>
                                                        </li>
                                                    @else
                                                        {{ __('messages.you have no product') }}
                                                    @endif
                                                </ul>
                                            @endcan
                                            @can('is-admin')

                                                <ul>

                                                    @if (App\Models\Products::first() != null)
                                                        <li>
                                                            <a
                                                                href="{{ route('system.spare_and_conso_create') }}">{{ __('messages.add consomable') }}</a>
                                                        </li>

                                                        <li>
                                                            <a
                                                                href="{{ route('system.config.spare_and_conso.index', App\Models\Products::first()->value('name')) }}">{{ __('messages.consomables management') }}</a>
                                                        </li>
                                                    @else
                                                        {{ __('messages.you have no product') }}
                                                    @endif

                                                </ul>
                                            @endcan
                                            @can('is-viewer')
                                                <ul>
                                                    @isset($products[0]->name)
                                                        <li>
                                                            <a
                                                                href="{{ route('system.rechange_and_conso.index', $products[0]->name) }}">{{ __('messages.view consumable') }}</a>
                                                        </li>
                                                    @else
                                                        {{ __('messages.you have no product') }}
                                                    @endisset
                                                </ul>
                                            @endcan

                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="menuSubSection animated">
                                            <div class="menu-text-image">
                                                <div class="textBlock">
                                                    @cannot('is-viewer')
                                                        <p>{{ __('messages.consomable message') }} </p>
                                                    @endcannot

                                                </div>
                                                <div class="imagesBlock">
                                                    <img src="{{ asset('/FinalGstock/press-room-377x250.jpg') }}"
                                                        alt="Spare Parts" title="Spare Parts">


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </li>
                @endcan
               
                <li class="hasSubMenu ">
                    <a href="{{ url('/documentation') }}">
                        {{ __('messages.documentation') }}
                    </a>
                    <div class="subNav">
                        <div class="container">
                            <a href="{{ url('/documentation/watch') }}" class="menuTitle"> {{ __('messages.documentation') }}</a>

                            <div class="row noMargin">
                                <div class="col-md-3">
                                    <div class="menuSubSection">
                                        <span></span>
                                        <ul>
                                            <li><a href="{{ url('/documentation/download') }}" target=""> {{ __('messages.download user guid') }}</a>
                                            </li>
                                            <li><a href="{{ url('/documentation') }}" target=""> {{ __('messages.watch demo') }}</a></li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="menuSubSection animated">

                                        <div class="menu-text-image">
                                            <div class="textBlock">
                                                <p>{{ __('messages.documentation message') }}</p>
                                            </div>
                                            <div class="imagesBlock">
                                                <img src="{{ asset('/FinalGstock/plane-taking-off-377x252.jpg') }}"
                                                    alt="Documentation" title="Documentation">


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </li>
                <li class="hasSubMenu ">
                    <a href="{{ url('/about') }}">
                        {{ __('messages.about') }}
                    </a>
                    <div class="subNav">
                        <div class="container">
                            <a href="{{ url('/about') }}" class="menuTitle"> {{ __('messages.about') }}</a>

                            <div class="row noMargin">
                                <div class="col-md-3">
                                    <div class="menuSubSection">
                                        <span></span>
                                        <ul>
                                            <li><a href="{{ url('/about/development_team') }}" target="_top"> {{ __('messages.development team') }}</a>
                                            </li>
                                            <li><a href="{{ url('/about') }}" target="_top"> {{ __('messages.about gstock') }}</a></li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="menuSubSection animated">
                                        <div class="menu-text-image">
                                            <div class="textBlock">
                                                <p>{{ __('messages.about message') }} </p>
                                            </div>

                                            <div class="imagesBlock">
                                                <img src="{{ asset('/FinalGstock/airplane-377x252.jpg') }}"
                                                    alt="About" title="About">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            </ul>


        </nav>

        <div class="rightSection">

            @if (Route::has('login'))
                @auth
                    <a href="{{ route('user.profile') }}" class="headerBtn profilebtn blue"
                        title="profile">{{ __('messages.profile') }}</a>
                    <a href="#" class="headerBtn" title="logout"
                        onclick="document.getElementById('logout-form').submit();">{{ __('messages.logout') }}</a>

                    <form style="display: none" id="logout-form" action="{{ route('logout') }}" method="post">
                        @csrf
                    </form>
                @else
                    <a class="headerBtn blue" title="login"
                        href="{{ route('login') }}">{{ __('messages.login') }}</a>


                @endauth
            @endif
        </div>
        @auth
            <span class="tooltiptext">{{ __('messages.hello') }} {{ Auth::user()->name }}</span>
            <style>
                .tooltiptext {
                    width: fit-content;
                    background-color: #0095da;
                    color: #fff;
                    text-align: center;
                    border-radius: 0 0 6px 6px;
                    padding: 0px 6px;
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 50%;
                    margin-left: -60px;
                    font-size: 12px;
                    visibility: visible;
                }

            </style>
        @endauth
    </div>
</header>
