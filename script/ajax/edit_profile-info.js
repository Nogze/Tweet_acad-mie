$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "../php/edit_profile_info.php",
            data: new FormData(this),
            contentType : false,
            processData : false,
            cache : false,

            success : function(response) {
                var parsedResponse = JSON.parse(response)

                if (parsedResponse.newUsername) {
                    window.location.href = "http://tweet-academie.local/W-WEB-090-BDX-1-1-academie-hugo.dufor/pages/profile.php?username=" + JSON.parse(response)[1].newUsername
                }
                if (parsedResponse.newFirstName) {
                    $('#identity').text(parsedResponse.newFirstName + " " + $('#identity').text().split(" ")[1])
                }
                if (parsedResponse.newLastName) {
                    $('#identity').text($('#identity').text().split(" ")[0] + " " + parsedResponse.newLastName)
                }
                if (parsedResponse.newProfilePicture) {
                    $('#profile-picture').fadeOut()
                    $('#profile-picture').remove()
                    $('.profile-pic-container').append("<img style='display: none' id='profile-picture' src='data:" + parsedResponse.newProfilePicture + "'/>")
                    $('#profile-picture').fadeIn()
                }
                $('#modal').fadeOut()
            }
        })
    })
})