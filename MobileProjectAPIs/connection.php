<?php

$server = "localhost";
$user = "root";
$pass = "root";
$dbname = "mobiledb";

$connection = new mysqli($server,$user,$pass,$dbname);

if($connection->connect_error){
    die("Failed");
}


?>