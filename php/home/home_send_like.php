<?php
@include("../db_connect.php");
@include("home_query.php");

$data = json_decode($_POST["data"]);

$command = check_likes($data->localStorage, $data->post);

$sth = $pdo->query($command);
$count = $sth->rowCount();

$encode = [];

if($count == 1){
    $command = del_like($data->localStorage, $data->post);
    array_push($encode, false);
} else {
    $command = add_like($data->localStorage, $data->post);
    array_push($encode, true);
}

$sth = $pdo->query($command);
print_r(json_encode($encode));