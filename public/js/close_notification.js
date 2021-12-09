function closeNotification(type,id){
    $data = '{"id":'+id+',"type":"'+type+'"}';
    $.getJSON('/close_notification/'+$data, function(result){
        //console.log(result);
    });
}