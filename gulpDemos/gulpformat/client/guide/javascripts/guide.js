/**
 * Created by shgbit on 16-9-27.
 */
function choosePicture(obj){
    var select = $(obj).attr('select');
    if(select == 'no'){
        $(obj).parent().parent().toggleClass('image-box-shadow');
        $(obj).attr('select','yes');
    }else if(select == 'yes'){
        $(obj).parent().parent().toggleClass('image-box-shadow');
        $(obj).attr('select','no');
        
    }
}