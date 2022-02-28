<?php

include("db_connect.php");

try {
    $sth = $pdo->prepare("SELECT profile_picture, firstname, lastname, username, creation_date,
    (SELECT COUNT(follows.id) FROM follows WHERE follows.id_following = users.id) AS followers,
    (SELECT COUNT(follows.id) FROM follows WHERE follows.id_follower = users.id ) AS following
    FROM `users` WHERE username ='@" . $_GET['username'] . "'");
    $sth->execute();
    $user_infos = $sth->fetchAll(PDO::FETCH_ASSOC);
} catch(Exception $e) {
    echo "Error :" . $e->getMessage();
}

$user_infos = $user_infos[0];
if (empty($user_infos)) {
    echo "<script>window.location.href = './home.html'</script>";
}

$f = finfo_open();
$imagetype = finfo_buffer($f, base64_decode($user_infos['profile_picture']), FILEINFO_MIME_TYPE)

?>

<div class="profile-container">
    <div class="profile-banner">
        <div style="position: relative">
            <div class="profile-pic-container">
                <?php echo "<img id='profile-picture' src='data:" . $imagetype . ";base64, " . $user_infos['profile_picture'] . "'/>" ?>
            </div>
        </div>
    </div>
    <div style="text-align: right;">
        <button id="btn-edit-profile"><strong>Edit account</strong></button>
    </div>
    <div class="user-infos">
        <h1 id="identity"><?php echo $user_infos['firstname'] . " " . $user_infos['lastname'] ?></h1>
        <p><?php echo $user_infos['username']?></p>
        <p>Joined <?php echo explode(" ", $user_infos['creation_date'])[0] ?></p>
        <div style="width: fit-content;" class="grid grid-cols-2 gap-10">
            <p class="follows-count"><strong><?php echo '<span style="color: black">' . $user_infos['following'] . '</span>' ?></strong> following</p>
            <p class="follows-count"><strong><?php echo '<span style="color: black">' . $user_infos['followers'] . '</span>' ?></strong> followers</p>
        </div>
    </div>
</div>
<div id="modal">
    <div class="modal-container">
        <h1>Edit profile</h1>
        <form style="text-align: center">
        <div class="field">
                <label for="firstname">First name</label>
                <input name="firstname" id="firstname" type="name" placeholder="Tahm">
            </div>
            <div class="field">
                <label for="lastname">Last name</label>
                <input name="lastname" id="lastname" type="name" placeholder="Kench">
            </div>
            <div class="field">
                <label for="email">Email-address</label>
                <input name="email" id="email" type="email" placeholder="example@tweet-ac.com">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input name="password" id="password" type="password" placeholder="********" autocomplete="new-password">
            </div>
            <div class="field">
                <label for="username">Username</label>
                <input name="username" id="username" type="username" placeholder="Tahmkench" autocomplete="username">
            </div>
            <div class="field">
                <label for="phone">Phone</label>
                <input name="phone" id="phone" type="phone" placeholder="00 00 00 00 00">
            </div>
            <div class="field">
                <label for="address">Address</label>
                <input name="address" id="address" type="address" placeholder="2 Baron Nashor St.">
            </div>
            <div class="field">
                <label for="zipcode">zipcode</label>
                <input name="zipcode" id="zipcode" type="zipcode" placeholder="33000">
            </div>
            <input type="hidden" name="current-username" value="<?php echo $user_infos['username'] ?>">
            <button id="btn-send-profile-edit">Edit</button>
        </form>
    </div>
</div>