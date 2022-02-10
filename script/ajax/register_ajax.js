$("#reg").on("submit", function(e){
    let form = new FormData($(this)[0]);

    let json_arr = JSON.stringify({
        'firstname': form.get('firstname'),
        'lastname': form.get('lastname'),
        'birthdate': form.get('birthdate'),
        'address': form.get('address'),
        'city': form.get('city'),
        'zipcode': form.get('zipcode'),
        'gender': form.get('gender'),
        'phone': form.get('phone'),
        'email': form.get('email'),
        'password': form.get('password'),
        'passwordConfirm': form.get('passwordConfirm'),
    });

    $.ajax({
        type: "post",
        url: form.attr("action"),
        data: {
            data:json_arr,
        },
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            alert(response)
        }
    });
    e.preventDefault()
})