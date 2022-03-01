<?php
@include("../db_connect.php");
@include("home_query.php");

$data = json_decode($_POST["data"]);
// print_r($data);

$command = send_comment($data->localStorage, $data->id_post, $data->content);


try {
    $sth = $pdo->query($command);

    $sth = $pdo->query(get_last_com($data->id_post, $data->localStorage));
    $sth = $sth->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($sth[0]));
    
} catch (Exception $e) {
    echo $e->getMessage();
}
    
