/**
 * Created by shgbit on 16-9-23.
 */
function editPath(obj){
    var pathName = $(obj).parent().parent().prev().text();
    $('#pathName').val(pathName);
    $('#editPath').modal('show');
}