<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=tweet_academie;charset=utf8', 'root');
} catch (Exception $e) {
    echo "Can't connect to database :" . $e->getMessage();
}