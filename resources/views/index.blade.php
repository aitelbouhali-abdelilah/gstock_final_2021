@extends('templates.main')
@section('content')

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <style>
        .alert {
            display: none !important;
            visibility: hidden !important;
        }

        body {
            background-image: url({{ asset('/FinalGstock/leaf-background-home-banner-1920x1280.jpg') }}) !important;
        }

        .contentHolder {
            max-width: 50%;
            padding: 20px 20px;
            margin-top: 170px;
            z-index: 10;
        }

        .contentHolder p {
            color: #fff;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .contentHolder h1 {
            font-size: 60px;
            color: #fff;
            line-height: 60px;
            margin-bottom: 30px;
        }

        .contentHolder .btn {
            min-width: 200px;
            display: inline-block;
            background-color: #0095da;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            line-height: 20px;
            border-radius: 38.5px;
            padding: 12px 25px 13px;
            padding-right: 55px;
            position: relative;
        }

        .contentHolder .btn:hover {
            background-color: #0071bb;
        }

        .contentHolder .btn:after {
            content: '';
            background-image: url({{ asset('/FinalGstock/right-arrow-white.svg') }});
            height: 13px;
            width: 15px;
            background-size: 15px;
            background-repeat: no-repeat;
            position: absolute;
            right: 17px;
            top: 17px;
        }

        main {
            height: 100%;
            background: linear-gradient(90deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .3) 100%);
            max-width: 100% !important;
            position: relative;
            overflow-x: hidden;
            overflow-y: hidden;
        }

        @keyframes rotate {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(1turn);
                transform: rotate(1turn);
            }
        }

        .images .rightBigBubble {
            position: absolute;
            top: 210px;
            right: -128px;
            z-index: 1;
            animation: rotate infinite 15s;
        }

        .images .rightSmallBubble {
            position: absolute;
            animation: rotate infinite 10s;
            top: 470px;
            right: 11px;
            z-index: 1;
        }

        .images .leftBigBubble {
            position: absolute;
            top: 358px;
            left: -82px;
            animation: rotate infinite 15s;
            z-index: 1;
        }

        .images .leftSmallBubble {
            position: absolute;
            top: 516px;
            left: 45px;
            position: absolute;
            animation: rotate infinite 10s;
            z-index: 1;
        }

        section.container {
            overflow-y: hidden;
            box-sizing: border-box;
            overflow-x: hidden;
            position: relative;
            height: 100%;
        }

        @media all and (max-width:990px) {
            .contentHolder {
                max-width: 100%;
                margin-top: 100px;
            }
        }

    </style>
    <section class="container">

        @if (Auth::guest())
            <div class="contentHolder">
                <h1>
                    {{ __('messages.welcome sentece') }}
                </h1>
                <p>{{ __('messages.welcome sub sentece') }}</p>
                <p><a class="btn btn-lg btn-primary" href="{{ route('login') }}">{{ __('messages.discover gstock') }}</a>
                </p>
            </div>
        @else
            @can('is-admin')
                <div class="contentHolder">
                    <h1>
                        {{ __('messages.welcome sentece') }}
                    </h1>
                    <p>{{ __('messages.welcome sub sentece') }}</p>
                    <p><a class="btn btn-lg btn-primary" href="{{ route('login') }}">{{ __('messages.discover gstock') }}</a>
                    </p>
                </div>
            @endcan
        @endif

        @can('user-or-viewer')
            {{--  --}}
            <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>

            <input type="hidden" id="langage" value="{{ __('messages.langage') }}">
            <input type="hidden" id="chart_title1" value="{{ __('messages.equipement quantity') }}">
            <input type="hidden" id="chart_title2" value="{{ __('messages.equipement status') }}">
            <input type="hidden" id="chart_title3" value="{{ __('messages.consumable quantity') }}">
            
            <div class="chart-container bg-light mt-2 text-dark bg-opacity-75 rounded">
                <div class="col d-flex justify-content-center">
                    <button class="btn btn-primary d-flex" style='font-size: 18px;' id="printBtn" onclick="takeshot()">
                        <i class="material-icons">print</i>&nbsp;&nbsp;{{ __('messages.print') }}
                    </button>
                    <script type="text/javascript">
                        /*async function takeshot() {
                                                                                                                                                                    let ph1;
                                                                                                                                                                    let ph2;
                                                                                                                                                                    await new Promise(function(resolve) { html2canvas(document.getElementById("photo")).then(
                                                                                                                                                                        function (canvas) {
                                                                                                                                                                            ph1 = canvas.toDataURL("image/jpeg",1);
                                                                                                                                                                            resolve();
                                                                                                                                                                        });
                                                                                                                                                                    });
                                                                                                                                                                    await new Promise(function(resolve) { html2canvas(document.getElementById("photo2")).then(
                                                                                                                                                                        function (canvas) {
                                                                                                                                                                            ph2 = canvas.toDataURL("image/jpeg",1);
                                                                                                                                                                            resolve();
                                                                                                                                                                        });
                                                                                                                                                                    });
                                                                                                                                                                    const pdf = new jsPDF();

                                                                                                                                                                        //pdf.addImage(img,"jpeg",22,2,162 , 292);
                                                                                                                                                                        pdf.addImage(ph1,"jpeg",0,0,210 , 292);
                                                                                                                                                                        pdf.addPage('a4', 'portrait');
                                                                                                                                                                        pdf.addImage(ph2,"jpeg",0,0,210 , 292);
                                                                                                                                                                        pdf.save("chart.pdf");
                                                                                                                                                                }*/
                        function takeshot() {

                            html2canvas(document.getElementById("photo")).then(
                                function(canvas) {

                                    const img = canvas.toDataURL("image/jpeg", 1);
                                    const pdf = new jsPDF();

                                    //pdf.addImage(img,"jpeg",22,2,162 , 292);
                                    pdf.addImage(img, "jpeg", 0, 0, 210, 292);
                                    pdf.save("chart.pdf");

                                })

                        }
                    </script>

                </div>

                <div class="col-12 mx-auto d-flex justify-content-evenly">
                    <style>
                        .chart-search-form {
                            min-width: 215px;
                            max-width: 215px;
                            margin-top: 15px;
                            height: auto;
                            background-color: white;
                            padding: 15px;
                            border: 1px solid gray;
                            border-radius: 25px;
                            color: #0095da;
                        }

                        .chart-search-form button {
                            background-color: #0095da;
                            margin-top: 10px;
                            border-radius: 10px;
                        }

                    </style>
                    <div class="chart-search-form">
                        <form id="equipement_form">
                            <h4 class="card-title">{{ __('messages.equipements') }}</h4>
                            <select id="interval1" name="interval" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.interval') }}</option>
                                <option value="1">{{ __('messages.month') }}</option>
                                <option value="2">{{ __('messages.quarter') }}</option>
                                <option value="3">{{ __('messages.year') }}</option>
                            </select>
                            <input type="text" class="form-control form-control-sm datepicker" id="year1" name="year"
                                placeholder="{{ __('messages.year') }}">
                            <input type="text" class="form-control form-control-sm datepicker" style="display:none" id="from1"
                                name="from" placeholder="{{ __('messages.from') }} ....">
                            <input type="text" class="form-control form-control-sm datepicker" style="display:none" id="to1"
                                name="to" placeholder="{{ __('messages.to') }} ....">
                            <select name="product" id="product1" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.products') }}</option>
                                @foreach (App\Models\Products::first()->getRelatedProducts() as $product)
                                    <option value="{{ $product->id }}">{{ $product->name }}</option>
                                @endforeach
                            </select>
                            <select name="site[]" id="site1" class="form-select" multiple
                                aria-label="multiple select example">
                            </select>
                            <select name="type" id="type" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.type') }}</option>
                            </select>
                            <select name="model" id="model" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.model') }}</option>
                            </select>
                            <button type="button" onclick="equipementChartSearch()"
                                class="btn btn-primary float-end">{{ __('messages.search') }}</button>
                        </form>
                    </div>
                    <div class="chart-search-form">
                        <form id="consumable_form">
                            <h4>{{ __('messages.consomables') }}</h4>
                            <select id="interval2" name="interval" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.interval') }}</option>
                                <option value="1">{{ __('messages.month') }}</option>
                                <option value="2">{{ __('messages.quarter') }}</option>
                                <option value="3">{{ __('messages.year') }}</option>
                            </select>
                            <input type="text" class="form-control form-control-sm datepicker" id="year2" name="year"
                                placeholder="{{ __('messages.year') }}">
                            <input type="text" class="form-control form-control-sm datepicker" style="display:none" id="from2"
                                name="from" placeholder="{{ __('messages.from') }} ....">
                            <input type="text" class="form-control form-control-sm datepicker" style="display:none" id="to2"
                                name="to" placeholder="{{ __('messages.to') }} ....">
                            <select name="product" id="product2" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.products') }}</option>
                                @foreach (App\Models\Products::first()->getRelatedProducts() as $product)
                                    <option value="{{ $product->id }}">{{ $product->name }}</option>
                                @endforeach
                            </select>
                            <select name="site[]" id="site2" class="form-select" multiple
                                aria-label="multiple select example">
                            </select>
                            <select name="reference" id="reference" class="form-select form-select-sm"
                                aria-label=".form-select-sm example">
                                <option hidden selected value="">{{ __('messages.ref piece') }}</option>
                            </select>
                            <button type="button" style='margin-top: 41px;' onclick="consumableChartSearch()"
                                class="btn btn-primary float-end">{{ __('messages.search') }}</button>
                        </form>
                    </div>
                </div>
                <br>
                <div id="photo">
                    <div class="col-12 mx-auto d-flex justify-content-evenly">
                        <div class="col-12">
                            <div class="bar-chart-container">
                                <canvas id="chart_data_equipment"></canvas>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row mx-auto d-flex justify-content-evenly">
                        <div class="col-12">
                            <div class="bar-chart-container">
                                <canvas id="chart_data_OK_NOK"></canvas>
                            </div>
                        </div>
                    </div>
                    <br>
                    <!--
                                                                    </div>
                                                                    <div id="photo2">
                                                                    -->
                    <div class="row mx-auto d-flex justify-content-evenly">

                        <div class="pie-chart col-lg-4 col-sm-12">
                            <style>
                                .pie-chart ul {
                                    background-color: white;
                                    border-radius: 5px;
                                    margin: 10px;
                                    width: fit-content;
                                    height: max-content;
                                }

                                .pie-chart ul li {
                                    padding: 8px;
                                    font-weight: bold;
                                    font-size: 16px;
                                    color: black;
                                }

                                .pie-chart ul li.hidden {
                                    text-decoration: line-through;
                                    filter: grayscale(1);
                                    opacity: 0.2;
                                }

                                .pie-chart ul li span {
                                    font-size: 15px;
                                    padding: 0px 20px;
                                    margin-right: 4px;
                                    border: white 3px solid;
                                }

                            </style>
                            <div id="legend" class="d-flex"></div>

                        </div>
                        <div class="col-lg-7 col-sm-12">
                            <div class="bar-chart-container">
                                <canvas id="chart_doughnut"></canvas>
                            </div>
                        </div>


                    </div>
                    <br>
                    <div class="col-12 mx-auto d-flex justify-content-evenly">

                        <div class="col-12">
                            <div class="bar-chart-container">
                                <canvas id="bar-chart"></canvas>
                            </div>
                        </div>


                    </div>
                    <br>
                </div>
                <!-- CHART SCRIPT -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js"></script>
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.css">
                <script src="{{ asset('/js/chart.js') }}"></script>
            </div>





        @endcan

    </section>
    <section class="images">

        <img src="{{ asset('/FinalGstock/right-bubble.png') }}" alt="Satelite" class="rightBigBubble">
        <img src="{{ asset('/FinalGstock/small-right-bubble.png') }}" alt="Satelite" class="rightSmallBubble">
        <img src="{{ asset('/FinalGstock/left-bubble.png') }}" alt="Satelite" class="leftBigBubble">
        <img src="{{ asset('/FinalGstock/small-left-bubble.png') }}" alt="Satelite" class="leftSmallBubble">

    </section>
@endsection
