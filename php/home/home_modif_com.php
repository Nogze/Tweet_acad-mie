<?php
@include("../db_connect.php");
@include("../home/home_query.php");

$data = json_decode($_POST["data"]);
$command = "";
$encode = [];

if ($data->title == "modif_com" && strlen($data->content) <= 140){
    $command = com_update($data->id_com, $data->content);
    array_push($encode, "true");
} else if ($data->title == "modif_tweet" && strlen($data->content) <= 140) {
    $command = tweet_update($data->id_com, $data->content);
    array_push($encode, "true");
} else {
    array_push($encode, "false");
}
try {
    $sth = $pdo->query($command);
} catch (Exception $e) {
    echo $e->getMessage();
}

print_r(json_encode($encode));