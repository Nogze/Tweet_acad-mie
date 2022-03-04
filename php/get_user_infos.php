<?php

include('db_connect.php');

try {
    $sth = $pdo->prepare("SELECT id FROM `users` WHERE username = '@" . explode("?username=", $_SERVER['HTTP_REFERER'])[1] . "'");
    $sth->execute();
    $user_id = $sth->fetchAll(PDO::FETCH_ASSOC)[0];
} catch (Exception $e) {
    echo "Error : " . $e->getMessage;
}

try {
    $sth = $pdo->prepare("SELECT id_follower FROM follows WHERE id_following = (SELECT id FROM `users` WHERE username ='@" . explode("?username=", $_SERVER['HTTP_REFERER'])[1] . "') AND id_follower = " . $_POST['user']);
    $sth->execute();
    $is_following = $sth->rowCount();
} catch (Exception $e) {
    echo "Error : " . $e;
}

echo json_encode(["isFollowing" => $is_following, "userId" => $user_id['id']]);