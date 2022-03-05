<?php
@include("../db_connect.php");
@include("home_query.php");

$data = json_decode($_POST["data"]);

$command = check_retweet($data->localStorage, $data->post);

$sth = $pdo->query($command);
$count = $sth->rowCount();
$encode = [];


if($count == 1){
    $command = del_retweet($data->localStorage, $data->post);
    array_push($encode, false);
} else {
    
    $command = add_retweet($data->localStorage, $data->post);
    $sth = $pdo->query(get_username($data->localStorage));
    $sth = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $sth[0]["username"]);
}

$sth = $pdo->query($command);
print_r(json_encode($encode));
