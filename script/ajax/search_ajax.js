$("#search_input").on("keyup", function(){
    $(".result_search").empty();
    
    let recherche = ""
    
    if ($(this).val()[0] == "@"){
        recherche = "username"
    } else if ($(this).val()[0] == "#") {
        recherche = "hashtag"
    }

    let json_arr = JSON.stringify({
        'title': recherche,
        'content': $(this).val(),
    });

    $.ajax({
        type: "post",
        url: "../php/search/search.php",
        data: {
            data: json_arr,
        },
        success: function (response) {
            response = JSON.parse(response)
            console.log(response)
            console.log(response[1].length)
            if (response[0] == true){
                for (let i = 0; i < response[1].length; i++){
                    $(".result_search").append(
                        "<div>"+
                            "<a href=\"./profile.php?username="+response[1][i]["username"].substr(1)+"\">"+response[1][i]["username"]+"</a>"+
                        "</div>");
                }
            } else if (response[0] == false){
                for (let i = 0; i < response[1].length; i++){
                    $(".result_search").append(
                        "<div>"+
                            response[1][0]["name"]+
                        "</div>");
                }
            }
        }
    });
    
})