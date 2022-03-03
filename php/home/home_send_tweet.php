<?php
@include("../db_connect.php");
@include("home_query.php");

$data = json_decode($_POST["data"]);

$command = send_tweet($data->localStorage, $data->content);

$encode = [];

try {
    $sth = $pdo->query($command);
    $print_tweet = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $print_tweet);

    print_r(json_encode($encode));
} catch (Exception $e) {
    echo $e->getMessage();
}
    
