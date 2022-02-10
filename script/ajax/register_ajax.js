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
        url: "php/register.php",
        data: {
            data:json_arr,
        },
        // dataType: "JSON",
        success: function (response) {
            console.log(response)
            alert(response)
        }
    });
    // e.preventDefault()
})