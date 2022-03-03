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
            response = JSON.parse(response)
            console.log(response[0]["id"])
            localStorage.setItem("id_user", response[0]["id"]);
            if (response) {
                window.location.href = "./pages/home.php";
                console.log(localStorage)
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
            alert(xhr.responseText.Message);
        }
    });
})