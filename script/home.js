/***** Preview img *****/
$("#files").on("change", function(){
    $("#img-container").empty()
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
function dropDown(){
    if(window.getComputedStyle(x).visibility === "hidden"){

    } else {

    }
}
let i = 0;
$(document).on("click", ".img_comment", function(e){
    i++
    if (i%2==1) {
        $(e.target).parents(".print_tweet").children(".comment_div").show();
    } else {
        $(e.target).parents(".print_tweet").children(".comment_div").hide();

    }
})

/***** show option *****/
$(document).on("mouseenter", ".print_tweet", function(e){
    $(".btn-modif").show()
    $(".btn-del").show()
    $(".btn-del-tweet").show()
})

/***** hide option *****/
$(document).on("mouseleave", ".print_tweet", function(e){
    $(".btn-modif").hide()
    $(".btn-del").hide()
    $(".btn-del-tweet").hide()
})