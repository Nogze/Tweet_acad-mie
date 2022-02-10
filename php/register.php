<?php

print_r($_POST);
try {
    $pdo = new PDO('mysql:host=localhost;dbname=twitter_academie;charset=utf8', 'root');
} catch (Exception $e) {
    echo "Can't connect to database :" . $e->getMessage();
}

if (
    isset($_POST['email'])
    && isset($_POST['password'])
    && isset($_POST['phone'])
    && isset($_POST['firstname'])
    && isset($_POST['lastname'])
    && isset($_POST['birthdate'])
    && isset($_POST['address'])
    && isset($_POST['city'])
    && isset($_POST['zipcode'])
    && isset($_POST['gender'])
    && $_POST['password'] === $_POST['passwordConfirm']
) {


    $sth = $pdo->prepare('INSERT INTO `users` (email, password, phone, firstname, lastname, birthdate, address, city, zipcode, gender)
        VALUES (:email, :password, :phone, :firstname, :lastname, :birthdate, :address, :city, :zipcode, :gender);');
    try {
        $sth->execute(array(
            ':email' => hash('sha512', $_POST['email'] . 'vive le projet tweet_academy'),
            ':password' => hash('sha512', $_POST['password'] . 'vive le projet tweet_academy'),
            ':phone' => $_POST['phone'],
            ':firstname' => $_POST['firstname'],
            ':lastname' => $_POST['lastname'],
            ':birthdate' => $_POST['birthdate'],
            ':address' => $_POST['address'],
            ':city' => $_POST['city'],
            ':zipcode' => $_POST['zipcode'],
            ':gender' => $_POST['gender']
        ));
    } catch (Exception $e) {
        echo "Error encountered during the request" . $e->getMessage();
    }
}