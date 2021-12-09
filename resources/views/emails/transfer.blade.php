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

        <h3 style="color: #098cce">You are receiving this email because we received a move request from {{$sender}} !</h3>
        
        @if ($type == 'equipement')
            <h3 style="color: #000000">You can <strong><a href="{{url('/equipement/move/accept/'.$data[0]['token'])}}" style="color:rgb(41, 224, 41)">Accept</a></strong> or <strong><a href="{{url('/equipement/move/refuse/'.$data[0]['token'])}}" style="color:rgb(224, 41, 41)">Refuse</a></strong></h3>
            <table style="border: 1px solid #ddd;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd;padding: 15px;">Product</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">Site</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">status</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">reparable</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">observation</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">serial_part_number</th>
                        <th style="border: 1px solid #ddd;padding: 15px;">asset_tag</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $dt)
                    @if ($equipementDt = App\Models\EquipementDt::find($dt['id_equipement_dts']))
                    @endif
                    <tr>
                        <td  style="border: 1px solid #ddd;padding: 15px;">{{ $equipementDt->system_type }}</td>
                        <th scope="row" style="border: 1px solid #ddd;padding: 15px;">
                            {{ App\Models\Site::find($dt['id_site'])->signifi }}
                        </th>
                        <td  style="border: 1px solid #ddd;padding: 15px;">{{ $equipementDt->status }}</td>
                        <td  style="border: 1px solid #ddd;padding: 15px;">{{ $equipementDt->reparable }}</td>
                        <td  style="border: 1px solid #ddd;padding: 15px;">{{ $equipementDt->observation }}</td>
                        <td  style="border: 1px solid #ddd;padding: 15px;">{{ $equipementDt->serial_part_number }}</td>
                        <td  style="border: 1px solid #ddd;padding: 15px;">{{ $equipementDt->asset_tag }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

        @else
            <h3 style="color: #000000">You can <strong><a href="{{url('/consumable/move/accept/'.$data['token'])}}" style="color:rgb(41, 224, 41)">Accept</a></strong> or <strong><a href="{{url('/consumable/move/refuse/'.$data['token'])}}" style="color:rgb(224, 41, 41)">Refuse</a></strong></h3>
            @if ($consumable = App\Models\Piece::find($data['id_consumable']))
            @endif
            <table style="border: 1px solid #ddd;">
                <tr>
                    <th style="border: 1px solid #ddd;padding: 15px;">Product</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Site</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Reference</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Quantity</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Serial/Part Number</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Description</th>
                    <th style="border: 1px solid #ddd;padding: 15px;">Supplier</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $consumable->system_type }}</td>
                    <th scope="row" style="border: 1px solid #ddd;padding: 15px;">
                        {{ App\Models\Site::find($data['id_site'])->signifi }}
                    </th>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $consumable->pieceList->ref_piece }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $data['quantity'] }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $consumable->part_number }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $consumable->pieceList->designation }}</td>
                    <td style="border: 1px solid #ddd;padding: 15px;">{{ $consumable->pieceList->supplier }}</td>
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
