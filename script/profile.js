$(document).ready(function() {

    $.ajax({
        type: "POST",
        url : "../php/get_user_infos.php",
        data : {user : localStorage['id_user']},

        success: function(response) {
            response = JSON.parse(response)
            if (response.userId == localStorage.id_user) {
                $('#btn-follow').remove()
                $('#btn-edit-profile').css("visibility", "visible")
            }
            else {
                $('btn-edit-profile').remove()
                $('#btn-follow').css("visibility", "visible")

                if (response.isFollowing) {
                    $('#btn-follow').addClass("btn-unfollow")
                    $('#btn-follow').text("Unfollow")
                }
            }
        }
    })

    $('#btn-follow').click(function() {
        if (!$(this).hasClass("btn-unfollow")) {
            $.ajax({
                type: "POST",
                url: "../php/user_follow.php",
                data: {user: localStorage['id_user']},
                success: function(response) {
                    response = JSON.parse(response)
                    $('.followers-modal').append("<a id='follower-" + response.userUsername.substr(1) + "' href='?username=" + response.userUsername.substr(1) + "'>" +
                                                    "<span style='display: block'>" +
                                                        "<div class='follows'>" +
                                                            "<img style='border-radius: 100%; max-width: 50px; max-height: 50px' src='data:" + response.imageType + ";base64, " + response.userProfilePicture + "'>" +
                                                            "<p>" + response.userUsername + "</p>" +
                                                        "</div>" +
                                                    "</span>" +
                                                "</a>")
                }
            })
            $('#btn-follow').text("Unfollow")
            $('#btn-follow').addClass("btn-unfollow")
            $('.followers span').text(parseInt($('.followers span').text()) + 1)
        }
        else {
            $.ajax({
                type: "POST",
                url: "../php/user_unfollow.php",
                data: {user: localStorage['id_user']},
                success : function(response) {
                    response = JSON.parse(response)
                    $('#follower-' + response.userUsername.substr(1)).remove()
                }
            })
            $('#btn-follow').text("Follow")
            $('#btn-follow').removeClass("btn-unfollow")
            $('.followers span').text(parseInt($('.followers span').text()) - 1)
        }
    })

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