function get_action() {
    document.getElementById('delete-equipement_state-form').action = '/system/' + $('#system_type').val() + '/equipement_state/' + $('#equipement_state_to_be_deleted').val();
    document.getElementById('move-equipement_state-form' + $('#equipement_to_be_shown').val()).action = '/system/' + $('#system_type').val() + '/equipement/move/' + $('#equipement_to_be_shown').val();
}

function deleteEquipementState(equipementID, equipementStateID) {
    document.getElementById('equipement_state_to_be_deleted').value = equipementStateID;
    document.getElementById('equipement_to_be_shown').value = equipementID;
    $('#delete-equipementstate-modal').modal("show");
}

function importEquipementState() {
    $('#import-equipementstate-modal').modal("show");
}


function historyEquipementState(history, equipementID, equipementStateID, created_at_) {
    let date_ob = new Date(created_at_['created_at']);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours() - 1;
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    var values = " Created At  [" + (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds) + "] <hr>";

    for (let pas = 0; pas < history.length; pas++) {
        values = values + history[pas] + "<hr>"
    }
    document.getElementById("equipement_state_history").innerHTML = values;
    document.getElementById("print_history_button").innerHTML = "<a href='equipement_state/exportPDFHistory/" + equipementStateID + "' type='button' class='btn btn-outline-primary float-end ms-1' role='button'><i class='fa fa-download'></i>Print History</a>";
    document.getElementById('equipement_state_to_be_deleted').value = equipementStateID;
    document.getElementById('equipement_to_be_shown').value = equipementID;

    $('#history-equipementstate-modal').modal("show");

}



//consumable history
function historyConsomable(history, created_at_) {
    let date_ob = new Date(created_at_['created_at']);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours() - 1;
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var values = " Created At  [" + (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds) + "] <hr>";

    for (let pas = 0; pas < history.length; pas++) {
        values = values + history[pas] + "<hr>"
    }
    document.getElementById("consumable_history" + created_at_['id']).innerHTML = values;


}

function moveDts(equipementID) {
    var name = 'dts' + equipementID;
    document.getElementById('equipement_to_be_shown').value = equipementID;


    if (document.selectedRows[equipementID].length > 0 && $('#move_site' + equipementID).val() != '') {
        $(".modal").modal('hide');
        $("#move-equipementstate-modal").modal('show');

        document.getElementById('equipement_dts_to_be_moved' + equipementID).value = document.selectedRows[equipementID];
    }

}