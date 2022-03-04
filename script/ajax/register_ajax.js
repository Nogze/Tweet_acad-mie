$("#reg").on("submit", function (e) {
    e.preventDefault()

    let form = new FormData($(this)[0])
    let json_arr = JSON.stringify({
        'firstname': form.get('firstname'),
        'lastname': form.get('lastname'),
        'birthdate': form.get('birthdate'),
        'address': form.get('address'),
        'city': form.get('city'),
        'zipcode': form.get('zipcode'),
        'gender': form.get('gender'),
        'phone': form.get('phone'),
        'username' : form.get('username'),
        'email': form.get('email'),
        'password': form.get('password'),
        'passwordConfirm': form.get('passwordConfirm'),
    });

    $.ajax({
        type: "POST",
        url: "php/register.php",
        data: {
            data: json_arr,
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        success: function (response) {
            var parsedResponse = JSON.parse(response)
            console.log(parsedResponse)
            if (parsedResponse['email'] == 0) {
                $('#email').css('border', '#018749 3px solid')
                $('#email_taken').css('display', 'none')
            }
            else {
                $('#email').css('border', '#B31B1B 3px solid')
                $('#email_taken').css('display', 'block')
            }
            if (parsedResponse['phone'] == 0) {
                $('#phone').css('border', '#018749 3px solid')
                $('#phone_taken').css('display', 'none')
            }
            else {
                $('#phone').css('border', '#B31B1B 3px solid')
                $('#phone_taken').css('display', 'block')
            }
            if (parsedResponse['username'] == 0) {
                $('#username').css('border', '#018749 3px solid')
                $('#username_taken').css('display', 'none')
            }
            else {
                $('#username').css('border', '#B31B1B 3px solid')
                $('#username_taken').css('display', 'block')
            }
            if (parsedResponse['msg'] == 'success') {
                $('#email').css('border', '#018749 3px solid')
                $('#email_taken').css('display', 'none')
                $('#phone').css('border', '#018749 3px solid')
                $('#phone_taken').css('display', 'none')
                $('#username').css('border', '#018749 3px solid')
                $('#username_taken').css('display', 'none')
                $('#reg input').val("")
                $('#reg input').prop("disabled", "true")
                $('#reg button').prop("disabled", "true")
                $('#reg select').prop("disabled", "true")
                $('#register-success').css("visibility", "visible")
            }
        }
    })
})