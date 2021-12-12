<?php
require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");


$input = json_decode(file_get_contents("php://input"));
$admin_username = $input->username;
$title = $input-> title;

$query =  "INSERT INTO projects(admin_username,title) VALUES(?,?);";
$mysql = $connection->prepare($query);
$mysql->bind_param("ss",$admin_username,$title);
$mysql->execute();

$success_mes = "{'success_status' : success}";
$json_success = json_encode($success_mes);
echo $json_success;

?>