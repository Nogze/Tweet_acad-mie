$("#log").on("submit", function(e){
    let form = new FormData($(this)[0]);

    let json_arr = JSON.stringify({
        'email': form.get('email'),
        'password': form.get('password'),
    });

    $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: {
            info:json_arr,
        },
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (response) {
            console.log(response)
            alert(response)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(ajaxOptions);
            alert(thrownError);
          }
    });
})