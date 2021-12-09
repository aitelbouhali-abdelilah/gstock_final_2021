<!DOCTYPE html>
<html>

<head>
    <style>
        table {
            border-collapse: collapse;
            min-width: 100%;
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
    <h2>{{ __('messages.equipements') }} (
        {{ $equipements[0]->product->name }})</h2>

    <div style="overflow-x: auto;">
        <table>

            <table>
                <tr>
                    <th>{{ __('messages.sites') }}</th>
                    <th>{{ __('messages.type') }}</th>
                    <th>{{ __('messages.model') }}</th>
                    <th>{{ __('messages.status') }}</th>
                    <th>{{ __('messages.quantity in stock') }}</th>
                    <th>{{ __('messages.description') }}</th>
                </tr>
                @foreach ($equipements as $equipement)
                    <tr>
                        <td>{{ $equipement->site->signifi }}</td>
                        <td>{{ \App\Models\EquipementModel::find($equipement->model)->type->name }}</td>
                        <td>{{ \App\Models\EquipementModel::find($equipement->model)->name }}</td>
                        <td>{{ $equipement->status }}</td>
                        <td>{{ count($equipement->equipement_dts) }}</td>
                        <td>{{ $equipement->description }}</td>
                    </tr>
                @endforeach
            </table>
</body>

</html>
