<?php
@include("../db_connect.php");
@include("home_query.php");

$data = json_decode($_POST["data"]);
print_r($data);

$command = send_comment($data->localStorage, $data->id_post, $data->content);


try {
    $sth = $pdo->query($command);
    $send_reply = $sth->fetchAll(PDO::FETCH_ASSOC);
    
} catch (Exception $e) {
    echo $e->getMessage();
}
    
