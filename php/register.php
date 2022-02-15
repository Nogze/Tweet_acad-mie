<?php

include('db_connect.php');

// Check if all inputs are filled //
function isFilled($data)
{
    return (!empty($data->email)
            && !empty($data->password)
            && !empty($data->phone)
            && !empty($data->firstname)
            && !empty($data->lastname)
            && !empty($data->birthdate)
            && !empty($data->address)
            && !empty($data->city)
            && !empty($data->zipcode)
            && !empty($data->gender)
            && $data->password === $data->passwordConfirm);
}

// Check if all inputs are valid //
function checkValidity($data)
{
    return (filter_var($data->email, FILTER_VALIDATE_EMAIL)
            && preg_match("/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\W])(?=\S*[\d])\S*$/", $data->password)
            && strlen($data->phone) == 10
            && strlen($data->firstname) >= 2
            && strlen($data->lastname) >= 2
            && preg_match("/[0-9]{4}-[0-9]{2}-[0-9]{2}/", $data->birthdate)
            && strlen($data->zipcode) == 5
            && in_array($data->gender, ['Male', 'Female', 'Other']));
}

// Check if phone already exists //
function exists_User_Phone($pdo, $data)
{
    try {
        $state_phone = $pdo->query('SELECT id FROM `users` WHERE phone = "' . $data->phone . '"');
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $state_phone->rowCount();
}

// Check if email already exists //
function exists_User_Email($pdo, $data)
{
    try {
        $state_email = $pdo->query('SELECT id FROM `users` WHERE email = "' . $data->email . '"');
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $state_email->rowCount();
}

// Push to database //
function registerQuery($pdo, $data)
{
    $sth = $pdo->prepare('INSERT INTO `users` (email, password, phone, firstname, lastname, birthdate, address, city, zipcode, gender)
        VALUES (:email, :password, :phone, :firstname, :lastname, :birthdate, :address, :city, :zipcode, :gender);');

    try {
        $sth->execute(array(
            ':email' => $data->email,
            ':password' => hash('sha512', $data->password . 'vive le projet tweet_academy'),
            ':phone' => $data->phone,
            ':firstname' => $data->firstname,
            ':lastname' => $data->lastname,
            ':birthdate' => $data->birthdate,
            ':address' => $data->address,
            ':city' => $data->city,
            ':zipcode' => $data->zipcode,
            ':gender' => $data->gender,
        ));
        echo json_encode(["msg" => "success"]);
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

// Call functions //
$data = json_decode($_POST['data']);

try {

    if (isFilled($data) && checkValidity($data)) {
        if (exists_User_Phone($pdo, $data) == 0) {
            $response = $response . "0";
        } else {
            $response = $response . "1";
        }
        if (exists_User_Email($pdo, $data) == 0) {
            $response = $response . "0";
        } else {
            $response = $response . "1";
        }
        if (substr($response, 0, 1) == 0 && substr($response, 1, 2) == 0) {
            registerQuery($pdo, $data);
        }
        else {
        echo "{\"phone\":" . intval(substr($response, 0, 1)) . ", \"email\":" . intval(substr($response, 1, 2)) . "}";
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}