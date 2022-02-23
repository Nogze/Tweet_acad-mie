<?php

@include("db_connect.php");

$data = json_decode($_POST["data"]);
print_r($data);

$command = "INSERT INTO post (id_user, content)
            VALUES (\"5\", \"".$data->content."\")";