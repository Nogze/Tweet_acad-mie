<?php

@include('db_connect.php');

$data = json_decode($_POST["data"]);
$email = $data->email;
$password = $data->password;

if (!empty($email) && !empty($password)) {
    $password_hash = hash("sha512", $password.'vive le projet tweet_academy');
   
    $command = "SELECT id FROM users WHERE `password` = '$password_hash' AND email = '$email'";

    
    $sth = $pdo->query($command);
    if ($sth->rowCount() == 1){
        $sth = $sth->fetchAll(PDO::FETCH_ASSOC);
        $data = $sth;
        print_r(json_encode($data));
    }
}