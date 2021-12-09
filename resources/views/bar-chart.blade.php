@extends('system.templates.main')
@section('content')


    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"
                integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"
                integrity="sha512-vBmx0N/uQOXznm/Nbkp7h0P1RfLSj0HQrFSzV8m7rOGyj30fYAOKHYvCNez+yM8IrfnW0TCodDEjRqf6fodf/Q=="
                crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </head>

    <body>
        <div class="chart-container bg-light p-2 text-dark bg-opacity-75">
            <div class="row">
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($system_type != null)
                                <option selected hidden value="{{ $system_type }}">
                                    {{ Str::upper($system_type) }}</option>

                            @else
                                <option selected hidden value=""> {{ __('messages.products') }}</option>
                            @endif
                            @foreach (Auth::user()->products() as $product)
                                @if ($system_type == $product->name)
                                    <option class="nav-item" value="{{ route('barChart', ['system_type' => $product->name]) }}">
                                        <a class="nav-link"
                                            href="{{ route('barChart', ['system_type' => $product->name]) }}">{{ Str::upper($product->name) }}</a>
                                    </option>
                                @else

                                    <option class="nav-item" value="{{ route('barChart', ['system_type' => $product->name]) }}">
                                        <a class="nav-link"
                                            href="{{ route('barChart', ['system_type' => $product->name]) }}">{{ Str::upper($product->name) }}</a>
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($yearstart != null)
                                <option class="nav-item" value="" hidden>
                                    <a class="nav-link"
                                        href="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }} }}">{{ $yearstart }}</a>
                                </option>
                            @endif
                            <option class="nav-item" value="" hidden>
                                <a class="nav-link" href="">{{ __('messages.year') }}</a>
                            </option>
                            
                        @foreach($yearnames as $name)
                            <option class="nav-item"
                                value="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $name->year_name]) }}">
                                <a class="nav-link"
                                    href="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $name->year_name]) }} }}">{{$name->year_name}}</a>
                            </option>
                        @endforeach
                           
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($interval != null)
                                <option class="nav-item" value="" hidden>
                                    <a class="nav-link"
                                        href="{{ route('barChart', ['system_type' => $system_type, $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }} }}">{{ $interval }}</a>
                                </option>
                            @endif
                            <option class="nav-item" value="" hidden>
                                <a class="nav-link" href="">{{ __('messages.interval') }}</a>
                            </option>

                            <option class="nav-item"
                                value="{{ route('barChart', ['system_type' => $system_type, 'interval' => 'MONTH', 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                <a class="nav-link"
                                    href="{{ route('barChart', ['system_type' => $system_type, 'interval' => 'MONTH', 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }} }}">MONTH</a>
                            </option>
                            <option class="nav-item"
                                value="{{ route('barChart', ['system_type' => $system_type, 'interval' => 'QUARTER', 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                <a class="nav-link"
                                    href="{{ route('barChart', ['system_type' => $system_type, 'interval' => 'QUARTER', 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }} }}">QUARTER</a>
                            </option>
                            <option class="nav-item"
                                value="{{ route('barChart', ['system_type' => $system_type, 'interval' => 'YEAR', 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                <a class="nav-link"
                                    href="{{ route('barChart', ['system_type' => $system_type, 'interval' => 'YEAR', 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }} }}">YEAR</a>
                            </option>

                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($id_site != null && Auth::user()->sites->where('id', '=', $id_site) != null)
                                <option selected hidden value="{{ $ref }}">
                                    {{ App\Models\site::find($id_site)->signifi }}
                                </option>

                            @else
                                <option selected hidden value=""> {{ __('messages.sites') }}</option>
                            @endif
                            @foreach (Auth::user()->sites as $site)

                                <option class="nav-item"
                                    value="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $site->id, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                    <a class="nav-link"
                                        href="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $site->id, 'ref' => $ref, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                        {{ $site->signifi }} </a>

                                </option>

                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($ref != null && App\Models\PieceList::find($ref) != null)
                                <option selected hidden value="">
                                    {{ App\Models\PieceList::find($ref)->ref_piece }}
                                </option>

                            @else
                                <option selected hidden value=""> {{ __('messages.ref piece') }}</option>
                            @endif
                            @foreach (App\Models\PieceList::all() as $refConsumable)

                                <option class="nav-item"
                                    value="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $refConsumable->id, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                    <a class="nav-link"
                                        href="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $refConsumable->id, 'model' => $model, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                        {{ $refConsumable->ref_piece }} </a>
                                </option>

                            @endforeach
                        </select>
                    </div>
                </div>

                {{--  --}}
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($model != null && App\Models\EquipementModel::find($model) != null)
                                <option selected hidden value="">
                                    {{ App\Models\EquipementModel::find($model)->model }}
                                </option>
                            @else
                                <option selected hidden value=""> {{ __('messages.model') }}</option>
                            @endif
                            @foreach (App\Models\EquipementModel::all() as $eqpt_model)
                                @if ($model == $eqpt_model->id)

                                @else

                                    <option class="nav-item"
                                        value="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $eqpt_model->id, 'type' => $type, 'yearstart' => $yearstart]) }}">
                                        <a class="nav-link"
                                            href="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $eqpt_model->id, 'type' => $type, 'yearstart' => $yearstart]) }}">{{ $eqpt_model->model }}
                                        </a>
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>

                {{--  --}}
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <select name="forma" onchange="location = this.value;" class="form-select">
                            @if ($type != null && App\Models\EquipementType::find($type) != null)
                                <option selected hidden value="">
                                    {{ App\Models\EquipementType::find($type)->type }}
                                </option>
                            @else
                                <option selected hidden value=""> {{ __('messages.type') }}</option>
                            @endif
                            @foreach (App\Models\EquipementType::all() as $eqpt_type)
                                @if ($type == $eqpt_type->id)

                                @else

                                    <option class="nav-item"
                                        value="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $eqpt_type->id, 'yearstart' => $yearstart]) }}">
                                        <a class="nav-link"
                                            href="{{ route('barChart', ['system_type' => $system_type, 'interval' => $interval, 'id_site' => $id_site, 'ref' => $ref, 'model' => $model, 'type' => $eqpt_type->id, 'yearstart' => $yearstart]) }}">{{ $eqpt_type->type }}
                                        </a>
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>

            </div>


            <div class="row">
                {{--  --}}

                <div class="col">
                    <div class="bar-chart-container">
                        <canvas id="chart_data_equipment"></canvas>
                    </div>
                </div>
                <div class="col">
                    <div class="bar-chart-container">
                        <canvas id="chart_data_OK_NOK"></canvas>
                    </div>
                </div>

            </div>
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bar-chart-container">
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>
            </div>





        </div>

        <!-- javascript -->

        <script>
            $(function() {


                //////////////consomable
                var cData = JSON.parse(`<?php echo $data_consumable; ?>`);
                var labs = JSON.parse(`<?php echo $labels; ?>`);
                var ctxbar = $("#bar-chart");
                const chart = new Chart(ctxbar, {
                    type: 'bar',
                    data: {
                        labels: labs,
                        datasets: [{
                            label: 'Comsumable Stock Quantity',
                            data: cData,
                            backgroundColor: 'rgb(54, 162, 235)',
                            fill: false,
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Comsumable Quantity'
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                display: true,
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                //////equipment number

                var cData = JSON.parse(`<?php echo $data_equipement; ?>`);
                var ctxbar = $("#chart_data_equipment");
                const chart2 = new Chart(ctxbar, {
                    type: 'bar',

                    data: {
                        labels: labs,
                        datasets: [{
                            label: 'Equipment quantity',
                            data: cData,
                            backgroundColor: 'rgb(54, 162, 235)',
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Equipment quantity'
                        },
                        scales: {
                            xAxes: [{

                                gridLines: {
                                    display: false,
                                },
                                display: true,

                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                ////////////// OK/NOK status

                var cData2 = JSON.parse(`<?php echo $data_equipement_status_ok; ?>`);
                var cDataNOK = JSON.parse(`<?php echo $data_equipement_status_nok; ?>`);
                var ctxbar = $("#chart_data_OK_NOK");
                const chart3 = new Chart(ctxbar, {
                    type: 'bar',
                    data: {
                        labels: labs,
                        datasets: [{
                            label: ['Status OK'],
                            backgroundColor: 'rgb(75, 192, 192)',
                            data: cData2,

                        }, {
                            label: ['Status NOK'],
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: cDataNOK,
                            //[
                            // 'rgb(255, 99, 132)',
                            //'rgb(75, 192, 192)',
                            //'rgb(255, 205, 86)',
                            //'rgb(201, 203, 207)',
                            //'rgb(54, 162, 235)'
                            // ],
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Equipment Status'
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                display: true,
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

            });
        </script>
       
    </body>
    <script src="{{ asset('js/chart.js') }}"></script>

@endsection
