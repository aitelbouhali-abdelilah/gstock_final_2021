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
        {{ $piece->part_number }} )
        ,{{ __('messages.sites') }} ({{ $piece->site->signifi }})
    </h4>
    <div style="overflow-x: auto;">

        <table>
            <tr>
                <th> {{ __('messages.history') }} </th>
            </tr>
            <tr>
                <td> Created at :{{ $piece->created_at }}</td>
            </tr>
            @foreach ($piece_history as $history)
                <tr>
                    <td> {{ $history->messages }}</td>
                </tr>
            @endforeach
        </table>
</body>

</html>
