<?php
@include("../db_connect.php");
@include("home_query.php");

$data = $_POST["data"];

$command = print_tweet();
$command_print_comment = print_comment();
$command_print_rt  = print_rt();
$command_username = get_username($data);

$encode = [];

try {
    $sth = $pdo->query($command);
    $res_tweet = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $res_tweet);

    $sth = $pdo->query($command_print_comment);
    $res_com = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $res_com);

    $sth = $pdo->query($command_print_rt);
    $res_rt = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $res_rt);

    $sth = $pdo->query($command_username);
    $res_username = $sth->fetchAll(PDO::FETCH_ASSOC);
    array_push($encode, $res_username);

    print_r(json_encode($encode));
    
} catch (Exception $e) {
    echo $e->getMessage();
}
    
