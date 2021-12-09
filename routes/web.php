<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ChartController;
use App\Video\VideoStream;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        if ($user->hasRole('user') || $user->hasRole('viewer'))
            return redirect()->route('barChart');
    }
    return view('index');
});
Route::get('/dashboard', [ChartController::class, 'barChart'])->name('barChart')->middleware(['auth.isUserOrViewer']);

Route::get('/documentation', function () {
    return view('documentation.watch.index');
});
Route::get('/documentation/get-video', function () {
 
    $stream = new VideoStream(storage_path('app').'/documentation/video.mp4');
    $stream->start();
    
})->name('getVideo');
Route::get('/documentation/download', function () {
    ob_clean();
    return Storage::download('/documentation/guide.pdf','guide.pdf');
});

Route::get('/about', function () {
    return view('about.index');
});
Route::get('/about/development_team', function () {
    return view('about.development_team.index');
});
//Route::get('/bar-chart', [ChartController::class, 'barChart'])->name('barChart')->middleware(['auth']);


Route::get('forget-password', [ForgotPasswordController::class, 'showForgetPasswordForm'])->middleware('guest')->name('forget.password.get');
Route::post('forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->middleware('guest')->name('forget.password.post');
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm'])->middleware('guest')->name('password.reset');
Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm'])->middleware('guest')->name('reset.password.post');

Route::get('/lang/{lang}', 'Lang\LangController@switchLang')->name('lang.switchLang');

Route::get('/switchOnglet/{key}', 'Admin\ProductsController@switchOnglet')->name('switchOnglet')->middleware(['auth']);

Route::prefix('system/')->middleware(['auth'])->name('system.')->group(function () {
    Route::middleware(['auth.isUser'])->group(function () {
        Route::get('equipement/create', 'System\EquipementController@create')->name('equipement_create');
        Route::post('equipement/store', 'System\EquipementController@store')->name('equipement_store');
        //Route::get('equipement/getAllProducts', 'System\EquipementController@getAllProducts')->name('equipement.getAllProducts');
        Route::get('rechange_and_conso/create', 'System\PieceController@create')->name('rechange_and_conso_create');
        Route::post('rechange_and_conso/store', 'System\PieceController@store')->name('rechange_and_conso_store');
        Route::get('equipement_dt/move/accept/{token}', 'System\EquipementDtController@moveAccept')->name('equipement_state.moveAccept');
        Route::get('equipement_dt/move/refuse/{token}', 'System\EquipementDtController@moveRefuse')->name('equipement_state.moveRefuse');
        Route::get('consumable/move/accept/{move_id}', 'System\PieceController@moveAccept')->name('consumable.moveAccept');
        Route::get('consumable/move/refuse/{move_id}', 'System\PieceController@moveRefuse')->name('consumable.moveRefuse');
    });

    Route::middleware(['auth.isAdmin'])->group(function () {
        Route::get('equipement_type/create', 'System\Config\EquipementTypeController@create')->name('equipement_type_create');
        Route::post('equipement_type/store', 'System\Config\EquipementTypeController@store')->name('equipement_type_store');
        Route::get('equipement_model/create', 'System\Config\EquipementModelController@create')->name('equipement_model_create');
        Route::post('equipement_model/store', 'System\Config\EquipementModelController@store')->name('equipement_model_store');
        Route::get('spare_and_conso/create', 'System\Config\SpareConsoController@create')->name('spare_and_conso_create');
        Route::post('spare_and_conso/store', 'System\Config\SpareConsoController@store')->name('spare_and_conso_store');
    });
    Route::get('equipement_dt/get-more-eqpts', 'System\EquipementDtController@getMoreEqpts')->name('equipement_state.get-more-eqpts')->middleware('auth.isUserOrViewer');

});
Route::prefix('system/{system_type}')->where(['system_type' => '[a-zA-Z 0-9]+'])->middleware(['auth'])->name('system.')->group(function ($system_type) {

    Route::get('/equipement/exportPDF', 'System\EquipementController@exportPDF')->name('equipement.exportPDF')->middleware('auth.isUserOrViewer');
    Route::get('/equipement/exportCSV', 'System\EquipementController@exportCSV')->name('equipement.exportCSV')->middleware('auth.isUserOrViewer');
    Route::get('/equipement_state/exportPDF/{equipement_id}', 'System\EquipementDtController@exportPDF')->name('equipement_state.exportPDF')->middleware('auth.isUserOrViewer');
    Route::get('/equipement_state/exportCSV/{equipement_id}', 'System\EquipementDtController@exportCSV')->name('equipement_state.exportCSV')->middleware('auth.isUserOrViewer');
    Route::get('/rechange_and_conso/exportPDF', 'System\PieceController@exportPDF')->name('rechange_and_conso.exportPDF')->middleware('auth.isUserOrViewer');
    Route::get('/rechange_and_conso/exportCSV', 'System\PieceController@exportCSV')->name('rechange_and_conso.exportCSV')->middleware('auth.isUserOrViewer');
    Route::get('/equipement_state/exportPDFHistory/{equipementsDt_id}', 'System\EquipementDtController@exportPDFHistory')->name('equipement_state.exportPDFHistory')->middleware('auth.isUser');
    Route::get('/rechange_and_conso/exportPDFHistory/{piece_id}', 'System\PieceController@exportPDFHistory')->name('rechange_and_conso.exportPDFHistory')->middleware('auth.isUser');

    Route::get('/rechange_and_conso/exportPDFHistory/{piece_id}', 'System\PieceController@exportPDFHistory')->name('rechange_and_conso.exportPDFHistory')->middleware('auth.isUser');
    
    Route::get('/FileCSV/EquipmentDetailSpare', function () {
        ob_clean();
        return Storage::download('FileCSV\EquipmentDetailSpare.xlsx','EquipmentDetailSpare.xlsx');
    })->middleware('auth.isUser');
    Route::get('/FileCSV/EquipmentDetailOnline', function () {
        ob_clean();
        return Storage::download('/FileCSV/EquipmentDetailOnline.xlsx','EquipmentDetailOnline.xlsx');
    })->middleware('auth.isUser');

    Route::get('/equipement_state/importCSV', 'System\EquipementDtController@importCSV')->name('equipement_state.importCSV')->middleware('auth.isUser');
    Route::post('/equipement_state/storeCSV', 'System\EquipementDtController@storeCSV')->name('equipement_state.storeCSV')->middleware('auth.isUser');



    Route::get('/equipement_state/create/{equipement_id}', 'System\EquipementDtController@create')->name('equipement_state.create')->middleware('auth.isUser');
    Route::get('/equipement/getTypes', 'System\EquipementController@getTypes')->name('equipement.getTypes')->middleware('auth.isUserOrViewer');
    Route::get('/equipement/getModels/{type}', 'System\EquipementController@getModels')->name('equipement.getModels')->middleware('auth.isUserOrViewer');
    Route::get('/equipement/getUserProducts', 'System\EquipementController@getUserProducts')->name('equipement.getUserProducts')->middleware('auth.isUserOrViewer');
    Route::get('/equipement/getProductSites', 'System\EquipementController@getProductSites')->name('equipement.getProductSites')->middleware('auth.isUserOrViewer');

    Route::get('/equipement/getProductTerminals/{site}', 'System\EquipementController@getProductTerminals')->name('equipement.getProductTerminals')->middleware('auth.isUser');
    Route::get('/equipement/getUserTerminals', 'System\EquipementController@getUserTerminals')->name('equipement.getUserTerminals')->middleware('auth.isUser');
    Route::get('/equipement/getSiteUserTerminals/{site}/{user}', 'System\EquipementController@getSiteUserTerminals')->name('equipement.getSiteUserTerminals')->middleware('auth.isUser');
    Route::get('/equipement/getUsersBySite/{site}', 'System\EquipementController@getUsersBySite')->name('equipement.getUsersBySite')->middleware('auth.isUser');


    Route::get('/rechange_and_conso/getPiecesList', 'System\PieceController@getPiecesList')->name('rechange_and_conso.getPiecesList')->middleware('auth.isUserOrViewer');
    Route::put('/equipement/move/{id}', 'System\EquipementController@move')->name('equipement.move')->middleware('auth.isUser');
    Route::put('/consumable/move/{id}', 'System\PieceController@move')->name('consumable.move')->middleware('auth.isUser');

    //Route::resource('/', System\EquipementController::class)->except(['index', 'show'])->middleware('auth.isUser');
    Route::resource('/equipement', System\EquipementController::class)->except(['index', 'show'])->middleware('auth.isUser');
    Route::resource('/equipement_state', System\EquipementDtController::class)->except(['index', 'show'])->middleware('auth.isUser');
    Route::resource('/rechange_and_conso', System\PieceController::class)->except(['index', 'show'])->middleware('auth.isUser');

    //Route::resource('/', System\EquipementController::class)->only(['index', 'show'])->middleware('auth.isUserOrViewer');
    Route::resource('/equipement', System\EquipementController::class)->only(['index', 'show'])->middleware('auth.isUserOrViewer');
    Route::resource('/rechange_and_conso', System\PieceController::class)->only(['index', 'show'])->middleware('auth.isUserOrViewer');
    //Route::get('/equipement/getAllProducts', 'System\EquipementController@getAllProducts')->name('equipement.getAllProducts');


    Route::prefix('config')->middleware(['auth.isAdmin'])->name('config.')->group(function () {
        Route::resource('/', System\Config\EquipementTypeController::class);
        Route::resource('/equipement_type', System\Config\EquipementTypeController::class);
        Route::resource('/equipement_model', System\Config\EquipementModelController::class);
        Route::resource('/spare_and_conso', System\Config\SpareConsoController::class);
    });
});

Route::prefix('/user/')->middleware(['auth'])->name('user.')->group(function () {
    Route::get('profile', 'ProfileController@index')->name('profile');
    Route::put('profile', 'ProfileController@update')->name('profile');
});


Route::prefix('admin')->middleware(['auth', 'auth.isAdmin'])->name('admin.')->group(function () {
    Route::resource('/products', Admin\ProductsController::class);
    Route::resource('/users', Admin\UserController::class);
    Route::get('/users/getTerminals/{id_site}', 'Admin\UserController@getTerminals')->name('users.getTerminals');
    Route::resource('/occupation', Admin\OccupationController::class);
    Route::resource('/sites', Admin\SiteController::class);
});

Route::get('equipement/move/accept/{token}', 'System\EquipementDtController@moveAcceptByToken');
Route::get('equipement/move/refuse/{token}', 'System\EquipementDtController@moveRefuseByToken');

Route::get('consumable/move/accept/{token}', 'System\PieceController@moveAcceptByToken');
Route::get('consumable/move/refuse/{token}', 'System\PieceController@moveRefuseByToken');

Route::get('getEquipementChartData', 'ChartController@getEquipementChartData')->middleware(['auth.isUserOrViewer']);
Route::get('getConsumableChartData', 'ChartController@getConsumableChartData')->middleware(['auth.isUserOrViewer']);

Route::get('/close_notification/{data}', [NotificationController::class, 'closeNotification'])->middleware(['auth']);