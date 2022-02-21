<?php
    @include("db_connect.php");

    $data = json_decode($_POST["data"]);

    $command = "INSERT INTO post (id_user, content) 
    VALUES (\"4\", \"".$data->content."\")";

    try {
        $sth = $pdo->query($command);
    } catch (Exception $e) {
        echo $e->getMessage();
    }