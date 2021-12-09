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
    <h2>{{ __('messages.consomables') }} (
        {{ $pieces[0]->product->name }}) </h2>

    <div style="overflow-x: auto;">
        <table style="width: 100%">

            <table>
                <tr>
                    <th>{{ __('messages.sites') }}</th>
                    <th>{{ __('messages.terminal') }}</th>
                    <th>{{ __('messages.ref piece') }}</th>
                    <th>{{ __('messages.quantity in stock') }}</th>
                    <th>{{ __('messages.supplier') }}</th>
                    <th>{{ __('messages.description') }}</th>
                    <th>{{ __('messages.serial part number') }}</th>

                </tr>
                @foreach ($pieces as $piece)
                    <tr>
                        <td>{{ $piece->site->signifi }}</td>
                        <td>{{ $piece->terminal->name }}</td>
                        <td>{{ $piece->piecelist->ref_piece }}</td>
                        <td>{{ $piece->stock }}</td>
                        <td>{{ $piece->piecelist->supplier }}</td>
                        <td>{{ $piece->piecelist->designation }}</td>
                        <td>{{ $piece->part_number }}</td>
                    </tr>
                @endforeach
            </table>
</body>

</html>
