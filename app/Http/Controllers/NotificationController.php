<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use App\Models\EquipementDt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Notification as notification;
use App\Models\Piece;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function closeNotification($data)
    {

        Validator::make(['data' => $data], [
            'data' => ['required', 'string', 'max:255'],
        ])->validated();

        $mytime = Carbon::now();
        $notification = notification::where('data', '=', $data)->where('notifiable_id', '=', auth()->user()->id)->whereNull('read_at');
        if (count($notification->get())) {
            $notification->update([
                'read_at' => $mytime->toDateTimeString()
            ]);

            $data = ['status' => 'success'];
            return response()->json($data, 200);
        } else {
            $data = ['status' => 'error'];
            return response()->json($data, 200);
        }
    }
    public static function checkNotification($request)
    {
        $request->session()->forget('transfer_confirm_equipement');
        $request->session()->forget('transfer_confirm_consumable');
        $request->session()->forget('notification');

        $pendding_transfer_equipement = DB::table('pendding_transfer_equipement')->where('receiver_id','=',Auth::user()->id)->get()->groupBy('token')->toArray();
        if($pendding_transfer_equipement){
            $request->session()->flash('transfer_confirm_equipement', ['equipement_dts' => $pendding_transfer_equipement]);
        }
        $pendding_transfer_consumable= DB::table('pendding_transfer_consumable')->where('receiver_id','=',Auth::user()->id)->get();
        if($pendding_transfer_consumable){
            $request->session()->flash('transfer_confirm_consumable', ['consumable' => $pendding_transfer_consumable]);
        }
        $notification = notification::where('notifiable_id', '=', auth()->user()->id)->whereNull('read_at')->get();
        if ($notification) {
            $equipements = [];
            $pieces = [];
            foreach ($notification as $ntfc) {
                $data = json_decode($ntfc->data);
                if ($data->type == "equipement" && !in_array($data->id, $equipements)) {
                    array_push($equipements, $data->id);
                } else if ($data->type == "piece" && !in_array($data->id, $pieces)) {
                    array_push($pieces, $data->id);
                }
            }
            $request->session()->flash('notification', ['equipements' => Equipement::whereIn('id', $equipements)->get(), 'pieces' => Piece::whereIn('id', $pieces)->get()]);
        }
    }
}
