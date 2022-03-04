<?php

include('db_connect.php');


try {
    $sth = $pdo->prepare("SELECT id_follower FROM follows WHERE id_following = (SELECT id FROM `users` WHERE username ='@" . explode("?username=", $_SERVER['HTTP_REFERER'])[1] . "') AND id_follower = " . $_POST['user']);
    $sth->execute();
    $is_following = $sth->rowCount();
} catch (Exception $e) {
    echo "Error : " . $e;
}

if ($is_following) return;

try {
    $sth = $pdo->prepare("INSERT INTO follows (id_follower, id_following) VALUES (" . $_POST['user'] . ", (SELECT id FROM `users` WHERE username ='@" . explode("?username=", $_SERVER['HTTP_REFERER'])[1] . "'))");
    $sth->execute();
} catch (Exception $e) {
    echo "Error : " . $e->getMessage();
}

try {
    $sth = $pdo->prepare("SELECT username, profile_picture FROM `users` WHERE id = " . $_POST['user']);
    $sth->execute();
    $user_infos = $sth->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    Echo "Error : " . $e->getMessage();
}

$f = finfo_open();
$imagetype = finfo_buffer($f, base64_decode($user_infos[0]['profile_picture']), FILEINFO_MIME_TYPE);

echo json_encode(["userUsername" => $user_infos[0]['username'],
                "userProfilePicture" => $user_infos[0]['profile_picture'],
                "imageType" => $imagetype]);