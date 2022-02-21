/***** Preview img *****/
function previewImg(){
    $("#files").on("change", function(){
        let nbr_files = $(this)[0].files.length;
        if (nbr_files == 0){
            return false;
        }
        
        for (let i = 0; i < this.files.length; i++) {
            let url = URL.createObjectURL(this.files[i]);
            let img = new Image();
            
            img.src = url;
            $("#img-container").append(img);
            
            img.onload = function() {
                URL.revokeObjectURL(this.src);
            }
        }
    })
}

previewImg();

/***** check nbr carac tweet *****/
$(document).on("keyup", "#tweet",function(e){
    // check longueur txt
    if($(this).text().length > 140){
        $(this).css("color", "red")
        $("#btn-tweet").attr("disabled", true)
    }else{
        $(this).css("color", "black")
        $("#btn-tweet").attr("disabled", false)
    }
})
    
/***** check nbr carac com *****/
    $(document).on("keyup", ".comment",function(e){        
    // check longueur txt
    if($(this).text().length > 140){
        $(this).css("color", "red")
        $("#btn-tweet").attr("disabled", true)
    }else{
        $(this).css("color", "black")
        $("#btn-tweet").attr("disabled", false)
    }
})

/***** show coms *****/
let i = 0;
$(document).on("click", ".img_comment", function(e){
    i++
    if (i%2==1) {
        $(e.target).parents(".print_tweet").children(".comment_div").show();
    } else {
        $(e.target).parents(".print_tweet").children(".comment_div").hide();

    }
})