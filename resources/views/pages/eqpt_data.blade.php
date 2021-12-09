    @isset($equipement_dts)
        <div class="container">
            <div class="table-responsive">
                <table class="table table-bordered @can('is-user') table-hover @endcan" id="table_dts{{ $equipement_dts[0]->id_equipement }}">
                    <tr>
                        <th style="display: none"></th>
                        @isset($equipement_dts[0]->equipement->status)
                            @if ($equipement_dts[0]->equipement->status == 'ONLINE')
                                <th>{{ __('messages.terminal') }}</th>
                                <th>{{ __('messages.zone') }}</th>
                                <th>{{ __('messages.airline') }}</th>
                                <th>{{ __('messages.counter') }}</th>
                            @endif
                        @endisset
                        <th>{{ __('messages.state') }}</th>
                        <th>{{ __('messages.repairable') }}</th>
                        <th>{{ __('messages.serial part number') }}</th>
                        <th>{{ __('messages.asset tag') }}</th>
                        <th>{{ __('messages.observation') }}</th>
                        @can('is-user')
                            <th>{{ __('messages.action') }}</th>
                        @endcan
                    </tr>
                    @foreach ($equipement_dts as $equipementstate)
                        <tr class="@can('is-user') clickable-row @endcan">
                            @can('is-user')
                            <td style="display: none">
                                <div class="form-check">
                                    <input hidden class="form-check-input"
                                        name="dts{{ $equipementstate->id_equipement }}" type="checkbox"
                                        value="{{ $equipementstate->id }}" id="flexCheckDefault">
                                </div>
                            </td>
                            @endcan
                            @isset($equipementstate->equipement->status)
                                @if ($equipement_dts[0]->equipement->status == 'ONLINE')
                                    <td>
                                        @isset($equipementstate->terminals)
                                            {{ $equipementstate->terminals->name }}
                                        @endisset
                                    </td>
                                    <td>{{ $equipementstate->zone }}</td>
                                    <td>{{ $equipementstate->airline }}</td>
                                    <td>{{ $equipementstate->counter }}</td>
                                @endif
                            @endisset
                            <td>{{ $equipementstate->status }}</td>
                            <td>
                                @if ($equipementstate->status == 'NOK')
                                    @if (in_array($equipementstate->reparable, ['YES', 'OUI']))
                                        {{ __('messages.YES') }}
                                    @else
                                        {{ __('messages.NO') }}
                                    @endif
                                @endif
                            </td>
                            <td>{{ $equipementstate->serial_part_number }}</td>
                            <td>{{ $equipementstate->asset_tag }}</td>
                            <td>{{ $equipementstate->observation }}</td>
                            @can('is-user')
                            <td>
                                <a href="{{ route('system.equipement_state.edit', [$equipementstate->system_type, $equipementstate->id]) }}"
                                    class="edit" title="Edit" data-toggle="tooltip"><i
                                        class="material-icons">&#xE254;</i></a>


                                <a href="#" class="delete" title="Delete" data-bs-dismiss="modal"
                                    data-bs-toggle="modal" data-bs-target="#delete-equipementstate-modal"
                                    onclick="deleteEquipementState({{ $equipementstate->id_equipement }},{{ $equipementstate->id }})"><i
                                        class="material-icons">&#xE872;</i></a>
                            
                                <a href="#" class="history" title="history" data-bs-dismiss="modal"
                                    data-bs-toggle="modal" data-bs-target="#history-equipementstate-modal"
                                    onclick="historyEquipementState({{ \App\Models\EquipementDt::find($equipementstate->id)->equipmentDtHistory->pluck('messages') }},{{ $equipementstate->id_equipement }},{{ $equipementstate->id }},{{ \App\Models\EquipementDt::find($equipementstate->id) }})">
                                    <i class="material-icons">&#xe889;</i>
                                </a>
                            </td>
                            @endcan
                        </tr>
                    @endforeach
                </table>
            </div>
            <div class="d-flex justify-content-center" id="button{{ $equipement_dts[0]->id_equipement }}">
                {!! $equipement_dts->links() !!}
            </div>
        </div>

        @can('is-user')

        <script>
            $(function() {
                if(document.selectedRows['<?php echo $equipement_dts[0]->id_equipement; ?>'] == null) 
                document.selectedRows['<?php echo $equipement_dts[0]->id_equipement; ?>']=[];
                $("#table_dts<?php echo $equipement_dts[0]->id_equipement; ?> .clickable-row").click(function() {
                if (event.target.type !== 'checkbox') {
                    $(':checkbox', this).trigger('click');
                    $(this).toggleClass('hover');
                    var thisValue = $(':checkbox', this).val();
                    var index = document.selectedRows['<?php echo $equipement_dts[0]->id_equipement; ?>'].indexOf(thisValue);
                    if (index > -1) 
                        document.selectedRows['<?php echo $equipement_dts[0]->id_equipement; ?>'].splice(index, 1);
                    else
                        document.selectedRows['<?php echo $equipement_dts[0]->id_equipement; ?>'].push(thisValue);
                }
                    //move-container
                });
            });
        </script>
        @endcan

    @endisset
