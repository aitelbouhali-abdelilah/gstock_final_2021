<!DOCTYPE html>
<html>

<head>
    <style>
        .table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            text-align: left;
            padding: 8px;
        }

    </style>
</head>

<body>

    <div align="center" valign="top" style="background-color:white;width:100%;min-width:580px;padding:0px">

        <br>

        <img class="mb-4"
            src="{{env('APP_LOGO')}}"
            alt="" height="40" height="90">

        <br>

        @if ($type == 'piece')
            <h3 style="color: #098cce">Sita Stock system informs you that the stock of a Consumable is running out!</h3>
            <table style="border: 1px solid #ddd;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd;padding: 15px;">ID</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">{{ __('messages.ref piece') }}</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">{{ __('messages.description') }}</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">{{ __('messages.quantity in stock') }}</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">{{ __('messages.sites') }}</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">{{ __('messages.system type') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" style="border: 1px solid #ddd;padding: 15px;">{{ $data->id }}</th>
                        <td style="border: 1px solid #ddd;padding: 15px;">{{ $data->pieceList->ref_piece }}</td>
                        <td style="border: 1px solid #ddd;padding: 15px;">{{ $data->pieceList->designation }}</td>
                        <td style="border: 1px solid #ddd;padding: 15px;">{{ $data->stock }}</td>
                        <td style="border: 1px solid #ddd;padding: 15px;">{{ $data->site->signifi }}</td>
                        <td style="border: 1px solid #ddd;padding: 15px;">{{ App\Models\Products::find($data->id_product)->namee }}

                        </td>
                    </tr>
                </tbody>
            </table>

        @else
            <h3 style="color: #098cce">Sita Stock system informs you that the stock of an equipment is running out!</h3>
            <table style="border: 1px solid #ddd;">
                <tr>
                    <th style="border: 1px solid #ddd;padding: 15px;">ID</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Equipment Type</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Model</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Quantity in stock</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Site</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Description</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">System type</th>
                </tr>
                <tr>
                    @php
                    $related_model = App\Models\EquipementModel::find($data->model);
                    @endphp
                    <th scope="row" style="border: 1px solid #ddd;padding: 15px;">
                        {{ $data->id }}
                    </th>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $related_model->type->name }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $related_model->name }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ count($data->equipement_dts) }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $data->site->signifi }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $data->description }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ App\Models\Products::find($data->id_product)->name }}</td>
                </tr>
            </table>

        @endif
        <h4>
            Please check the website <a href="{{env('APP_URL')}}">{{env('APP_URL')}}</a>
        </h4>

        <p
            style="font-family:helvetica;font-size:11px;font-weight:100;color:#000000;text-align:center;padding-bottom:24px">
            This email was sent from an address that does not accept incoming emails.
            <br>
            Please do not reply to this message. If you have any questions, please contact us at <a
                href="{{env('MAIL_CONTACT')}}" target="_blank">{{env('MAIL_CONTACT')}}</a>
        </p>

    </div>

</body>
