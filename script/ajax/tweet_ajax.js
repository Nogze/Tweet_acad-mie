// PRINT ALL TWEET / COM ON LOAD
var nbr_like = 0;
var nbr_com = 0;
var nbr_rt = 0;

// LOAD PAGE PRINT ALL TWEET
$(document).ready(function (){
    $.ajax({
        type: "post",
        url: "../php/home/home_print_tweet.php",
        data: {
            data:"",
        },
        success: function (response, textStatus, jqXHR) {
            response = JSON.parse(response)
            console.log(response)
            let max = response[0].length+response[2].length
            let num_rt = 0
            let num_tweet = 0
            let date_tweet;
            let date_rt;
            for(let i = 0; i < max; i++){
                date_tweet = new Date(response[0][num_tweet]["creation_date"])
                if (num_rt < response[2].length){
                    date_rt = new Date(response[2][num_rt]["creation_date"])
                }

                if(date_rt > date_tweet && num_rt < response[2].length){
                    $("#POST").append(  "<div class=\"print_rt\" data-id-rt-tweet=\""+response[2][num_rt]["id_post"]+"\">"+
                                            "<div class=\"username\">"+
                                                "<a href=\"./profile.php?username="+response[0][num_rt]["username"].substr(1)+"\">"+response[0][num_rt]["username"]+"</a>"+
                                            "</div>"+
                                            "<div class=\"rt\">"+
                                                "Has <a href=\"#"+response[2][num_rt]["id_post"]+"\" class=\"link_rt\">retweet</a>"+
                                            "</div>"+
                                        "</div>")
                    num_rt++
                    continue
                }
                $("#POST").append("<div class=\"print_tweet\" id=\""+response[0][num_tweet]["id"]+"\" data_id=\""+response[0][num_tweet]["id"]+"\">"+
                                        "<div class=\"username\">"+
                                            "<a href=\"./profile.php?username="+response[0][num_tweet]["username"].substr(1)+"\">"+response[0][num_tweet]["username"]+"</a>"+
                                        "</div>"+
                                        "<div class=\"tweet-txt\">"+
                                            response[0][num_tweet]["content"]+
                                        "</div>"+
                                        "<div class=\"div-btn-modif\">"+
                                            "<button class=\"btn-tweet send-modif\">Modif</button>"+
                                        "</div>"+
                                        "<div class=\"post_action\">"+
                                            "<div class=\"img_like\"> <img src=\"../img/like.png\" alt=\"like\"> </div>"+
                                            "<div class=\"img_repost\"> <img src=\"../img/repost.png\" alt=\"retweet\"> </div>"+
                                            "<div class=\"img_comment\"> <img src=\"../img/comment.png\" alt=\"comment\"> </div>"+
                                        "</div>"+
                                        "<div class=\"post_info\">"+
                                            "<div class=\"likes\">"+ response[0][num_tweet]["nbr_likes"]+" likes</div>"+
                                            "<div class=\"rt\">"+ response[0][num_tweet]["nbr_rt"]+" retweets</div>"+
                                            "<div class=\"nbr_comment\">"+ response[0][num_tweet]["nbr_com"]+" comments</div>"+
                                        "</div>"+

                                        "<div class=\"date\">"+
                                            "<div><sup>Created : "+ response[0][num_tweet]["creation_date"]+"</sup></div>"+
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
                let modif = "[data_id="+response[0][num_tweet]["id"]+"]";
                if(response[0][num_tweet]["id_user"] == parseInt(localStorage.getItem("id_user"))){
                    $(modif).append(
                        "<button class=\"btn-del-tweet\">X</button>"+
                        "<button class=\"btn-modif\"><img src=\"../img/crayon.png\" alt=\"logo crayon\"></button>"+
                        "<button class=\"btn-tweet send-modif\">Modif</button>"
                    )
                }

                if (response[0][num_tweet]["nbr_com"] >= 1){
                    for(let idx = 0; idx < response[0][num_tweet]["nbr_com"];  idx++){
                        if(response[0][num_tweet]["id"] == response[1][idx]["id_post"]){
                            $(modif+" .res_com").append("<div class=\"com\" data-id-com=\""+response[1][idx]["id"]+"\">"+
                                                            "<div class=\"username\">"+
                                                                "<a href=\"\">"+response[1][idx]["username"]+"</a>"+
                                                            "</div>"+
                                                            "<div class=\"text_com\">"+
                                                                response[1][idx]["content"]+
                                                            "</div>"+
                                                        "</div>")
                        }
                        if(response[1][idx]["user_com"] === parseInt(localStorage.getItem("id_user"))){
                            $(modif+" [data-id-com=\""+response[1][idx]["id"]+"\"]").append("<button class=\"btn-del\">X</button>"+
                            "<button class=\"btn-modif\"><img src=\"../img/crayon.png\" alt=\"logo crayon\"></button>"+
                            "<button class=\"btn-tweet send-modif\">Modif</button>")
                        }

                    }
                }

                if (String.valueOf(response[0][num_tweet]["edition_date"]) != null || String.valueOf(response[0][num_tweet]["edition_date"]) != "null"){
                    $(modif+" .date").append("<div> <sup> Edited : "+ response[0][num_tweet]["edition_date"] + "</sup> </div>")
                }
                num_tweet++
            }
        },
        error: function (xhr) {
            alert("ERROR : "+xhr.responseText);
            alert("ERROR : "+xhr.responseText.Message);
        }
    });
})

// ADD TWEET TO DB
$("#form_tweet").on("submit", function(e){
    if ($("#tweet").text().length < 1){
        return false;
    }

    let form = new FormData($("#post")[0]);
    form.append("content", $("#tweet").text())
    form.append('localStorage', localStorage.getItem("id_user"))

    let json_arr = JSON.stringify({
        'title': 'send_tweet',
        'localStorage': localStorage.getItem("id_user"),
        'content': form.get('content'),
    });

    $.ajax({
        type: "post",
        url: "../php/home/home_send_tweet.php",
        data: {
            data:json_arr,
        },
        success: function (response, textStatus, jqXHR) {
            // console.log(response)
        },
        error: function (xhr) {
            alert("ERROR : "+xhr.responseText);
            alert("ERROR : "+xhr.responseText.Message);
        }
    });
})

// ADD COM TO DB
$(document).on("click", ".btn_reply .btn-tweet", function(e){

    let json_arr = JSON.stringify({
        'content': $(e.target).parents(".comment_div").children(".comment").text(),
        'id_post': $(e.target).parents(".print_tweet").attr("data_id"),
        'localStorage': localStorage.getItem("id_user"),
    });

    let parent = $(e.target).parents(".print_tweet");

    if ($(this).parents(".btn_reply").siblings(".comment").text().length < 1){
        return false;
    }

    $.ajax({
        type: "post",
        url: "../php/home/home_reply_tweet.php",
        data: {
            data: json_arr,
        },
        success: function (response, textStatus, jqXHR) {
            response = JSON.parse(response)
            console.log(response)

            parent.children(".comment_div").children(".res_com").prepend("<div class=\"com\" data-id-com=\""+response["id"]+"\">"+
                                                                            "<div class=\"username\">"+
                                                                                "<a href=\"\">"+response["username"]+"</a>"+
                                                                            "</div>"+
                                                                            "<div class=\"text_com\">"+
                                                                                response["content"]+
                                                                            "</div>"+
                                                                            "<button class=\"btn-del\">X</button>"+
                                                                            "<button class=\"btn-del\">X</button>"+
                                                                            "<button class=\"btn-modif\"><img src=\"../img/crayon.png\" alt=\"logo crayon\"></button>"+
                                                                            "<button class=\"btn-tweet send-modif\">Modif</button>"+
                                                                        "</div>")

            parent.children(".comment_div").children(".comment").text("")
            let post_com = $(e.target).parents(".print_tweet").attr("data_id");
            let com_text = $("[data_id="+post_com+"] .nbr_comment").text();
            let nbr_com = parseInt(com_text.split(" ")[0])

            $(e.target).parent().remove()
            parseInt(nbr_com++)
            $("[data_id="+post_com+"] .nbr_comment").text(nbr_com + " comments")
        }
    });
})

// ADD LIKE TO POST
$(document).on("click", ".img_like",function(e){
    e.preventDefault();

    let json_arr = JSON.stringify({
        'content': $(this).attr("class"),
        'localStorage': localStorage.getItem("id_user"),
        'post': $(e.target).parents(".print_tweet").attr("data_id"),
    });

    $.ajax({
        type: "post",
        url: "../php/home/home_send_like.php",
        data: {
            data: json_arr,
        },
        success: function (response) {
            let post_like = $(e.target).parents(".print_tweet").attr("data_id");
            let like_text = $("[data_id="+post_like+"] .likes").text();
            let nbr_like = parseInt(like_text.split(" ")[0])

            response = JSON.parse(response);

            if (response[0] == false){
                console.log("IF")
                parseInt(nbr_like--)
            } else {
                console.log("ELSE")
                parseInt(nbr_like++)
            }

            $("[data_id="+post_like+"] .likes").text(nbr_like + " likes")
        }
    });
})

// ADD RT TO POST
$(document).on("click", ".img_repost",function(e){
    e.preventDefault();
    let json_arr = JSON.stringify({
        'content': $(this).attr("class"),
        'localStorage': localStorage.getItem("id_user"),
        'post': $(e.target).parents(".print_tweet").attr("data_id"),
    });

    $.ajax({
        type: "post",
        url: "../php/home/home_send_rt.php",
        data: {
            data: json_arr,
        },
        success: function (response) {
            let post_rt = $(e.target).parents(".print_tweet").attr("data_id");
            let rt_text = $("[data_id="+post_rt+"] .rt").text();
            let nbr_rt = parseInt(rt_text.split(" ")[0])

            response = JSON.parse(response);

            if (response[0] == false){
                parseInt(nbr_rt--)
                $("#POST [data-id-rt-tweet="+post_rt+"]").remove()
            } else {
                parseInt(nbr_rt++)
                $("#POST").prepend(  "<div class=\"print_rt\" data-id-rt-tweet=\""+post_rt+"\">"+
                                            "<div class=\"username\">"+
                                                "<a href=\"./profile.php?username="+response[0].substr(1)+"\">"+response[0]+"</a>"+
                                            "</div>"+
                                            "<div class=\"rt\">"+
                                                "Has <a href=\"#"+post_rt+"\" class=\"link_rt\">retweet</a>"+
                                            "</div>"+
                                        "</div>")
            }

            $("[data_id="+post_rt+"] .rt").text(nbr_rt + " retweets")
        }
    });
})

// BTN SUPPR COM
$(document).on("click", ".com .btn-del", function(e){
    let json_arr = JSON.stringify({
        'title': "com",
        'id_com' : $(e.target).parent().attr("data-id-com"),
        'localStorage': localStorage.getItem("id_user"),
    });
    $.ajax({
        type: "post",
        url: "../php/home/home_del.php",
        data: {
            data:json_arr,
        },
        success: function (response) {
            let post_com = $(e.target).parents(".print_tweet").attr("data_id");
            let com_text = $("[data_id="+post_com+"] .nbr_comment").text();
            let nbr_com = parseInt(com_text.split(" ")[0])

            $(e.target).parent().remove()
            parseInt(nbr_com--)
            $("[data_id="+post_com+"] .nbr_comment").text(nbr_com + " comments")

        }
    });
})

// BTN SUPPR TWEET
$(document).on("click", ".print_tweet .btn-del-tweet", function(e){
    let tweet = $(e.target).parents(".print_tweet")
    let json_arr = JSON.stringify({
        'title': "tweet",
        'id_tweet' : $(tweet).attr("data_id"),
        'localStorage': localStorage.getItem("id_user"),
    });
    $.ajax({
        type: "post",
        url: "../php/home/home_del.php",
        data: {
            data:json_arr,
        },
        success: function (response) {
            tweet.remove()
        }
    });
})

//BTN MODIF COM
$(document).on("click", ".com .btn-modif", function(e){
    $(this).parents(".com").children(".send-modif").show()

    let com = $(this).parents(".com").children(".text_com")
    com.attr("contenteditable",true)
    com.css("border", "1px solid rgba(200, 200, 200, .8)")
    com.css("border-radius", "10px")
})

//BTN MODIF TWEET
$(document).on("click", ".print_tweet .btn-modif", function(e){
    let btn_modif = $(e.target).parents(".print_tweet").children(".div-btn-modif").children(".send-modif").show()
    let com = $(e.target).parents(".print_tweet").children(".tweet-txt")
    com.attr("contenteditable", true)
    com.css("border", "1px solid rgba(200, 200, 200, .8)")
    com.css("border-radius", "10px")
})
//BTN SEND MODIF
$(document).on("click", ".send-modif", function(e){
    let name = ""
    let com = ""
    let id = ""
    let c = $(e.target).parents()[1]

    if ($(c).hasClass("print_tweet")){
        name = "modif_tweet"
        com = $(c).children(".tweet-txt")
        id = $(e.target).parents(".print_tweet").attr("data_id")
    } else if ($(c).hasClass("res_com")){
        name = "modif_com"
        com = $(this).parents(".com").children(".text_com")
        id = $(this).parents(".com").attr("data-id-com")
    }
    let json_arr = JSON.stringify({
        'title': name,
        'id_com': id ,
        'content': com.text(),
    });

    $.ajax({
        type: "post",
        url: "../php/home/home_modif_com.php",
        data:{
            data: json_arr,
        },
        success: function (response) {
            response = JSON.parse(response)
            if (response[0] == "true"){
                com.attr("contenteditable",false)
                com.css("border", "none")
                com.parents(".com").children(".send-modif").css("display", "none")
            }
        }
    });
})