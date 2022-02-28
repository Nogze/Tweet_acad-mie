$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault()
        var form = $(this)
        $.ajax({
            type: "POST",
            url: "../php/edit_profile_info.php",
            data: form.serialize(),

            success : function(response) {
                var parsedResponse = JSON.parse(response)
                if (parsedResponse.newUsername) {
                    window.location.href = "http://tweet-academie.local/W-WEB-090-BDX-1-1-academie-hugo.dufor/pages/profile.php?username=" + JSON.parse(response)[1].newUsername
                }
                console.log(parsedResponse)
                if (parsedResponse.newFirstName) {
                    $('#identity').text(parsedResponse.newFirstName + " " + $('#identity').text().split(" ")[1])
                }
                if (parsedResponse.newLastName) {
                    $('#identity').text($('#identity').text().split(" ")[0] + " " + parsedResponse.newLastName)
                }
            }
        })
    })
})