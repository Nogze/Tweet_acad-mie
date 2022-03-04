<?php

include('db_connect.php');

try {
    $sth = $pdo->prepare("DELETE FROM follows WHERE id_follower = " . $_POST['user'] . " AND id_following = (SELECT id FROM `users` WHERE username = '@" . explode("?username=", $_SERVER['HTTP_REFERER'])[1] . "')");
    $sth->execute();
} catch (Exception $e) {
    echo "Error : " . $e->getMessage();
}

try {
    $sth = $pdo->prepare("SELECT username FROM `users` WHERE id = " . $_POST['user']);
    $sth->execute();
    $user_infos = $sth->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    echo "Error : " . $e->getMessage();
}

echo json_encode(["userUsername" => $user_infos[0]['username']]);