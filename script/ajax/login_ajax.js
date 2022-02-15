$("#log").on("submit", function(e){
    e.preventDefault();
    let form = new FormData($(this)[0]);

    let json_arr = JSON.stringify({
        'email': form.get('email'),
        'password': form.get('password'),
    });

    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: {
            data:json_arr,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (response, textStatus, jqXHR) {
            if (response == true) {
                window.location.href = "./pages/home.html";
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
            alert(xhr.responseText.Message);
        }
    });
})