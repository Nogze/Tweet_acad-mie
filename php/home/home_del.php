<?php
@include("../db_connect.php");
@include("../home/home_query.php");

$data = json_decode($_POST["data"]);

$command = del_com($data->localStorage, $data->id_com);
$sth = $pdo->query($command);

