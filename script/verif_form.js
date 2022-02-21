function inputValid(input){
    input.on("change", function(){
        if(input == "$(\"#passwordConfirm\")"){
            if(input.val() == $("#password").val()){
                input.css("border", "#018749 3px solid")
                return true
            } else {
                input.css("border", "#B31B1B 3px solid")
                return false
            }
        }else if (!input[0].checkValidity() || input.val().length ==0) {
            input.css("border", "#B31B1B 3px solid")
            return false
        }
        else if (input[0].checkValidity()){
            input.css("border", "#018749 3px solid")
            return true
        }
    })
}
function disableDatePicking() {
    var maxDate = new Date();
    var dd = String(maxDate.getDate()).padStart(2, '0');
    var mm = String(maxDate.getMonth() + 1).padStart(2, '0');
    var yyyy = maxDate.getFullYear() - 18;
    maxDate = yyyy + '-' + mm + '-' + dd;
    $('#birthdate').attr("max", maxDate)
}

$(document).ready(function () {
    disableDatePicking()

    inputValid($("#firstname"))
    inputValid($("#lastname"))
    inputValid($("#birthdate"))
    inputValid($("#address"))
    inputValid($("#city"))
    inputValid($("#zipcode"))
    inputValid($("#gender"))
    inputValid($("#phone"))
    inputValid($("#email"))
    inputValid($("#password"))
    inputValid($("#passwordConfirm"))

    $('#reg').submit(function (e) {

        if(
            inputValid($("#firstname")) &&
            inputValid($("#lastname")) &&
            inputValid($("#birthdate")) &&
            inputValid($("#address")) &&
            inputValid($("#city")) &&
            inputValid($("#zipcode")) &&
            inputValid($("#gender")) &&
            inputValid($("#phone")) &&
            inputValid($("#email")) &&
            inputValid($("#password")) &&
            inputValid($("#passwordConfirm"))
            ) {} else {
            e.preventDefault();
        }
    })
})