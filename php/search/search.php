<?php
@include("../db_connect.php");
@include("../home/home_query.php");

$data = json_decode($_POST["data"]);
$command = "";
$rep = "";

if ($data->title == "username"){
    $command = search_user($data->content);
    $rep = true;
} elseif ($data->title == "hashtag"){
    $command = search_hashtag($data->content);
    $rep = false;
}
$encode = [];
if (strlen($command) > 1){
    $sth = $pdo->query($command);
    $sth = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $rep);
    array_push($encode, $sth);
    print_r(json_encode($encode));
}
