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

            if (parsedResponse['email'] == 0) {
                $('#email').css('border', '#018749 3px solid')
                $('#email_notValid').css('display', 'none')
            }
            else {
                $('#email').css('border', '#B31B1B 3px solid')
                $('#email_notValid').css('display', 'block')
            }
            if (parsedResponse['phone'] == 0) {
                $('#phone').css('border', '#018749 3px solid')
                $('#phone_notValid').css('display', 'none')
            }
            else {
                $('#phone').css('border', '#B31B1B 3px solid')
                $('#phone_notValid').css('display', 'block')
            }
            if (parsedResponse['msg'] == 'success') {
                $('#email').css('border', '#018749 3px solid')
                $('#email_notValid').css('display', 'none')
                $('#phone').css('border', '#018749 3px solid')
                $('#phone_notValid').css('display', 'none')
                $('#successful-registration').css('display', 'block')

            }
        }
    });
})