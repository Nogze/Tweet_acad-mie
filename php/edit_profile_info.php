<?php

include("../php/db_connect.php");

$data = (object) array_filter($_POST);
$sql = "UPDATE `users` SET ";

function parseInputs($data, $sql) {
    $inputs_validity = true;

    foreach ($data as $key => $value) {
        switch ($key) {
            case "firstname" :
                if (strlen($value) >= 2) {
                    $sql .= "$key = '$value', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
            case "lastname" :
                if (strlen($value) >= 2) {
                    $sql .= "$key = '$value', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
            case "email" :
                if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $sql .= "$key = '$value', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
            case "password" :
                if (preg_match("/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\W])(?=\S*[\d])\S*$/", $value)) {
                    $sql .= "$key = '" . hash('sha512', $data->password . 'vive le projet tweet_academy') . "', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
            case "username" :
                if (preg_match("/^[\w]{2,}$/", $value)) {
                    $sql .= "$key = '@$value', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
            case "phone" :
                if (strlen($value) == 10) {
                    $sql .= "$key = '$value', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
            case "address" :
                $sql .= "$key = '$value', ";
                break;
            case "zipcode" :
                if (strlen($value) == 5) {
                    $sql .= "$key = '$value', ";
                }
                else {
                    $inputs_validity = false;
                }
                break;
        }
    }
    return ["sql" => $sql, "validity" => $inputs_validity];
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

function exists_User_Username($pdo, $data)
{
    try {
        $state_username = $pdo->query('SELECT id FROM `users` WHERE username = "@' . $data->username . '"');
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $state_username->rowCount();
}

function getUserID($pdo, $data) {
    $userID = $pdo->query("SELECT id FROM `users` WHERE username = '" . $data->{'current-username'} . "'");
    return $userID->fetchAll(PDO::FETCH_ASSOC)[0]['id'];
}

function updateUserInfos($pdo, $sql, $data) {
    $pdo->query($sql . getUserID($pdo, $data));
}

$userExists = new stdClass;

if ($data->phone) {
    if (exists_User_Phone($pdo, $data) == 0) {
        $userExists->phone = "0";
    }
    else {
        $userExists->phone = "1";
    }
}
if ($data->email) {
    if (exists_User_Email($pdo, $data) == 0) {
        $userExists->email = "0";
    } else {
        $userExists->email = "1";
    }
}
if ($data->username) {
    if (exists_User_Username($pdo, $data) == 0) {
        $userExists->username = "0";
    }
    else {
        $userExists->username = "1";
    }
}

if ($userExists->phone == 0 && $userExists->email == 0 && $userExists->username == 0) {
    getUserID($pdo, $data);
    $parseInputs = parseInputs($data, $sql);
    $sql = substr($parseInputs['sql'], 0, -2) . " WHERE id = ";

    if ($parseInputs['validity'] == false) {
        echo json_encode(["msg" => "invalid inputs"]);
        return;
    }
    else {
    updateUserInfos($pdo, $sql, $data);
    echo json_encode(["msg" => "user infos updated !", "newUsername" => $data->username, "newFirstName" => $data->firstname, "newLastName" => $data->lastname]);
    }
}
else {
    echo json_encode(["phone" => $userExists->phone, "email" => $userExists->email, "username" => $userExists->username]);
}