<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=twitter_academie;charset=utf8', 'root');
} catch (Exception $e) {
    echo "Can't connect to database :" . $e->getMessage();
}

if (!empty($_POST['email']) && !empty($_POST['password'])) {
    $email = hash("sha512", $_POST["email"].'vive le projet tweet_academy');
    $pass = hash("sha512", $_POST["password"].'vive le projet tweet_academy');

    $command = "SELECT id FROM users WHERE `password` = '$pass' AND email = '$email'";
    try {
        $sth = $pdo->query($command);
        $res = $sth->fetchAll();

        if ($res["id"]->rowCount() == 1){
            header("location:../page/home.html");
        } else {
            header("location:../authentication.html");
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

}
