$(document).ready(function() {

    function modal(args) {
        if (args == "hide") {
            $('#modal').fadeOut()
            $('.form-modal').fadeOut()
            $('.followers-modal').fadeOut()
            $('.following-modal').fadeOut()
        }
        if (args == "show") {
            $('#modal').fadeIn()
        }
    }

    $('.modal-container').prepend("<button class='popin-dismiss'>X</button>")
    $(document).keyup(function(e) {
        if(e.key == "Escape") {
            modal("hide")
        }
    })

    $('#btn-edit-profile').click(function() {
        modal("show")
        $('.form-modal').fadeIn()
    })

    $('.following').click(function() {
        modal("show")
        $('.following-modal').fadeIn()
    })

    $('.followers').click(function() {
        modal("show")
        $('.followers-modal').fadeIn()
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

    $('#form_profile_picture').change(function() {
        var src = URL.createObjectURL(this.files[0])
        $('#profile_pic_preview').attr("src", src)
    })
})