/**
 * Created by shgbit on 16-9-23.
 */
function editProject(obj){
    var projectName = $(obj).parent().parent().prev().text();
    $('#projectName').val(projectName);
    $('#editProject').modal('show');
}