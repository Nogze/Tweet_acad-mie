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
            response = JSON.parse(response)
            response = Array.from(response)
            console.log(response)
            
            for(let i = 0; i < response[0].length; i++){
                $("#POST").append("<div class=\"print_tweet\" data_id=\""+response[0][i]["id"]+"\">"+
                                        "<div class=\"username\">"+
                                            "<a href=\"\">"+response[0][i]["username"]+"</a>"+
                                        "</div>"+
                                        "<div>"+
                                            response[0][i]["content"]+
                                        "</div>"+
                                        "<div class=\"post_action\">"+
                                            "<div class=\"img_like\"> <img src=\"../img/like.png\" alt=\"like\"> </div>"+
                                            "<div class=\"img_repost\"> <img src=\"../img/repost.png\" alt=\"retweet\"> </div>"+
                                            "<div class=\"img_comment\"> <img src=\"../img/comment.png\" alt=\"comment\"> </div>"+
                                        "</div>"+
                                        "<div class=\"post_info\">"+
                                            "<div class=\"likes\">"+ response[0][i]["likes"]+" likes</div>"+
                                            "<div class=\"rt\">"+ response[0][i]["rt"]+" retweets</div>"+
                                            "<div class=\"nbr_comment\">"+ response[0][i]["nbr_com"]+" comments</div>"+
                                        "</div>"+

                                        "<div class=\"date\">"+
                                            "<div><sup>Created : "+ response[0][i]["creation_date"]+"</sup></div>"+
                                        "</div>"+
                                        "<div class=\"comment_div\">"+
                                            "<div class=\"comment\" contenteditable=\"true\" data-placeholder=\"Tweet your reply\"></div>"+    
                                            "<div class=\"btn_reply\">"+
                                                "<button class=\"btn-tweet\">Reply</button>"+
                                            "</div>"+
                                            "<div class=\"res_com\">"+
                                            "</div>"+   
                                        "</div>"+
                                 "</div>"
                );
                
                let modif = "[data_id="+response[0][i]["id"]+"]";

                if (response[0][i]["nbr_com"] >= 1){
                    for(let idx = 0; idx < response[1].length;  idx++){
                        if(response[0][i]["id"] == response[1][idx]["id_post"]){
                            
                            $(modif+" .res_com").append("<div class=\"com\">"+
                                                            "<div class=\"username\">"+ 
                                                                "<a href=\"\">"+response[1][idx]["username"]+"</a>"+
                                                            "</div>"+
                                                            "<div>"+ 
                                                                response[1][idx]["content"]+
                                                            "</div>"+ 
                                                        "</div>")
                        }
                    }
                }

                if (String.valueOf(response[0][i]["edition_date"]) != null || String.valueOf(response[0][i]["edition_date"]) != "null"){
                    console.log("good")
                    $(modif+" .date").append("<div> <sup> Edited : "+ response[0][i]["edition_date"] + "</sup> </div>")
                }

            }
        },
        error: function (xhr) {
            alert("ERROR : "+xhr.responseText);
            alert("ERROR : "+xhr.responseText.Message);
        }
    });
})

$(document).on("click", ".btn_reply .btn-tweet", function(e){
        console.log($(e.target).parents(".print_tweet").attr("data_id"))
        
        let json_arr = JSON.stringify({
            'content': $(e.target).parents(".comment_div").children(".comment").text(),
            'id_post': $(e.target).parents(".print_tweet").attr("data_id"),
        });

        $.ajax({
            type: "post",
            url: "../php/send_com.php",
            data: {
                data: json_arr,
            },
            success: function (response) {
                response = JSON.parse(response)
                response = Array.from(response)
                console.log(response)

                $(modif+" .res_com").append("<div class=\"com\">"+
                                                            "<div class=\"username\">"+ 
                                                                "<a href=\"\">@"+response[1][idx]["username"]+"</a>"+
                                                            "</div>"+
                                                            "<div>"+ 
                                                                ["content"]+
                                                            "</div>"+ 
                                                        "</div>")
            }
        });
})