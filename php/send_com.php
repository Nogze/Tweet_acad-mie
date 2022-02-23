<?php

@include("db_connect.php");

$data = json_decode($_POST["data"]);

$command = "INSERT INTO comments (id_post, id_user, content) 
            VALUES ('$data->id_post', '4', '$data->content')";

try {
    $sth = $pdo->query($command);
    $sth = $sth->fetchAll(PDO::FETCH_ASSOC);
    $data_send = $sth;
} catch (Exception $e) {
    echo $e->getMessage();
}
$data_send = json_encode($data);
print_r($data_send);