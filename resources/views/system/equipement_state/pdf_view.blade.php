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

    </style>
</head>

<body>
    <h2>{{ __('messages.equipment details') }}
        ({{ $equipementsDt[0]->system_type }},
        {{ $equipementsDt[0]->equipement->site->signifi }})

    </h2>
    <div style="overflow-x: auto;">
        <table>
            <tr>
                @isset($equipementsDt[0]->equipement->status)
                    @if ($equipementsDt[0]->equipement->status == 'ONLINE')
                        <td>{{ __('messages.terminal') }}</td>
                        <td>{{ __('messages.zone') }}</td>
                        <td>{{ __('messages.airline') }}</td>
                        <td>{{ __('messages.counter') }}</td>
                    @endif
                @endisset
                <td>{{ __('messages.status') }}</td>
                <td>{{ __('messages.repairable') }}</td>
                <td>{{ __('messages.serial part number') }}</td>
                <td>{{ __('messages.asset tag') }}</td>
                <td>{{ __('messages.type') }}</td>
                <td>{{ __('messages.model') }}</td>
                <td>{{ __('messages.observation') }}</td>
            </tr>
            @foreach ($equipementsDt as $equipementDt)
                {{ $equipementDt->reparable }}
                <tr>
                    @isset($equipementsDt[0]->equipement->status)
                        @if ($equipementsDt[0]->equipement->status == 'ONLINE')
                            <td>
                                @isset($equipementDt->terminals->name)
                                    {{ $equipementDt->terminals->name }}
                                @endisset
                            </td>
                            <td>{{ $equipementDt->zone }} </td>
                            <td>{{ $equipementDt->airline }} </td>
                            <td>{{ $equipementDt->counter }} </td>

                        @endif
                    @endisset

                    <td>{{ $equipementDt->status }} </td>
                    <td>{{ $equipementDt->reparable }} </td>
                    <td>{{ $equipementDt->serial_part_number }} </td>
                    <td>{{ $equipementDt->asset_tag }} </td>
                    <td>{{ \App\Models\EquipementModel::find($equipementDt->equipement->model)->type->name }}</td>
                    <td>{{ \App\Models\EquipementModel::find($equipementDt->equipement->model)->name }}</td>
                    <td>{{ $equipementDt->observation }} </td>

                </tr>
            @endforeach
        </table>
</body>

</html>
