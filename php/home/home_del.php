<?php
@include("../db_connect.php");
@include("../home/home_query.php");

$data = json_decode($_POST["data"]);

$sth = $pdo->query(check_user_id($data->username));
$res = $sth->fetchAll(PDO::FETCH_ASSOC);


if($res[0]["id"] == $data->localStorage){
    $command = del_com($data->localStorage, $data->id_post, $data->date);
    $sth = $pdo->query($command);
    print_r(json_encode(true));
} else {
    print_r(json_encode(false));
}

