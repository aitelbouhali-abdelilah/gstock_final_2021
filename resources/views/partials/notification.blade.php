@if (session('notification'))
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
    </svg>

    @foreach (session('notification')['pieces'] as $piece)
        <div class="alert alert-warning d-flex align-items-center mx-auto" style="width: fit-content;" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
                <strong><span class="text-danger">{{ $piece->system_type }}</span></strong> :
                [{{ __('messages.consomables') }}] <span class="text-danger">Part Number</span> <span
                    class="text-primary">{{ $piece->part_number }}</span>
                {{ __('messages.is running out of stock') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onclick="closeNotification('piece','{{ $piece->id }}')"></button>
            </div>
        </div>
    @endforeach
    @foreach (session('notification')['equipements'] as $equipement)
        <div class="alert alert-warning d-flex align-items-center mx-auto" style="width: fit-content;" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
                @php
                    $related_model = App\Models\EquipementModel::find($equipement->model);
                @endphp
                <strong><span class="text-danger">{{ App\Models\Products::find($equipement->id_product)->name }}</span></strong> :
                [{{ __('messages.equipments') }}]
                <span class="text-danger">{{ __('messages.type') }}</span> <span
                    class="text-primary">{{ $related_model->type->name }}</span>
                <span class="text-danger">{{ __('messages.model') }}</span> <span
                    class="text-primary">{{ $related_model->name }}</span>
                {{ __('messages.is running out of stock') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onclick="closeNotification('equipement','{{ $equipement->id }}')"></button>
            </div>
        </div>
    @endforeach

    <script src="{{ asset('js/close_notification.js') }}"></script>

@endif

@if (session('transfer_confirm_equipement'))
    @foreach (session('transfer_confirm_equipement')['equipement_dts'] as $data)
        <div class="alert alert-warning d-flex align-items-center mx-auto" style="width: fit-content;" role="alert">
                <div>
                <strong>
                <span class="text-success ps-2">[{{ \app\Models\User::find($data[0]->sender_id)->name }}]</span>
                </strong>
                <span class="text-primary">{{ __('messages.send') }}</span>
                <strong>
                <span class="text-success">[{{ count(session('transfer_confirm_equipement')['equipement_dts'][$data[0]->token]) }}]</span>
                </strong>
                <span class="text-primary">{{ __('messages.equipement') }}</span>
                <span class="text-danger"> - {{ __('messages.type') }}</span>
                @php
                    $equipement = App\Models\Equipement::find($data[0]->equipement_id)
                @endphp

                @php
                    $related_model = App\Models\EquipementModel::find($equipement->model);
                @endphp
                <strong>
                    <span class="text-primary">[{{ $related_model->type->name }}]</span>
                </strong>
                <span class="text-danger">{{ __('messages.model') }}</span>
                <strong>
                    <span class="text-primary">[{{ $related_model->name }}]</span>
                </strong>
                <a href="{{route('system.equipement_state.moveAccept',['token'=>$data[0]->token])}}" class="btn btn-outline-success float-end mx-1">Accept</a>
                <a href="{{route('system.equipement_state.moveRefuse',['token'=>$data[0]->token])}}" class="btn btn-outline-danger float-end">Refuse</a>
                <br>

                <table class="table table-borderless">
                <thead>
                    <tr class="text-secondary">
                        <th>{{ __('messages.product') }}</th>
                        <th>{{ __('messages.sites') }}</th>
                        <th>{{ __('messages.state') }}</th>
                        <th>{{ __('messages.repairable') }}</th>
                        <th>{{ __('messages.observation') }}</th>
                        <th>{{ __('messages.serial part number') }}</th>
                        <th>{{ __('messages.asset tag') }}</th>
                    </tr>
                </thead>
                  <tbody>
                    @foreach ($data as $dt_pendding_transfer)
                    @if ($equipementDt = App\Models\EquipementDt::find($dt_pendding_transfer->id_equipement_dts))
                    @endif
                    <tr>
                        <td class="text-dark">{{ $equipementDt->system_type }}</td>
                        <td class="text-dark">
                            {{ App\Models\Site::find($data[0]->id_site)->signifi }}
                        </td>
                        <td class="text-dark">{{ $equipementDt->status }}</td>
                        <td class="text-dark">{{ $equipementDt->reparable }}</td>
                        <td class="text-dark">{{ $equipementDt->observation }}</td>
                        <td class="text-dark">{{ $equipementDt->serial_part_number }}</td>
                        <td class="text-dark">{{ $equipementDt->asset_tag }}</td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endforeach
@endif

@if (session('transfer_confirm_consumable'))
    @foreach (session('transfer_confirm_consumable')['consumable'] as $data)
        <div class="alert alert-warning d-flex align-items-center mx-auto" style="width: fit-content;" role="alert">
            <div>
                <strong>
    
                <span class="text-success ps-2">[{{ \app\Models\User::find($data->sender_id)->name }}]</span>
                </strong>
                <span class="text-primary">{{ __('messages.send') }}</span>
                <strong>
                <span class="text-success">[{{ $data->quantity   }}]</span>
                </strong>

                <span class="text-primary">{{ __('messages.consumable') }}</span>
                <a href="{{route('system.consumable.moveAccept',['move_id'=>$data->id])}}" class="btn btn-outline-success float-end mx-1">Accept</a>
                <a href="{{route('system.consumable.moveRefuse',['move_id'=>$data->id])}}" class="btn btn-outline-danger float-end">Refuse</a>
                <br>
                <table class="table table-borderless">
                <thead>
                    <tr class="text-secondary">
                        <th>{{ __('messages.product') }}</th>
                        <th>{{ __('messages.sites') }}</th>
                        <th>{{ __('messages.ref piece') }}</th>
                        <th>{{ __('messages.quantity in stock') }}</th>
                        <th>{{ __('messages.serial part number') }}</th>
                        <th>{{ __('messages.description') }}</th>
                        <th>{{ __('messages.supplier') }}</th>
                    </tr>
                </thead>
                  <tbody>
                    @if ($consumable = App\Models\Piece::find($data->id_consumable))
                    @endif

                    <tr>
                        <td class="text-dark">{{ $consumable->system_type }}</td>
                        <td class="text-dark">
                            {{ App\Models\Site::find($data->id_site)->signifi }}
                        </td>
                        <td class="text-dark">{{ $consumable->pieceList->ref_piece }}</td>
                        <td class="text-dark">{{ $data->quantity }}</td>
                        <td class="text-dark">{{ $consumable->part_number }}</td>
                        <td class="text-dark">{{ $consumable->pieceList->designation }}</td>
                        <script>
                            $(".top").tooltip({
                            placement: "top"
                            });
                        </script>
                        <td class="text-dark">
                            <span class="top" title="{{ $consumable->pieceList->supplier }}">{{ strlen($consumable->pieceList->supplier) > 7 ? substr($consumable->pieceList->supplier,0,7)."..." : $consumable->pieceList->supplier }}</span>      
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    @endforeach
@endif