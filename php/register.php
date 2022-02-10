<?php

if (!empty($_POST['email'])
    && !empty($_POST['password'])
    && !empty($_POST['phone'])
    && !empty($_POST['firstname'])
    && !empty($_POST['lastname'])
    && !empty($_POST['birthdate'])
    && !empty($_POST['address'])
    && !empty($_POST['city'])
    && !empty($_POST['zipcode'])
    && !empty($_POST['gender'])
    && $_POST['password'] === $_POST['passwordConfirm']) {

    // Backend validation //
    if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
        && preg_match("/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\W])(?=\S*[\d])\S*$/", $_POST['password'])
        && strlen($_POST['phone']) == 10
        && strlen($_POST['firstname']) >= 2
        && strlen($_POST['lastname']) >= 2
        && preg_match("/[0-9]{4}-[0-9]{2}-[0-9]{2}/", $_POST['birthdate'])
        && strlen($_POST['zipcode']) == 5
        && in_array($_POST['gender'], ['Male', 'Female', 'Other'])){

            try {
                $pdo = new PDO('mysql:host=localhost;dbname=twitter_academie;charset=utf8', 'root');
            } catch (Exception $e) {
                echo "Can't connect to database :" . $e->getMessage();
            }

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
                echo "Error encountered during the request :" . $e->getMessage();
            }
        }
}