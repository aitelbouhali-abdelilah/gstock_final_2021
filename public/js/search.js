function goto_url_search(route) {
    window.location = route + "/" + $("#city_id").val();
}

function goto_url_search_type(route) {
    if ($('#status').length) {
        window.location = route + "/" + $("#equipement_type_id").val() + "?status=" + $('#status').val();

    } else {
        window.location = route + "/" + $("#equipement_type_id").val();
    }

}

function goto_url_search_piece(route) {
    window.location = route + "/" + $("#search_by_piece").val();
}



function goto_url_search_by_product(route) {
    window.location = route + "/" + $("#search_by_product").val();
}


function goto_url_search_user(route) {
    window.location = route + "/" + $("#user_name").val();
}

function goto_url_search_site(route) {

    window.location = route + "/" + $("#site_name").val();
}

function goto_url_search_product(route) {

    window.location = route + "/" + $("#product_name").val();
}

function goto_url_search_admin_type(route) {

    window.location = route + "/" + $("#type_name").val();
}

function goto_url_search_admin_model(route) {

    window.location = route + "/" + $("#model_name").val();
}

function goto_url_search_admin_consumable(route) {

    window.location = route + "/" + $("#consumable_name").val();
}