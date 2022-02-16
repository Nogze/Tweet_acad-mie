let li_reg = $("li:first-child")
let li_reg_data = $(li_reg).attr("data-target")
let li_log = $("li:last-child")
let li_log_data = $(li_log).attr("data-target")

$(document).ready(function () {
    $(li_reg).css("background-color", "#1da1f2")
    $(li_reg).css("color", "white")
    $("#"+li_log_data).hide()
});

$(li_reg).on("click", function(){
    $("#"+li_reg_data).show()
    $(li_reg).css("background-color", "#1da1f2")
    $(li_reg).css("color", "white")

    $("#"+li_log_data).hide()
    $(li_log).css("background-color", "white")
    $(li_log).css("color", "black")
})

$(li_log).on("click", function(){
    $("#"+li_log_data).show()
    $(li_log).css("background-color", "#1da1f2")
    $(li_log).css("color", "white")

    $("#"+li_reg_data).hide()
    $(li_reg).css("background-color", "white")
    $(li_reg).css("color", "black")
})
