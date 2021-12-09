<!DOCTYPE html>
<html>

<head>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .head_title {
            text-align: center;
        }

    </style>
</head>

<body>
    <h4 class="head_title">{{ __('messages.history') }} <br>
        {{ __('messages.serial part number') }} (
        {{ $equipement_dt->serial_part_number }} )
        ,{{ __('messages.asset tag') }} ({{ $equipement_dt->asset_tag }})
        ,{{ __('messages.model') }}
        ({{ \App\Models\EquipementModel::find($equipement_dt->equipement->model)->name }})
        ,{{ __('messages.type') }}
        ({{ \App\Models\EquipementModel::find($equipement_dt->equipement->model)->type->name }})
        ,{{ __('messages.sites') }} ({{ $equipement_dt->equipement->site->signifi }})
    </h4>
    <div style="overflow-x: auto;">

        <table>
            <tr>
                <th> {{ __('messages.history') }} </th>
            </tr>
            <tr>
                <td> Created at :{{ $equipement_dt->created_at }}</td>
            </tr>
            @foreach ($equipement_history as $history)
                <tr>
                    <td> {{ $history->messages }}</td>
                </tr>
            @endforeach
        </table>
</body>

</html>
