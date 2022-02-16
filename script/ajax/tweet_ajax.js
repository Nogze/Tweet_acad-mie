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

$(document).on("keyup", "#tweet",function(){
    console.log($(this).text().length)
    if($(this).text().length > 140){
        $(this).css("color", "red")
        $("#btn-tweet").attr("disabled", true)
    }else{
        $(this).css("color", "black")
        $("#btn-tweet").attr("disabled", false)
    }
})

$("#form_tweet").on("submit", function(e){
    e.preventDefault();

    let form = new FormData($("#post")[0]);
    form.append("content", $("#tweet").text())

    let json_arr = JSON.stringify({
        'content': form.get('content'),
    });
    
    $.ajax({
        type: "post",
        url: "../php/send_tweet.php",
        data: {
            data:json_arr,
        },
        success: function (response, textStatus, jqXHR) {
            console.log(response)
        },
        error: function (xhr) {
            alert("ERROR : "+xhr.responseText);
            alert("ERROR : "+xhr.responseText.Message);
        }
    });
})