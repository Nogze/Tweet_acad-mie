<?php
@include("../db_connect.php");
@include("../home/home_query.php");

$data = json_decode($_POST["data"]);
$command = "";

if($data->title == "tweet"){
    $command = del_tweet($data->id_tweet);
} else if ($data->title == "com"){
    $command = del_com($data->localStorage, $data->id_com);
}
$sth = $pdo->query($command);

