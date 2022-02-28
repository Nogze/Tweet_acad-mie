$(document).ready(function() {

    function modal(args) {
        if (args == "hide") {
            $('.modal-container').css("display", "none")
            $('#modal').css("display", "none")
        }
        if (args == "show") {
            $('.modal-container').css("display", "block")
            $('#modal').css("display", "block")
        }
    }

    $('.modal-container').prepend("<button class='popin-dismiss'>X<button>")
    $(document).keyup(function(e) {
        if(e.key == "Escape") {
            modal("hide")
        }
    })

    $('#btn-edit-profile').click(function() {
        modal("show")
    })

    $('.modal-container').click(function(e) {
        e.stopPropagation()
    })

    $('#modal').click(function() {
        modal("hide")
    })

    $('.popin-dismiss').click(function() {
        modal("hide")
    })
})