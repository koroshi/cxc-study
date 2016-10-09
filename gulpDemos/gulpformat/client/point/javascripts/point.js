/**
 * Created by shgbit on 16-9-26.
 */
function editPoint(obj){
    var pointName = $(obj).parent().parent().prev().text();
    $('#pointName').val(pointName);
    $('#editPoint').modal('show');
}