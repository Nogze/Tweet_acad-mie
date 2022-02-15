<?php
    print_r($_POST);
    @include("db_connect.php");

    $data = json_decode($_POST["data"]);
    // print_r($data);
    // print_r($data->content);

    $command = "INSERT INTO post (id_user, content) 
    VALUES (\"4\", \"".$data->content."\")";

    try {
        $sth = $pdo->query($command);
    } catch (Exception $e) {
        echo $e->getMessage();
    }